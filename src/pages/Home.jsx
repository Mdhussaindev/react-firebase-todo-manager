import React, { useState, useEffect } from "react";
import "./Home.css";

import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { message } from "antd";
import { db } from "../firebase/firebaseConfig";

import TodoForm from "../components/TodoForm/TodoForm";
import TodoTable from "../components/TodoTable/TodoTable";
import StatsCards from "../components/StatsCards/StatsCards";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // READ TODOS
  useEffect(() => {
    const q = query(
      collection(db, "todos"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const todoList = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setTodos(todoList);
      },
      (error) => {
        console.error(error);
        message.error("Failed to load todos");
      }
    );

    return () => unsubscribe();
  }, []);

  // ADD / UPDATE TODO
  const handleAddTodo = async (todo) => {
    try {
      setLoading(true);

      if (editingTodo) {
        await updateDoc(doc(db, "todos", editingTodo.id), {
          title: todo.title,
          description: todo.description,
          status: todo.status,
        });

        message.success("Todo updated successfully!");

        setEditingTodo(null);
      } else {
        await addDoc(collection(db, "todos"), {
          title: todo.title,
          description: todo.description,
          status: todo.status,
          createdAt: serverTimestamp(),
        });

        message.success("Todo added successfully!");
      }

      return true;
    } catch (error) {
      console.error(error);
      message.error("Something went wrong!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // DELETE TODO
  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));

      message.success("Todo deleted successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete todo");
    }
  };

  // EDIT TODO
  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingTodo(null);
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

      <StatsCards todos={todos} />

      <TodoForm
        onAddTodo={handleAddTodo}
        loading={loading}
        editingTodo={editingTodo}
        onCancelEdit={handleCancelEdit}
      />

      <TodoTable
        todos={todos}
        loading={loading}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
      />

    </div>
  );
};

export default Home;