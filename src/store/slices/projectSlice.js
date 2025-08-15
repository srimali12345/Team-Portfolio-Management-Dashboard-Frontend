import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  projects: [],
  isLoading: false,
  error: null,
  statusFilter: null,
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/projects/getProjects"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

export const addProject = createAsyncThunk(
  "project/addProject",
  async (projectData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/projects/addProject",
        projectData
      );
      dispatch(fetchProjects());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add project"
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ id, projectData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/projects/updateProject/${id}`,
        projectData
      );
      dispatch(fetchProjects());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update project"
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/projects/deleteProject/${id}`
      );
      dispatch(fetchProjects());
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  }
);

export const activateProject = createAsyncThunk(
  "project/activateProject",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/projects/activateProject/${id}`
      );
      dispatch(fetchProjects());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate project"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setStatusFilter, clearError } = projectSlice.actions;
export default projectSlice.reducer;
