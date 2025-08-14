import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Row,
  Col,
  Typography,
  Select,
  Table,
  Checkbox,
  Modal,
  Form,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import {
  fetchTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  setFilters,
  clearFilters,
} from "../store/slices/teamSlices";
import CustomInput from "../components/inputComponent";
import CustomButton from "../components/buttonComponent";
import { projects, roles, getColumnsData } from "../data/teamData";
import { TEAM_MEMBERS_CONSTANT } from "../constants";

const { Title } = Typography;
const { Option } = Select;

const TeamMembers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.user?.role === "admin");
  const { members, isLoading, filters } = useSelector((state) => state.team);

  const [modalState, setModalState] = useState({
    isMemberModal: false,
    isAssignModal: false,
    editingMember: null,
    assigningMember: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    currentProject: "",
    skills: "",
  });

  useEffect(() => {
    dispatch(fetchTeamMembers(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "",
      currentProject: "",
      skills: "",
    });
    setModalState({
      ...modalState,
      editingMember: null,
      assigningMember: null,
    });
  };

  const openAddMember = () => {
    resetForm();
    setModalState({ ...modalState, isMemberModal: true });
  };

  const openEditMember = (member) => {
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
      currentProject: member.currentProject || "",
      skills: member.skills.join(", "),
    });
    setModalState({
      ...modalState,
      isMemberModal: true,
      editingMember: member,
    });
  };

  const openAssignMember = (member) => {
    setFormData({ ...formData, currentProject: "" });
    setModalState({
      ...modalState,
      isAssignModal: true,
      assigningMember: member,
    });
  };

  const handleSaveMember = async () => {
    try {
      const skillsArray = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const memberData = {
        ...formData,
        skills: skillsArray,
        status: formData.currentProject ? "active" : "bench",
      };

      if (modalState.editingMember) {
        await dispatch(
          updateTeamMember({ id: modalState.editingMember._id, memberData })
        ).unwrap();
        toast.success("Member updated successfully!");
      } else {
        await dispatch(addTeamMember(memberData)).unwrap();
        toast.success("Member added successfully!");
      }

      resetForm();
      setModalState({ ...modalState, isMemberModal: false });
      dispatch(fetchTeamMembers(filters));
    } catch (err) {
      toast.error("Failed to save member");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await dispatch(deleteTeamMember(id)).unwrap();
        toast.success("Member deleted successfully!");
        dispatch(fetchTeamMembers(filters));
      } catch (err) {
        toast.error("Failed to delete member");
      }
    }
  };

  const handleAssignProject = async () => {
    try {
      const updatedMember = {
        ...modalState.assigningMember,
        currentProject: formData.currentProject,
        status: "active",
      };
      await dispatch(
        updateTeamMember({
          id: modalState.assigningMember._id,
          memberData: updatedMember,
        })
      ).unwrap();
      toast.success("Member assigned successfully!");
      resetForm();
      setModalState({ ...modalState, isAssignModal: false });
      dispatch(fetchTeamMembers(filters));
    } catch (err) {
      toast.error("Failed to assign member");
    }
  };

  const handleViewPortfolio = (member) => {
    console.log("Navigating to portfolio with:", member);
    navigate(`/portfolio/${member._id}`, { state: { member } });
  };

  return (
    <div className="dashboard-content">
      <div
        className="page-header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Title level={2}>{TEAM_MEMBERS_CONSTANT.TITLE}</Title>
        {isAdmin && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAddMember}
          >
            {TEAM_MEMBERS_CONSTANT.ADD_MEMBER}
          </Button>
        )}
      </div>

      <Card style={{ marginBottom: 20 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CustomInput
              isSearch
              placeholder="Search by name or email"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              allowClear
              placeholder="Select Role"
              value={filters.role}
              onChange={(value) => handleFilterChange("role", value)}
              style={{ width: "100%" }}
            >
              {roles.map((role) => (
                <Option key={role} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              allowClear
              placeholder="Select Project"
              value={filters.project}
              onChange={(value) => handleFilterChange("project", value)}
              style={{ width: "100%" }}
            >
              {projects.map((proj) => (
                <Option key={proj} value={proj}>
                  {proj}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Checkbox
              checked={filters.benchOnly}
              onChange={(e) =>
                handleFilterChange("benchOnly", e.target.checked)
              }
            >
              Show Bench Members
            </Checkbox>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CustomButton onClick={handleClearFilters}>
              {TEAM_MEMBERS_CONSTANT.CLEAR}
            </CustomButton>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          columns={getColumnsData(
            handleDelete,
            openAssignMember,
            openEditMember,
            handleViewPortfolio,
            isAdmin
          )}
          dataSource={members}
          rowKey={(record) => record._id || record.id}
          scroll={{ x: "max-content", y: 400 }}
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
        />
      </Card>
      <Modal
        title={
          modalState.editingMember ? "Edit Team Member" : "Add Team Member"
        }
        open={modalState.isMemberModal}
        onOk={handleSaveMember}
        onCancel={() => setModalState({ ...modalState, isMemberModal: false })}
        width={600}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <CustomInput
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Col>
            <Col span={12}>
              <CustomInput
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 10 }}>
            <Col span={12}>
              <Select
                placeholder="Select Role"
                value={formData.role}
                onChange={(value) => setFormData({ ...formData, role: value })}
                style={{ width: "100%" }}
              >
                {roles.map((role) => (
                  <Option key={role} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <Select
                placeholder="Select Project (optional)"
                value={formData.currentProject}
                onChange={(value) =>
                  setFormData({ ...formData, currentProject: value })
                }
                allowClear
                style={{ width: "100%" }}
              >
                {projects.map((proj) => (
                  <Option key={proj} value={proj}>
                    {proj}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <CustomInput
            isTextArea
            placeholder="Enter skills separated by commas"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
            rows={3}
            style={{ marginTop: 10 }}
          />
        </Form>
      </Modal>

      <Modal
        title={`Assign ${modalState.assigningMember?.name} to Project`}
        open={modalState.isAssignModal}
        onOk={handleAssignProject}
        onCancel={() => setModalState({ ...modalState, isAssignModal: false })}
        width={400}
      >
        <Select
          placeholder="Select Project"
          value={formData.currentProject}
          onChange={(value) =>
            setFormData({ ...formData, currentProject: value })
          }
          style={{ width: "100%" }}
        >
          {projects.map((proj) => (
            <Option key={proj} value={proj}>
              {proj}
            </Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default TeamMembers;
