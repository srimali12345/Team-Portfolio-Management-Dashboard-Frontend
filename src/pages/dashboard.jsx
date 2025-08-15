import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { DASHBOARD_CONSTANTS } from "../constants";
import { fetchTeamStats, fetchTeamMembers } from "../store/slices/teamSlices";
import { fetchProjects } from "../store/slices/projectSlice";
import "../styles/Dashboard/dashboard.scss";

const { Title, Text } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const {
    stats,
    members,
    isLoading: teamLoading,
  } = useSelector((state) => state.team);
  const { projects, isLoading: projectLoading } = useSelector(
    (state) => state.project
  );

  useEffect(() => {
    dispatch(fetchTeamStats());
    dispatch(fetchTeamMembers({ benchOnly: true }));
    dispatch(fetchProjects());
  }, [dispatch]);

  const benchList = members.filter((m) => m.status === "bench");
  const recentProjects = projects.slice(0, 3);
  const activeProjectsCount = projects.filter(
    (p) => p.status === "active"
  ).length;

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
      value: activeProjectsCount,
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
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="project-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/projects")}
                >
                  <div className="project-info">
                    <Title level={5}>{project.name}</Title>
                    <Text type="secondary">
                      {project.members?.length || 0}{" "}
                      {DASHBOARD_CONSTANTS.TEAM_MEMBERS}
                    </Text>
                  </div>
                  <div className="project-status">
                    <Badge
                      status={
                        project.status === "active" ? "processing" : "default"
                      }
                      text={project.status}
                    />
                    <Text className="progress-text">
                      {project.progress || 0}%
                    </Text>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {DASHBOARD_CONSTANTS.NO_PROJECTS}
              </div>
            )}
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
            {benchList.length > 0 ? (
              benchList.map((member) => (
                <div key={member._id} className="member-item">
                  <Avatar icon={<UserOutlined />} />
                  <div className="member-info">
                    <Title level={5}>{member.name}</Title>
                    <Text type="secondary">{member.role}</Text>
                    <div className="skills">
                      {member.skills?.map((skill) => (
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
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {DASHBOARD_CONSTANTS.NO_MEMBERS}
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
