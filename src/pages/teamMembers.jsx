import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Typography,
  Select,
  Table,
  Modal,
  Form,
  DatePicker,
  Checkbox,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import CustomInput from "../components/inputComponent";
import CustomButton from "../components/buttonComponent";
import { projects, roles, getColumnsData } from "../data/teamData";
import { TEAM_MEMBERS_CONSTANT } from "../constants";

const { Title } = Typography;
const { Option } = Select;

const TeamMembers = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [assignForm] = Form.useForm();

  const [teamMembers, setTeamMembers] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    role: null,
    project: null,
    benchOnly: false,
    startDate: null,
    endDate: null,
  });

  const [modalState, setModalState] = useState({
    isMemberModal: false,
    isAssignModal: false,
    editingMember: null,
    assigningMember: null,
  });

  const fetchMembers = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.role) params.append("role", filters.role);
      if (filters.project) params.append("project", filters.project);
      if (filters.benchOnly) params.append("benchOnly", "true");
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      const { data } = await axios.get(
        `http://localhost:8080/api/team/searchAndFilter?${params}`
      );
      setTeamMembers(data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      search: "",
      role: null,
      project: null,
      benchOnly: false,
      startDate: null,
      endDate: null,
    });
  };

  const handleAddMember = () => {
    setModalState({ ...modalState, isMemberModal: true, editingMember: null });
    form.resetFields();
  };

  const handleSaveMember = async () => {
    try {
      const isEdit = Boolean(modalState.editingMember);
      const fields = form.getFieldsValue();
      const skillsArray = typeof fields.skills === "string"
        ? fields.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : fields.skills || [];

      const memberData = {
        ...fields,
        skills: skillsArray,
        status: fields.currentProject ? "active" : "bench",
      };

      if (isEdit) {
        await axios.put(
          `http://localhost:8080/api/team/updateMember/${modalState.editingMember._id}`,
          memberData
        );
        toast.success("Member updated successfully!");
      } else {
        await axios.post(
          "http://localhost:8080/api/team/addMember",
          memberData
        );
        toast.success("Member added successfully!");
      }

      fetchMembers();
      setModalState({ ...modalState, isMemberModal: false, editingMember: null });
      form.resetFields();
    } catch (err) {
      console.error("Error saving member:", err);
      toast.error("Failed to save member.");
    }
  };

  const handleDeleteMember = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this member?",
      onOk: async () => {
        await axios.delete(`http://localhost:8080/api/team/deleteMember/${id}`);
        toast.success("Member deleted successfully");
        fetchMembers();
      },
    });
  };

  const handleAssignProject = (member) => {
    setModalState({ ...modalState, assigningMember: member, isAssignModal: true });
  };

  const handleAssignOk = async () => {
    const { project } = assignForm.getFieldsValue();
    const updatedMember = {
      ...modalState.assigningMember,
      currentProject: project,
      status: "active",
    };

    await axios.put(
      `http://localhost:8080/api/team/updateMember/${modalState.assigningMember._id}`,
      updatedMember
    );

    toast.success("Member assigned successfully!");
    fetchMembers();
    setModalState({ ...modalState, isAssignModal: false, assigningMember: null });
    assignForm.resetFields();
  };

  const handleEditMember = (member) => {
    setModalState({ ...modalState, isMemberModal: true, editingMember: member });
    form.setFieldsValue({
      name: member.name,
      email: member.email,
      role: member.role,
      currentProject: member.currentProject,
      skills: member.skills.join(", "),
    });
  };

  const handleViewPortfolio = (member) => {
    navigate(`/portfolio/${member._id}`, { state: { member } });
  };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <Title level={2}>{TEAM_MEMBERS_CONSTANT.TITLE}</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddMember}>
          {TEAM_MEMBERS_CONSTANT.ADD_MEMBER}
        </Button>
      </div>

      <Card style={{ marginBottom: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CustomInput
              isSearch
              placeholder="Search By Name or Email"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              allowClear
              placeholder="Select Role"
              value={filters.role}
              onChange={(value) => setFilters({ ...filters, role: value })}
              style={{ width: "100%" }}
            >
              {roles.map((role) => (
                <Option key={role} value={role}>{role}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              allowClear
              placeholder="Select Project"
              value={filters.project}
              onChange={(value) => setFilters({ ...filters, project: value })}
              style={{ width: "100%" }}
            >
              {projects.map((proj) => (
                <Option key={proj} value={proj}>{proj}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Start Date"
              onChange={(date) =>
                setFilters({ ...filters, startDate: date?.format("YYYY-MM-DD") })
              }
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="End Date"
              onChange={(date) =>
                setFilters({ ...filters, endDate: date?.format("YYYY-MM-DD") })
              }
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Checkbox
              checked={filters.benchOnly}
              onChange={(e) => setFilters({ ...filters, benchOnly: e.target.checked })}
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
            handleDeleteMember,
            handleAssignProject,
            handleEditMember,
            handleViewPortfolio
          )}
          dataSource={teamMembers}
          rowKey={(record) => record._id || record.id}
          scroll={{ x: "max-content", y: 400 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
        />
      </Card>

      <Modal
        title={modalState.editingMember ? "Edit Team Member" : "Add Team Member"}
        open={modalState.isMemberModal}
        onOk={handleSaveMember}
        onCancel={() => setModalState({ ...modalState, isMemberModal: false })}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <CustomInput placeholder="Full Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input the email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <CustomInput placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please Select Role" }]}
              >
                <Select placeholder="Select Role">
                  {roles.map((role) => (
                    <Option key={role} value={role}>{role}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="currentProject" label="Current Project">
                <Select placeholder="Select project (optional)" allowClear>
                  {projects.map((proj) => (
                    <Option key={proj} value={proj}>{proj}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="skills"
            label="Skills"
            rules={[{ required: true, message: "Please input skills!" }]}
          >
            <CustomInput
              isTextArea
              rows={3}
              placeholder="Enter skills separated by commas"
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Assign member to Project"
        open={modalState.isAssignModal}
        onCancel={() => setModalState({ ...modalState, isAssignModal: false })}
        onOk={handleAssignOk}
        width={400}
      >
        <Form form={assignForm} layout="vertical">
          <Form.Item
            name="project"
            label="Select Project"
            rules={[{ required: true, message: "Please select a project!" }]}
          >
            <Select placeholder="Choose a project">
              {projects.map((proj) => (
                <Option key={proj} value={proj}>{proj}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamMembers;
