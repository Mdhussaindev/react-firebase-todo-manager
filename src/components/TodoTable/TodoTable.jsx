import React from "react";
import { Table, Tag, Button, Space, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "./TodoTable.css";

const TodoTable = ({
  todos,
  loading,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",

      render: (status) => (
        <Tag
          color={status === "Completed" ? "green" : "orange"}
        >
          {status}
        </Tag>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      align: "center",

      render: (_, record) => (
        <Space size="small">

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete Todo"
            description="Are you sure you want to delete this todo?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(record.id)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  return (
    <div className="todo-table-wrapper">
      <Table
  columns={columns}
  dataSource={todos}
  loading={loading}
  rowKey="id"
  scroll={{ x: 700 }}
  pagination={{
    pageSize: 5,
    hideOnSinglePage: true,
  }}
/>
    </div>
  );
};

export default TodoTable;