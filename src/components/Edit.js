import React, { useState } from "react";

export const Edit = (props) => {
  const { incomplete, setIncomplete } = props;

  const [editTodo, setEditTodo] = useState("");
  const [editDetail, setEditDetail] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editId, setEditId] = useState(0);

  //編集IDインプット
  const inputEditId = (e) => {
    setEditId(e.target.value);
  };

  //編集タスク名入力欄インプット
  const inputEditTodo = (e) => {
    setEditTodo(e.target.value);
  };

  //編集詳細インプット
  const inputEditDetail = (e) => {
    setEditDetail(e.target.value);
  };

  //編集期日インプット
  const inputEditDeadline = (e) => {
    setEditDeadline(e.target.value);
  };

  const editButton = () => {
    const num = incomplete.map((todo) => {
      return todo.id;
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

  const check2 = editTodo === "" || editDetail === "" || editDeadline === "";

  /////////////////////////////描画エリア/////////////////////////////
  return (
    <>
      <h4>タスク編集</h4>
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
