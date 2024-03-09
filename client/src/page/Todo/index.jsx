import React, { useState, useEffect } from "react";
import TodoItem from "../../components/TodoItem";
import instance from "../../apis";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await instance.get("/api/todo");
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = async () => {
    if (inputValue !== "") {
      try {
        await instance.post("/api/todo", { content: inputValue });
        fetchTodos();
        setInputValue("");
        // console.log(todos);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("한 글자 이상 입력");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await instance.delete("/api/todo", { data: { id } });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      await instance.put("/api/todo", {
        id,
        completed: !todoToUpdate.completed,
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>추가</button>
      <ul>
        {todos.length === 0 ? (
          <p>할일 없음</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                onDelete={handleDeleteTodo}
                onComplete={handleCompleteTodo}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
