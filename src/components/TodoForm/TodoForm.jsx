import React, { useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Card,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import "./TodoForm.css";

const { TextArea } = Input;

const TodoForm = ({
  onAddTodo,
  loading,
  editingTodo,
  onCancelEdit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTodo) {
      form.setFieldsValue({
        title: editingTodo.title,
        description: editingTodo.description,
        status: editingTodo.status,
      });
    } else {
      form.resetFields();

      form.setFieldsValue({
        status: "Pending",
      });
    }
  }, [editingTodo, form]);

  const handleFinish = async (values) => {
    const success = await onAddTodo(values);

    if (success) {
      form.resetFields();

      form.setFieldsValue({
        status: "Pending",
      });
    }
  };

  return (
    <Card className="todo-card">

      <h2 className="form-title">
        {editingTodo ? "Update Todo" : "Add New Todo"}
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          status: "Pending",
        }}
      >

        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter todo title",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter todo title"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Enter todo description"
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
        >
          <Select size="large">
            <Select.Option value="Pending">
              Pending
            </Select.Option>

            <Select.Option value="Completed">
              Completed
            </Select.Option>
          </Select>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          icon={
            editingTodo ? (
              <EditOutlined />
            ) : (
              <PlusOutlined />
            )
          }
          loading={loading}
          block
        >
          {editingTodo ? "Update Todo" : "Add Todo"}
        </Button>

        {editingTodo && (
          <Button
            size="large"
            icon={<CloseOutlined />}
            onClick={onCancelEdit}
            block
            style={{ marginTop: "10px" }}
          >
            Cancel Edit
          </Button>
        )}

      </Form>
    </Card>
  );
};

export default TodoForm;