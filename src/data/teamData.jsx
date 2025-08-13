import { Avatar, Tag, Space, Badge, Button, Typography } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

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

export const getColumnsData = (handleDeleteMember, handleAssignProject,handleEditMember,handleViewPortfolio) => [
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
        <Tag color="orange">On Bench</Tag>
      ),
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
        <Button onClick={() => {
          handleEditMember(record);
        }} type="link" icon={<EditOutlined />}>
          Edit
        </Button>
        <Button
          onClick={() => {
            handleDeleteMember(record.id);
          }}
          type="link"
          danger
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>

        <Button type="link" onClick={handleViewPortfolio(record)}>Portfolio</Button>
        {record.status === "bench" && (
          <Button
            type="primary"
            onClick={() => {
              handleAssignProject(record);
            }}
          >
            Assign to Project
          </Button>
        )}
      </Space>
    ),
  },
];
