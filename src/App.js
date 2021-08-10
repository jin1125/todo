import React, { useEffect, useState } from "react";

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

  //idフィルター
  const idFilter = () => {
    const filterLists = [...incomplete];

    const num3 = filterLists.filter((filterList) => filterList.id <= 3);

    setIncomplete([...num3]);
  };

  //ステータスフィルター(useStateを分けないと不可能？)
  const statusFilter1 = () => {
    const filterLists = [...incomplete];

    const incomp = filterLists.filter(
      (filterList) => filterList.status === "未完了"
    );

    setIncomplete([...incomp]);
  };

  const statusFilter2 = () => {
    const filterLists = [...incomplete];

    const incomp = filterLists.filter(
      (filterList) => filterList.status === "完了"
    );

    setIncomplete([...incomp]);
  };

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
    //  console.log(st);
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
    if (editId > incomplete.length || editId <= 0) {
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
      <div>
        <label htmlFor="todo">タスク入力</label>
        <br />
        <input
          type="text"
          id="todo"
          name="todo"
          value={todos}
          onChange={inputTodos}
        />
      </div>

      <div>
        <label htmlFor="detail">詳細</label>
        <br />
        <textarea
          id="detail"
          name="detail"
          value={detail}
          onChange={inputDetail}
        />
      </div>

      <div>
        <label htmlFor="deadline">期日</label>
        <br />
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={deadline}
          onChange={inputDeadline}
        />
      </div>

      <div>
        <button onClick={inputButton} disabled={check}>
          タスク追加
        </button>
        <button onClick={allDeleteButton} disabled={incomplete.length === 0}>
          全タスク削除
        </button>

        <select
          id="sort"
          onChange={() => {
            const sort = document.getElementById("sort");
            if (sort.value === "desc") {
              desc();
            } else if (sort.value === "asc") {
              asc();
            }
          }}
          disabled={incomplete.length === 0}
        >
          <option>ソート</option>
          <option value="desc">ID降順</option>
          <option value="asc">ID昇順</option>
        </select>

        <button onClick={idFilter} disabled={incomplete.length === 0}>
          ID3までを表示
        </button>

        <button onClick={statusFilter1} disabled={incomplete.length === 0}>
          未完了のみ表示
        </button>
        <button onClick={statusFilter2} disabled={incomplete.length === 0}>
          完了のみ表示
        </button>
      </div>

      <div id="todos">
        {incomplete.map((todo, index) => (
          <div key={index} id="tl">
            <ul>
              <li>{`ID : ${todo.id}`}</li>
              <li>{`作成日 : ${todo.date}`}</li>
              <li id="st">{`ステータス : ${todo.status}`}</li>
              <li>{`タスク : ${todo.todos}`}</li>
              <li>{`詳細 : ${todo.detail}`}</li>
              <li>{`期日 : ${todo.deadline}`}</li>

              <div>
                <button onClick={() => deleteButton(todo, index)}>削除</button>
                <button onClick={() => statusButton(index)}>
                  {todo.status === "完了" ? "未完了" : "完了"}
                </button>
                <div>
                  <label htmlFor={`comment${todo.id}`}>コメント</label>
                  <input
                    type="text"
                    id={`comment${todo.id}`}
                    name={`comment${todo.id}`}
                    onChange={inputComment}
                  />
                  <button onClick={() => commentButton(index)}>追加</button>
                  <p>{todo.comment}</p>
                </div>
              </div>
            </ul>
          </div>
        ))}
      </div>

      <h4>タスク編集</h4>

      {/* 編集機能 */}
      <div>
        <label htmlFor="editId">ID</label>
        <br />
        <input
          type="number"
          id="editId"
          name="editId"
          value={editId}
          onChange={inputEditId}
        />
      </div>

      <div>
        <label htmlFor="editTodo">タスク</label>
        <br />
        <input
          type="text"
          id="editTodo"
          name="editTodo"
          value={editTodo}
          onChange={inputEditTodo}
        />
      </div>

      <div>
        <label htmlFor="editDetail">詳細</label>
        <br />
        <textarea
          id="editDetail"
          name="editDetail"
          value={editDetail}
          onChange={inputEditDetail}
        />
      </div>

      <div>
        <label htmlFor="editDeadline">期日</label>
        <br />
        <input
          type="date"
          id="deadline"
          name="editDeadline"
          value={editDeadline}
          onChange={inputEditDeadline}
        />
      </div>

      <button onClick={editButton} disabled={check2}>
        タスク編集
      </button>
    </>
  );
};
