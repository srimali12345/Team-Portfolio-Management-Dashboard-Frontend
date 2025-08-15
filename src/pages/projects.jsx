import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Typography,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  activateProject,
  setStatusFilter,
} from "../store/slices/projectSlice";
import { COMMON, PROJECT } from "../constants";

const { Title } = Typography;
const { Option } = Select;

const Projects = () => {
  const dispatch = useDispatch();

  const { projects, isLoading, statusFilter } = useSelector(
    (state) => state.project
  );
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();
  const isAdmin = useSelector((state) => state.auth.user?.role === "admin");

  useEffect(() => {
    dispatch(fetchProjects());
    fetchTeamMembers();
  }, [dispatch]);

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/team/getMembers");
      const data = await res.json();
      setTeamMembers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    form.setFieldsValue({
      name: project.name,
      description: project.description,
      startDate: project.startDate.split("/").reverse().join("-"),
      endDate:
        project.endDate !== "N/A"
          ? project.endDate.split("/").reverse().join("-")
          : "",
      status: project.status,
      members: project.members?.map((m) => m.memberId),
    });
    setIsModalVisible(true);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await dispatch(deleteProject(id)).unwrap();
      toast.success("Project deleted successfully");
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  const handleActivateProject = async (projectId) => {
    try {
      await dispatch(activateProject(projectId)).unwrap();
      toast.success("Project moved to Working successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to move project");
    }
  };

  const handleModalOk = async () => {
    const values = form.getFieldsValue();
    try {
      if (editingProject) {
        await dispatch(
          updateProject({ id: editingProject._id, projectData: values })
        ).unwrap();
        toast.success("Project updated successfully");
      } else {
        await dispatch(addProject(values)).unwrap();
        toast.success("Project added successfully");
      }
      setIsModalVisible(false);
    } catch (err) {
      toast.error("Failed to save project");
    }
  };

  const columns = [
    { title: "Project Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Status", dataIndex: "status" },
    { title: "Start Date", dataIndex: "startDate" },
    { title: "End Date", dataIndex: "endDate" },
    {
      title: "Members",
      dataIndex: "members",
      render: (members) => (
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {members?.map((m, idx) => (
            <li key={idx} style={{ marginBottom: "4px" }}>
              {m.name} - {m.role}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  if (isAdmin) {
    columns.push({
      title: "Actions",
      render: (_, record) => (
        <Space>
          {isAdmin && (
            <Button onClick={() => handleEditProject(record)}>
              {COMMON.EDIT}
            </Button>
          )}
          {isAdmin && (
            <Button danger onClick={() => handleDeleteProject(record._id)}>
              {COMMON.DELETE}
            </Button>
          )}
          {record.status === "upcoming" && (
            <Button
              type="primary"
              onClick={() => handleActivateProject(record._id)}
            >
              {COMMON.MOVE_TO_WORK}
            </Button>
          )}
        </Space>
      ),
      width: 200,
    });
  }

  const filteredProjects = statusFilter
    ? projects.filter((p) => p.status === statusFilter)
    : projects;

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <Title level={2}>{PROJECT.PROJECT_MANAGEMENT}</Title>
        {isAdmin && (
          <Button type="primary" onClick={handleAddProject}>
            {PROJECT.ADD_PROJECT}
          </Button>
        )}
      </div>

      <Card style={{ marginBottom: 20 }}>
        <Select
          placeholder="Filter by status"
          allowClear
          onChange={(value) => dispatch(setStatusFilter(value))}
          style={{ width: 200 }}
        >
          <Option value="active">{PROJECT.ACTIVE}</Option>
          <Option value="upcoming">{PROJECT.UPCOMING}</Option>
        </Select>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredProjects}
          rowKey="_id"
          scroll={{ x: "max-content", y: 400 }}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          loading={isLoading}
        />
      </Card>

      <Modal
        title={editingProject ? "Edit Project" : "Add Project"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item name="endDate" label="End Date">
            <Input type="date" />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Option value="upcoming">{PROJECT.UPCOMING}</Option>
              <Option value="active">{PROJECT.ACTIVE}</Option>
            </Select>
          </Form.Item>
          <Form.Item name="members" label="Assign Members">
            <Select
              mode="multiple"
              placeholder="Select members"
              optionFilterProp="children"
              showSearch
            >
              {teamMembers.map((member) => (
                <Option key={member._id} value={member._id}>
                  {member.name} ({member.role})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Projects;
