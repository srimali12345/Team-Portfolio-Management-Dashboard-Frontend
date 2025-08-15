import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  members: [],
  stats: { totalMembers: 0, activeMembers: 0, benchMembers: 0 },
  portfolio: null,
  isLoading: false,
  error: null,
  filters: {
    search: "",
    role: null,
    project: null,
    benchOnly: false,
    startDate: null,
    endDate: null,
  },
};

export const fetchTeamMembers = createAsyncThunk(
  "team/fetchMembers",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.role) params.append("role", filters.role);
      if (filters.project) params.append("project", filters.project);
      if (filters.benchOnly) params.append("benchOnly", "true");
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      const response = await axios.get(
        `http://localhost:8080/api/team/searchAndFilter?${params}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch team members"
      );
    }
  }
);

export const fetchTeamStats = createAsyncThunk(
  "team/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/team/getMemberStats"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch team stats"
      );
    }
  }
);

export const addTeamMember = createAsyncThunk(
  "team/addMember",
  async (memberData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/team/addMember",
        memberData
      );
      dispatch(fetchTeamMembers());
      dispatch(fetchTeamStats());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add team member"
      );
    }
  }
);

export const updateTeamMember = createAsyncThunk(
  "team/updateMember",
  async ({ id, memberData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/team/updateMember/${id}`,
        memberData
      );
      dispatch(fetchTeamMembers());
      dispatch(fetchTeamStats());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update team member"
      );
    }
  }
);

export const deleteTeamMember = createAsyncThunk(
  "team/deleteMember",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`http://localhost:8080/api/team/deleteMember/${id}`);
      dispatch(fetchTeamMembers());
      dispatch(fetchTeamStats());
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete team member"
      );
    }
  }
);

export const fetchPortfolio = createAsyncThunk(
  "team/fetchPortfolio",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/api/team/portfolio/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        role: null,
        project: null,
        benchOnly: false,
        startDate: null,
        endDate: null,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearPortfolio: (state) => {
      state.portfolio = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.portfolio = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTeamStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        state.members = state.members.filter((m) => m._id !== action.payload);
      })
      .addCase(fetchPortfolio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.portfolio = action.payload;
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearError, clearPortfolio } =
  teamSlice.actions;
export default teamSlice.reducer;
