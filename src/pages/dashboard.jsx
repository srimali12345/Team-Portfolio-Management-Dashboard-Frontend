import React from "react";
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
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard/dashboard.scss";
import {
  benchMembers,
  recentProjects,
  statusData,
} from "../data/dashboardData";

const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <Title level={2}>Dashboard Overview</Title>
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
                View All
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
                  <Text type="secondary">{project.team} team members</Text>
                </div>
                <div className="project-status">
                  <Badge
                    status={
                      project.status === "Active" ? "processing" : "default"
                    }
                    text={project.status}
                  />
                  <Text className="progress-text">
                    {project.progress}% complete
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
                View All
              </Button>
            }
          >
            {benchMembers.map((member) => (
              <div key={member.id} className="member-item">
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
                      Assign to Project
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
