import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Avatar, Typography } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ProjectOutlined,
  UserOutlined,
  LogoutOutlined,
  ProjectTwoTone,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import { DASHBOARD_CONSTANTS } from "../constants";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      key: "2",
      icon: <TeamOutlined />,
      label: "Team Members",
      path: "/team-members",
    },
    {
      key: "3",
      icon: <ProjectOutlined />,
      label: "Projects",
      path: "/projects",
    },
  ];

  const selectedKey = menuItems.find((item) =>
    location.pathname.startsWith(item.path)
  )?.key;

  return (
    <Layout className="dashboard-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="dashboard-sider"
      >
        <div className="logo">
          <ProjectTwoTone style={{ fontSize: "24px" }} />
          {!collapsed && <span>{DASHBOARD_CONSTANTS.PORTFOLIO_HUB}</span>}
        </div>
        <Menu
          theme="light"
          mode="vertical"
          selectedKeys={[selectedKey]}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => navigate(item.path),
          }))}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="dashboard-header">
          <Button
            type="text"
            icon={<TeamOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger"
          />
          <div className="header-right">
            <Avatar icon={<UserOutlined />}>
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            {!collapsed && (
              <Text className="header-username">{user?.name || "User"}</Text>
            )}
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              {DASHBOARD_CONSTANTS.LOGOUT}
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
