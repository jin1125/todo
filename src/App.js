import React, { useState } from "react";

export const App = () => {
  const [todos, setTodos] = useState("");
  const [deadline, setDeadline] = useState("");

  const [incomplete, setIncomplete] = useState([
    {
      id: 1,
      todos: "勉強する",
      deadline: "2021-08-10",
      status: "未完了",
    },
  ]);

  const id = incomplete.length + 1;

  const data = {
    id: id,
    todos: todos,
    deadline: deadline,
    status: "未完了",
  };

  const inputTodos = (e) => {
    setTodos(e.target.value);
  };

  const inputDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const inputButton = () => {
    setIncomplete([...incomplete, data]);
    setTodos("");
    setDeadline(null);
  };

  const allDeleteButton = () => {
    const result = window.confirm("全てのタスクを消しますか？");
    if (result) {
      setIncomplete([]);
    }
  };

  const deleteButton = (index) => {
    const result = window.confirm(
      `ID : ${index+1} のタスクを消しますか？`
    );
    if (result) {
      setIncomplete(
        incomplete.filter((todo)=>(
          todo.id !== index+1
        ))
      );
    }
  };

  return (
    <>
      <label htmlFor="todo">タスク入力</label>
      <input
        type="text"
        id="todo"
        name="todo"
        value={todos}
        onChange={inputTodos}
      />

      <label htmlFor="deadline">期日</label>
      <input type="date" id="date" name="deadline" onChange={inputDeadline} />

      <button onClick={inputButton}>タスクを追加</button>
      <button onClick={allDeleteButton}>全てのタスクを削除</button>

      {incomplete.map((todo, index) => (
        <div key={index}>
          <ul>
            <li>{`ID : ${index+1}`}</li>
            <li>{`タスク : ${todo.todos}`}</li>
            <li>{`期日 : ${todo.deadline}`}</li>
            <li>{`ステータス : ${todo.status}`}</li>
          </ul>
          <button onClick={()=>deleteButton(index)}>
            削除
          </button>
        </div>
      ))}
    </>
  );
};
