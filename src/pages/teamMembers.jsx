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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomInput from "../components/inputComponent";
import { projects, roles, getColumnsData } from "../data/teamData";
import CustomButton from "../components/buttonComponent";
import axios from "axios";
import toast from "react-hot-toast";
import { TEAM_MEMBERS_CONSTANT } from "../constants";
const { Title } = Typography;
const { Option } = Select;
const TeamMembers = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentProject, setProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAssignModalVisible, setAssignModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [assigningMember, setAssigningMember] = useState(null);

  const [form] = Form.useForm();
  const [assignForm] = Form.useForm();
  const handleClear = () => {
    setSearchTerm("");
    setSelectedRole(null);
    setProject(null);
  };

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/team/getMembers"
        );
        const allMembers = response.data.flatMap((doc) => doc.members);
        const mapData = allMembers.map((member, index) => ({
          id: member._id || index + 1,
          _id: member._id || member.id || null,
          name: member.name,
          email: member.email,
          role: member.role,
          skills: Array.isArray(member.skills)
            ? member.skills
            : typeof member.skills === "string"
            ? member.skills.split(",").map((skill) => skill.trim())
            : [],
          currentProject: member.currentProject || null,
          status: member.status ? member.status.toLowerCase() : "active",
        }));
        console.log("Team Members Data", response.data);
        setTeamMembers(mapData);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    fetchMember();
  }, []);

  const handleAddMember = () => {
    console.log("Add Member Clicked");
    setEditingMember(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleAssignCancel = () => {
    setAssignModalVisible(false);
  };

  const handleOk = async () => {
    try {
      const isEdit = Boolean(editingMember);

      const fields = form.getFieldsValue();
      const skillsArray =
        typeof fields.skills === "string"
          ? fields.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
          : Array.isArray(fields.skills)
          ? fields.skills
          : [];

      const memberData = {
        ...fields,
        skills: skillsArray,
        currentProject: fields.currentProject || null,
        status: fields.currentProject ? "active" : "bench",
      };

      if (isEdit) {
        await axios.put(
          `http://localhost:8080/api/team/updateMember/${editingMember._id}`,
          memberData,
          { headers: { "Content-Type": "application/json" } }
        );

        setTeamMembers((prev) =>
          prev.map((m) =>
            m._id === editingMember._id ? { ...m, ...memberData } : m
          )
        );

        toast.success("Member updated successfully!");
      } else {
        const res = await axios.post(
          "http://localhost:8080/api/team/addMember",
          memberData,
          { headers: { "Content-Type": "application/json" } }
        );

        setTeamMembers((prev) => [...prev, res.data || memberData]);
        toast.success("Member added successfully!");
      }
      setEditingMember(null);
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error saving member:", error);
      toast.error("Failed to save member. Please try again.");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingMember(null);
    setIsModalVisible(false);
  };
  const handleDeleteMember = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this member?",
      onOk: async () => {
        try {
          await axios.delete(
            `http://localhost:8080/api/team/deleteMember/${id}`
          );
          setTeamMembers(teamMembers.filter((member) => member.id !== id));
          toast.success("Member Deleted Sucessfully");
        } catch (error) {
          console.error("Error deleting member:", error);
        }
      },
    });
  };

  const handleAssignProject = (member) => {
    setAssigningMember(member);
    setAssignModalVisible(true);
  };

  const handleAssignOk = async () => {
    const values = assignForm.getFieldsValue();
    const updatedMember = {
      name: assigningMember.name,
      email: assigningMember.email,
      role: assigningMember.role,
      skills: Array.isArray(assigningMember.skills)
        ? assigningMember.skills
        : typeof assigningMember.skills === "string"
        ? assigningMember.skills.split(",").map((s) => s.trim())
        : [],
      currentProject: values.project,
      status: "active",
      _id: assigningMember._id,
    };
    try {
      await axios.put(
        `http://localhost:8080/api/team/updateMember/${assigningMember._id}`,
        updatedMember,
        { headers: { "Content-Type": "application/json" } }
      );

      setTeamMembers((prevMembers) =>
        prevMembers.map((member) =>
          member._id === assigningMember._id
            ? { ...member, ...updatedMember }
            : member
        )
      );
      setAssignModalVisible(false);
      assignForm.resetFields();
      toast.success("Member assigned to project successfully!");
    } catch (error) {
      console.error("Error assigning project:", error);
      toast.error("Failed to assign project.");
    }
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    form.setFieldsValue({
      name: member.name,
      email: member.email,
      role: member.role,
      currentProject: member.currentProject || null,
      skills: Array.isArray(member.skills)
        ? member.skills.join(", ")
        : member.skills,
    });
    setIsModalVisible(true);
  };

  const onFinish = (value) => {
    console.log("values are", value);
  };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <Title level={2}>{TEAM_MEMBERS_CONSTANT.TITLE}</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddMember}
        >
          {TEAM_MEMBERS_CONSTANT.ADD_MEMBER}
        </Button>
      </div>

      <Card style={{ marginBottom: "20px" }}>
        <Row gutter={[24, 24]} className="stats-section">
          <Col xs={24} sm={12} lg={6} xl={6}>
            <CustomInput
              isSearch={true}
              placeholder={"Search By Name or Email"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={(value) => {
                console.log("Search Term:", value);
              }}
            />
          </Col>

          <Col xs={24} sm={12} lg={6} xl={6}>
            <Select
              allowClear
              placeholder="Select By Role"
              value={selectedRole}
              onChange={(value) => setSelectedRole(value)}
              style={{ width: "100%" }}
            >
              {roles.map((role, key) => (
                <Option key={key} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={6} xl={6}>
            <Select
              allowClear
              value={currentProject}
              onChange={(currentProject) => {
                setProject(currentProject);
              }}
              style={{ width: "100%" }}
              placeholder="Select Project"
            >
              {projects.map((currentProject, key) => (
                <Option key={key} value={currentProject}>
                  {currentProject}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={6} xl={6}>
            <CustomButton onClick={handleClear}>
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
            handleEditMember
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
        title={editingMember ? "Edit Team Member" : "Add Team Member"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={[20, 20]}>
            <Col span={12} xl={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <CustomInput placeholder="Full Name" />
              </Form.Item>
            </Col>

            <Col span={12} xl={12}>
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
          <Row gutter={[20, 20]}>
            <Col span={12} xl={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please Select Role " }]}
              >
                <Select
                  placeholder="Select Role"
                  onChange={(value) => setSelectedRole(value)}
                >
                  {roles.map((role, key) => (
                    <Option key={key} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} xl={12}>
              <Form.Item name="currentProject" label="Current Project">
                <Select
                  placeholder="select project (Optional)"
                  allowClear
                  onChange={(value) => setProject(value)}
                >
                  {projects.map((currentProject, key) => (
                    <Option key={key} value={currentProject}>
                      {currentProject}
                    </Option>
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
              isTextArea={true}
              rows="3"
              placeholder="Enter skills separated by commas (e.g., React, Node.js, Python)"
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`Assign member to Project`}
        open={isAssignModalVisible}
        onCancel={handleAssignCancel}
        onOk={handleAssignOk}
        width={400}
      >
        <Form form={assignForm} layout="vertical" name="assignForm">
          <Form.Item
            name="project"
            label="Select Project"
            rules={[{ required: true, message: "Please select a project!" }]}
          >
            <Select placeholder="Choose a project">
              {projects.map((currentProject) => (
                <Option key={currentProject} value={currentProject}>
                  {currentProject}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamMembers;
