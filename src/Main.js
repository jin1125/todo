import React, { useEffect, useState } from "react";

export const Main = (props) => {
  const { incomplete, filter, setIncomplete, comment, setComment } = props;

  const [idOnly, setIdOnly] = useState([]);
  const [incompleteLists, setIncompleteLists] = useState([]);
  const [completeLists, setCompleteLists] = useState([]);

  const commentButton = (index) => {
    const get = incomplete.splice(index, 1)[0];
    const get2 = { ...get, comment: comment };
    incomplete.splice(index, 0, get2);
    setIncomplete([...incomplete]);
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

  //numフィルター
  useEffect(() => {
    const filterLists = [...incomplete];
    const num3 = filterLists.slice(0, 3);

    setIdOnly([...num3]);
  }, [incomplete]);

  //未完了フィルター
  useEffect(() => {
    const filterLists = [...incomplete];

    const incomp = filterLists.filter(
      (filterList) => filterList.status === "未完了"
    );

    setIncompleteLists([...incomp]);
  }, [incomplete]);

  //完了フィルター
  useEffect(() => {
    const filterLists = [...incomplete];

    const incomp = filterLists.filter(
      (filterList) => filterList.status === "完了"
    );

    setCompleteLists([...incomp]);
  }, [incomplete]);

  let lists = [];

  switch (filter) {
    case "all":
      lists = incomplete;
      break;
    case "num3":
      lists = idOnly;
      break;
    case "imcomplete":
      console.log("imcomplete");
      lists = incompleteLists;
      break;
    case "complete":
      console.log("complete");
      lists = completeLists;
      break;
    default:
      lists = incomplete;
  }

  const deleteButton = (todo, index) => {
    const result = window.confirm(`ID : ${todo.id} のタスクを消しますか？`);
    if (result) {
      incomplete.splice(index, 1);
      setIncomplete([...incomplete]);
    }
  };

  const inputComment = (e) => {
    setComment(e.target.value);
  };

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

  /////////////////////////////描画エリア/////////////////////////////
  return (
    <>
      <div id="todos">
        {lists.map((todo, index) => (
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
    </>
  );
};
