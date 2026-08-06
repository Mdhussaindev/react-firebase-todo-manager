import React from "react";
import { Form, Input, Select, Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./TodoForm.css";

const { TextArea } = Input;

const TodoForm = ({ onAddTodo, loading }) => {
  const [form] = Form.useForm();

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
      <h2 className="form-title">Add New Todo</h2>

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
          icon={<PlusOutlined />}
          loading={loading}
          block
        >
          Add Todo
        </Button>
      </Form>
    </Card>
  );
};

export default TodoForm;