import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  Avatar,
  Tag,
  Divider,
  Descriptions,
  Space,
  Button,
} from "antd";
import { CaretLeftOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { TEAM_MEMBERS_CONSTANT } from "../constants";

const { Title, Text } = Typography;

const PortfolioView = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState({});

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/team/portfolio/${id}`
        );
        setPortfolio(res.data);
        console.log("Portfolio data:", res.data);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      }
    };
    fetchPortfolio();
  }, [id]);

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <Title level={2}>{TEAM_MEMBERS_CONSTANT.PORTFOLIO_TITLE}</Title>
        <Button type="link" icon={<CaretLeftOutlined />}>
          <Link to="/team-members">Back To Team Members</Link>
        </Button>
      </div>

      <Card className="portfolio-card">
        <Space align="center" size={20} className="portfolio-header">
          <Avatar size={80} icon={<UserOutlined />} />
          <div className="portfolio-header-text">
            <Title level={3} className="portfolio-name">
              {portfolio.name || "N/A"}
            </Title>
            <Text type="secondary">{portfolio.role || "No role assigned"}</Text>
            <div className="portfolio-email">
              <Text>{portfolio.email || "No email provided"}</Text>
            </div>
          </div>
        </Space>

        <Divider />

        <Descriptions column={1} labelStyle={{ fontWeight: "bold" }}>
          <Descriptions.Item label="Current Project">
            {portfolio.currentProject || "Not Assigned"}
          </Descriptions.Item>

          <Descriptions.Item label="Skills">
            {Array.isArray(portfolio.skills)
              ? portfolio.skills.map((skill, index) => (
                  <Tag key={index} color="blue" className="skill-tag">
                    {skill}
                  </Tag>
                ))
              : typeof portfolio.skills === "string"
              ? portfolio.skills.split(",").map((skill, index) => (
                  <Tag key={index} color="blue" className="skill-tag">
                    {skill.trim()}
                  </Tag>
                ))
              : "No skills listed"}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag
              color={portfolio.status === "Active" ? "green" : "red"}
              className="status-tag"
            >
              {portfolio.status || "Unknown"}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default PortfolioView;
