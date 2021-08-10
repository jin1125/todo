import React from "react";

export const Main = (props) => {
  const {
    incomplete,
    deleteButton,
    statusButton,
    inputComment,
    commentButton,
  } = props;
  return (
    <>
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
    </>
  );
};
