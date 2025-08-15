import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Table, Button, Typography } from "antd";
import { fetchPortfolio, clearPortfolio } from "../store/slices/teamSlices";
import { TEAM_MEMBERS_CONSTANT } from "../constants";

const { Title } = Typography;

const PortfolioView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { portfolio, isLoading } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchPortfolio(id));

    return () => {
      dispatch(clearPortfolio());
    };
  }, [dispatch, id]);

  const columns = [
    { title: "Project Name", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="dashboard-content">
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        Back
      </Button>
      <Card>
        <Title level={3}>{TEAM_MEMBERS_CONSTANT.PORTFOLIO}</Title>
        <Table
          columns={columns}
          dataSource={portfolio || []}
          rowKey={(record) => record._id || record.id}
          loading={isLoading}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default PortfolioView;
