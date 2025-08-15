import { Avatar, Tag, Space, Badge, Button, Typography } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  COMMON,
  DASHBOARD_CONSTANTS,
  TEAM_MEMBERS_CONSTANT,
} from "../constants";

const { Text } = Typography;

export const roles = [
  "Senior Developer",
  "Junior Developer",
  "UI/UX Designer",
  "QA Engineer",
  "Project Manager",
  "Backend Developer",
  "Frontend Developer",
];

export const projects = ["Seer", "Power Intel", "Million Space", "Auxillium"];

export const getColumnsData = (
  handleDelete,
  handleAssignProject,
  handleEditMember,
  handleViewPortfolio,
  isAdmin
) => [
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
    render: (name) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar size="large" icon={<UserOutlined />} />
        <span style={{ marginLeft: 8 }}>{name}</span>
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email) => <Text>{email}</Text>,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role) => <Tag color="green">{role}</Tag>,
  },
  {
    title: "Skills",
    dataIndex: "skills",
    key: "skills",
    render: (skills) => (
      <>
        {Array.isArray(skills)
          ? skills.map((skill, idx) => (
              <Tag key={`${skill}-${idx}`} color="blue">
                {skill}
              </Tag>
            ))
          : null}
      </>
    ),
  },
  {
    title: "Current Project",
    dataIndex: "currentProject",
    key: "currentProject",
    render: (currentProject) =>
      currentProject ? (
        <Text>{currentProject}</Text>
      ) : (
        <Tag color="orange">{TEAM_MEMBERS_CONSTANT.ONBENCH}</Tag>
      ),
    width: 200,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Badge
        status={status === "active" ? "processing" : "warning"}
        text={status}
      />
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space>
        {isAdmin && (
          <Button
            onClick={() => handleEditMember(record)}
            type="link"
            icon={<EditOutlined />}
          >
            {COMMON.EDIT}
          </Button>
        )}
        {isAdmin && (
          <Button
            onClick={() => handleDelete(record._id)}
            type="link"
            danger
            icon={<DeleteOutlined />}
          >
            {COMMON.DELETE}
          </Button>
        )}
        {record._id ? (
          <Button type="link" onClick={() => handleViewPortfolio(record._id)}>
            {TEAM_MEMBERS_CONSTANT.PORTFOLIO}
          </Button>
        ) : (
          <Text type="warning">{TEAM_MEMBERS_CONSTANT.NOID}</Text>
        )}
        {isAdmin && record.status === "bench" && (
          <Button type="primary" onClick={() => handleAssignProject(record)}>
            {DASHBOARD_CONSTANTS.ASSIGN_TO_PROJECT}
          </Button>
        )}
      </Space>
    ),
  },
];
