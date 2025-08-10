import React, { useState } from "react";
import { Layout, Menu, Button, Avatar, Typography } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ProjectOutlined,
  UserOutlined,
  LogoutOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState();
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "2",
      icon: <TeamOutlined />,
      label: "Team Members",
      onClick: () => navigate("/team-members"),
    },
    {
      key: "3",
      icon: <ProjectOutlined />,
      label: "Projects",
      onClick: () => navigate("/projects"),
    },
  ];

  return (
    <Layout className="dashboard-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="dashboard-sider"
      >
        <div className="logo">
          <TrophyOutlined />
          {!collapsed && <span>Portfolio Manager</span>}
        </div>
        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="dashboard-header">
          <Button
            type="text"
            icon={collapsed ? <TeamOutlined /> : <TeamOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger"
          />

          <div className="header-right">
            <Avatar icon={<UserOutlined />} />
            <Text className="header-username">Admin User</Text>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={() => navigate("/login")}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content style={{ padding: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
