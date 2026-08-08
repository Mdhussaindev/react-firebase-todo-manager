import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  UnorderedListOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import "./StatsCards.css";

const StatsCards = ({ todos = [] }) => {
  const total = todos.length;

  const pending = todos.filter(
    (todo) => todo.status === "Pending"
  ).length;

  const completed = todos.filter(
    (todo) => todo.status === "Completed"
  ).length;

  return (
    <Row gutter={[16, 16]} className="stats-row">

      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Total Todos"
            value={total}
            prefix={<UnorderedListOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Pending"
            value={pending}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={8}>
        <Card>
          <Statistic
            title="Completed"
            value={completed}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </Col>

    </Row>
  );
};

export default StatsCards;