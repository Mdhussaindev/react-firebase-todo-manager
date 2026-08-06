import React, { useState } from "react";
import "./Home.css";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { message } from "antd";

import { db } from "../firebase/firebaseConfig";

import TodoForm from "../components/TodoForm/TodoForm";
import TodoTable from "../components/TodoTable/TodoTable";
import StatsCards from "../components/StatsCards/StatsCards";



const Home = () => {
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async (todo) => {
    try {
      setLoading(true);

      await addDoc(collection(db, "todos"), {
        title: todo.title,
        description: todo.description,
        status: todo.status,
        createdAt: serverTimestamp(),
      });

      message.success("Todo Added Successfully!");

      return true;
    } catch (error) {
      console.error(error);
      message.error("Failed to add todo");

      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <header className="hero">
        <h1>📝 React Todo Manager</h1>

        <p>
          Manage your daily tasks with React,
          Firebase & Ant Design
        </p>
      </header>

      <StatsCards />

      <TodoForm
        onAddTodo={handleAddTodo}
        loading={loading}
      />

      <TodoTable />
    </div>
  );
};

export default Home;