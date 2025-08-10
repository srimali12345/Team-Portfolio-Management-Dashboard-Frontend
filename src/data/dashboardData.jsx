import {
  TeamOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

export const statusData = [
  {
    title: "Total Team Members",
    value: 45,
    icon: <TeamOutlined />,
    color: "#1890ff",
  },
  {
    title: "Active Projects",
    value: 12,
    icon: <ProjectOutlined />,
    color: "#52c41a",
  },
  {
    title: "On Bench",
    value: 8,
    icon: <ClockCircleOutlined />,
    color: "#faad14",
  },
  {
    title: "Completed Projects",
    value: 28,
    icon: <CheckCircleOutlined />,
    color: "#13c2c2",
  },
];

export const recentProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    status: "Active",
    team: 8,
    progress: 75,
  },
  {
    id: 2,
    name: "Mobile Banking App",
    status: "Active",
    team: 6,
    progress: 60,
  },
  { id: 3, name: "CRM System", status: "Planning", team: 5, progress: 30 },
];

export const benchMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Developer",
    skills: ["React", "Node.js"],
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "UI/UX Designer",
    skills: ["Figma", "Adobe XD"],
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "QA Engineer",
    skills: ["Selenium", "Jest"],
  },
];
