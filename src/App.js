import React, { useEffect, useState } from "react";
import { Edit } from "./components/Edit";
import { Header } from "./components/Header";
import { Main } from "./Main";

export const App = () => {
  const state = JSON.parse(localStorage.getItem("todos"));
  let status = "未完了";
  const [todos, setTodos] = useState("");
  const [detail, setDetail] = useState("");
  const [comment, setComment] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState([]);
  const [incomplete, setIncomplete] = useState(
    state
      ? state
      : [
          {
            id: 1,
            todos: "勉強する",
            deadline: "2021-08-12",
            status: "未完了",
            date: "2021-08-10",
            detail: "プログラミングの勉強と読書をする",
            comment: "",
          },
          {
            id: 2,
            todos: "仕事する",
            deadline: "2021-08-15",
            status: "未完了",
            date: "2021-08-10",
            detail: "企業に電話とメールをする",
            comment: "",
          },
        ]
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(incomplete));
  }, [incomplete]);

  const id =
    incomplete.length === 0 ? 1 : incomplete[incomplete.length - 1].id + 1;
  const date =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();

  /////////////////////////////描画エリア/////////////////////////////
  return (
    <>
      <Header
        todos={todos}
        detail={detail}
        deadline={deadline}
        incomplete={incomplete}
        setFilter={setFilter}
        setDetail={setDetail}
        setDeadline={setDeadline}
        setIncomplete={setIncomplete}
        setTodos={setTodos}
        id={id}
        status={status}
        date={date}
        comment={comment}
      />

      <Main
        incomplete={incomplete}
        setComment={setComment}
        setIncomplete={setIncomplete}
        filter={filter}
        comment={comment}
      />

      <Edit incomplete={incomplete} setIncomplete={setIncomplete} />
    </>
  );
};
