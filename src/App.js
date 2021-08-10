import React, { useState } from "react";

export const App = () => {
  let status = "未完了";
  const [todos, setTodos] = useState("");
  const [detail, setDetail] = useState("");
  const [deadline, setDeadline] = useState(undefined);
  const [incomplete, setIncomplete] = useState([
    {
      id: 1,
      todos: "勉強する",
      deadline: "2021-08-12",
      status: "未完了",
      date: "2021-08-10",
      detail: "プログラミングの勉強と読書をする",
    },
    {
      id: 2,
      todos: "仕事する",
      deadline: "2021-08-15",
      status: "未完了",
      date: "2021-08-10",
      detail: "企業に電話とメールをする",
    },
  ]);

  console.log(detail);

  const id = incomplete.length + 1;
  const date =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();

  const data = {
    id: id,
    todos: todos,
    deadline: deadline,
    status: status,
    date: date,
    detail:detail
  };

  const inputTodos = (e) => {
    setTodos(e.target.value);
  };

  const inputDetail = (e) => {
    setDetail(e.target.value);
  };

  const inputDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const inputButton = () => {
    setIncomplete([...incomplete, data]);
    setTodos("");
    setDetail("");
  };

  // ステータスの切り替え
  const statusButton = (index) => {
    if (incomplete[index].status === "未完了") {
      let target = incomplete[index];
      target.status = "完了";

      const newTodos = [...incomplete];
      newTodos.splice(index, 1, target);
      setIncomplete(newTodos);
    } else if (incomplete[index].status === "完了") {
      let target = incomplete[index];
      target.status = "未完了";

      const newTodos = [...incomplete];
      newTodos.splice(index, 1, target);
      setIncomplete(newTodos);
    }
  };

  const allDeleteButton = () => {
    const result = window.confirm("全てのタスクを消しますか？");
    if (result) {
      setIncomplete([]);
    }
  };

  const deleteButton = (index) => {
    const result = window.confirm(`ID : ${index + 1} のタスクを消しますか？`);
    if (result) {
      setIncomplete(incomplete.filter((todo) => todo.id !== index + 1));
    }
  };

  const check = todos === "" || detail === "" || deadline === undefined;

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

      <label htmlFor="detail">タスク詳細</label>
      <textarea
        id="detail"
        name="detail"
        value={detail}
        onChange={inputDetail}
      />

      <label htmlFor="deadline">期日</label>
      <input type="date" id="date" name="deadline" onChange={inputDeadline} />

      <div>
        <button onClick={inputButton} disabled={check}>
          タスクを追加
        </button>
        <button onClick={allDeleteButton} disabled={incomplete.length === 0}>
          全てのタスクを削除
        </button>
      </div>

      {incomplete.map((todo, index) => (
        <div key={index} id="todo">
          <ul>
            <li>{`ID : ${index + 1}`}</li>
            <li>{`作成日 : ${todo.date}`}</li>
            <li>{`ステータス : ${todo.status}`}</li>
            <li>{`タスク : ${todo.todos}`}</li>
            <li>{`詳細 : ${todo.detail}`}</li>
            <li>{`期日 : ${todo.deadline}`}</li>

            <div>
              <button onClick={() => deleteButton(index)}>削除</button>
              <button onClick={() => statusButton(index)}>
                {todo.status === "完了" ? "未完了" : "完了"}
              </button>
            </div>
          </ul>
        </div>
      ))}
    </>
  );
};
