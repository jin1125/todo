import React, { useEffect, useState } from "react";
import { Edit } from "./components/Edit";
import { Header } from "./components/Header";
import { Main } from "./Main";

export const App = () => {
  const state = JSON.parse(localStorage.getItem("todos"));
  let status = "未完了";
  const [todos, setTodos] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [detail, setDetail] = useState("");
  const [editDetail, setEditDetail] = useState("");
  const [comment, setComment] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editId, setEditId] = useState(0);
  const [filter,setFilter] = useState([]);
  // const [all,setAll] = useState([]);
  const [idOnly,setIdOnly] = useState([]);
  const [incompleteLists,setIncompleteLists] = useState([]);
  const [completeLists,setCompleteLists] = useState([]);
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

  const data = {
    id: id,
    todos: todos,
    deadline: deadline,
    status: status,
    date: date,
    detail: detail,
    comment: comment,
  };

  //編集IDインプット
  const inputEditId = (e) => {
    setEditId(e.target.value);
  };

  //タスク名入力欄インプット
  const inputTodos = (e) => {
    setTodos(e.target.value);
  };

  //編集タスク名入力欄インプット
  const inputEditTodo = (e) => {
    setEditTodo(e.target.value);
  };

  //詳細インプット
  const inputDetail = (e) => {
    setDetail(e.target.value);
  };

  //編集詳細インプット
  const inputEditDetail = (e) => {
    setEditDetail(e.target.value);
  };

  //期日インプット
  const inputDeadline = (e) => {
    setDeadline(e.target.value);
  };

  //編集期日インプット
  const inputEditDeadline = (e) => {
    setEditDeadline(e.target.value);
  };

  //タスク追加ボタン
  const inputButton = () => {
    setIncomplete([...incomplete, data]);
    setTodos("");
    setDetail("");
    setDeadline("");
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

  const deleteButton = (todo, index) => {
    const result = window.confirm(`ID : ${todo.id} のタスクを消しますか？`);
    if (result) {
      incomplete.splice(index, 1);
      setIncomplete([...incomplete]);
    }
  };

  ///////////////////////////フィルター///////////////////////////////
  // useEffect(()=>{
  //   setAll([...incomplete])
  // },[incomplete])

  //idフィルター
  // const idFilter = () => {
    //   const filterLists = [...incomplete];
    //   const num3 = filterLists.filter((filterList) => filterList.id <= 3);
    //   setIncomplete([...num3]);


    //ステータスフィルター
    // const statusFilter1 = () => {
    //   const filterLists = [...incomplete];
    //   const incomp = filterLists.filter(
    //     (filterList) => filterList.status === "未完了"
    //   );
    //   setIncomplete([...incomp]);
    // };

    // const statusFilter2 = () => {
    //   const filterLists = [...incomplete];
  
    //   const incomp = filterLists.filter(
    //     (filterList) => filterList.status === "完了"
    //   );
  
    //   setIncomplete([...incomp]);
    // };


    //numフィルター
  useEffect(()=>{
      const filterLists = [...incomplete];
      const num3 = filterLists.slice(0,3);
  
      setIdOnly([...num3]);

    },[incomplete])


    //未完了フィルター
  useEffect(()=>{
    const filterLists = [...incomplete];

    const incomp = filterLists.filter(
      (filterList) => filterList.status === "未完了"
    );

    setIncompleteLists([...incomp]);

    },[incomplete])


    //完了フィルター
  useEffect(()=>{
    const filterLists = [...incomplete];
  
    const incomp = filterLists.filter(
      (filterList) => filterList.status === "完了"
    );

    setCompleteLists([...incomp]);

    },[incomplete])


  //ID降順ソート
  const desc = () => {
    incomplete.sort((a, b) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    });

    setIncomplete([...incomplete]);
  };

  //ID昇順ソート
  const asc = () => {
    incomplete.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

    setIncomplete([...incomplete]);
  };

  const check = todos === "" || detail === "" || deadline === "";
  const check2 = editTodo === "" || editDetail === "" || editDeadline === "";

  useEffect(() => {
    const st = document.querySelectorAll("#st");
    for (let i = 0; i < st.length; i++) {
      if (st[i].textContent === "ステータス : 未完了") {
        st[i].parentElement.classList.add("bgyellow");
      } else {
        st[i].parentElement.classList.remove("bgyellow");
      }
    }
  });

  const inputComment = (e) => {
    setComment(e.target.value);
  };

  const commentButton = (index) => {
    const get = incomplete.splice(index, 1)[0];
    const get2 = { ...get, comment: comment };
    incomplete.splice(index, 0, get2);
    setIncomplete([...incomplete]);
  };

  const editButton = () => {
    const num = incomplete.map((todo)=>{
      return todo.id
    });

    if (!num.includes(parseInt(editId))) {
      window.alert("入力したIDのリストはありません");
      return;
    }

    const get1 = incomplete.map((todo) => {
      // eslint-disable-next-line eqeqeq
      if (todo.id == editId) {
        const edit = {
          ...todo,
          todos: editTodo,
          detail: editDetail,
          deadline: editDeadline,
        };
        setEditId("");
        setEditTodo("");
        setEditDetail("");
        setEditDeadline("");

        return edit;
      } else {
        return todo;
      }
    });

    setIncomplete([...get1]);
  };

  //描画エリア
  return (
    <>
      <Header
        todos={todos}
        inputTodos={inputTodos}
        detail={detail}
        inputDetail={inputDetail}
        deadline={deadline}
        inputDeadline={inputDeadline}
        inputButton={inputButton}
        check={check}
        allDeleteButton={allDeleteButton}
        incomplete={incomplete}
        desc={desc}
        asc={asc}
        idOnly={idOnly}
        setFilter={setFilter}
      />

      <Main
      incomplete={incomplete}
      deleteButton={deleteButton}
      statusButton={statusButton}
      inputComment={inputComment}
      commentButton={commentButton}
      filter={filter}
      // all={all}
      idOnly={idOnly}
      completeLists={completeLists}
      incompleteLists={incompleteLists}
      />

      <Edit
      editId={editId}
      inputEditId={inputEditId}
      editTodo={editTodo}
      inputEditTodo={inputEditTodo}
      editDetail={editDetail}
      inputEditDetail={inputEditDetail}
      editDeadline={editDeadline}
      inputEditDeadline={inputEditDeadline}
      editButton={editButton}
      check2={check2}
      />
    </>
  );
};
