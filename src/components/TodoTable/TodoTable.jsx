import React from "react";
import { Table, Tag } from "antd";
import "./TodoTable.css";

const TodoTable = ({ todos, loading }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={todos}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default TodoTable;