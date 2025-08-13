import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Statistic,
  Row,
  Col,
  Avatar,
  Badge,
  Typography,
} from "antd";
import {
  TeamOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard/dashboard.scss";
import {
  recentProjects,
  benchMembers as fallbackBench,
} from "../data/dashboardData";
import { DASHBOARD_CONSTANTS } from "../constants";

const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    benchMembers: 0,
  });
  const [benchList, setBenchList] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/team/getMemberStats"
        );
        setStats(res.data);

        const membersRes = await axios.get(
          "http://localhost:8080/api/team/getMembers"
        );
        const members = membersRes.data[0].members || [];
        setBenchList(members.filter((m) => m.status === "bench"));
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setBenchList(fallbackBench);
      }
    };
    fetchStats();
  }, []);

  const statusData = [
    {
      title: "Total Members",
      value: stats.totalMembers,
      color: "#1890ff",
      icon: <TeamOutlined />,
    },
    {
      title: "Active Members",
      value: stats.activeMembers,
      color: "#52c41a",
      icon: <ClockCircleOutlined />,
    },
    {
      title: "Bench Members",
      value: stats.benchMembers,
      color: "#fa8c16",
      icon: <UserOutlined />,
    },
    {
      title: "Active Projects",
      value: 5,
      color: "#52c41a",
      icon: <ProjectOutlined />,
    },
  ];

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <Title level={2}>{DASHBOARD_CONSTANTS.TITLE}</Title>
      </div>

      <Row gutter={[24, 24]} className="stats-section">
        {statusData.map((status, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card">
              <Statistic
                title={status.title}
                value={status.value}
                prefix={status.icon}
                valueStyle={{ color: status.color }}
                icon={status.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} className="stats-section">
        <Col xs={24} lg={12} xl={12}>
          <Card
            title="Recent Projects"
            className="content-card"
            extra={
              <Button type="link" onClick={() => navigate("/projects")}>
                {DASHBOARD_CONSTANTS.VIEW_ALL}
              </Button>
            }
          >
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="project-item"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/projects")}
              >
                <div className="project-info">
                  <Title level={5}>{project.name}</Title>
                  <Text type="secondary">
                    {project.team}
                    {DASHBOARD_CONSTANTS.TEAM_MEMBERS}
                  </Text>
                </div>
                <div className="project-status">
                  <Badge
                    status={
                      project.status === "Active" ? "processing" : "default"
                    }
                    text={project.status}
                  />
                  <Text className="progress-text">
                    {project.progress} {DASHBOARD_CONSTANTS.PRECENTAGE}
                  </Text>
                </div>
              </div>
            ))}
          </Card>
        </Col>

        <Col xs={24} lg={12} xl={12}>
          <Card
            title="Available Team Members"
            className="content-card"
            extra={
              <Button type="link" onClick={() => navigate("/team-members")}>
                {DASHBOARD_CONSTANTS.VIEW_ALL}
              </Button>
            }
          >
            {benchList.map((member) => (
              <div key={member._id} className="member-item">
                <Avatar icon={<UserOutlined />} />
                <div className="member-info">
                  <Title level={5}>{member.name}</Title>
                  <Text type="secondary">{member.role}</Text>
                  <div className="skills">
                    {member.skills.map((skill) => (
                      <Badge
                        key={skill}
                        count={skill}
                        className="skill-badge"
                      />
                    ))}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => navigate("/team-members")}
                    >
                      {DASHBOARD_CONSTANTS.ASSIGN_TO_PROJECT}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
