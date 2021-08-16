import React from "react";

export const Header = (props) => {
  const {
    todos,
    inputTodos,
    detail,
    inputDetail,
    deadline,
    inputDeadline,
    inputButton,
    check,
    allDeleteButton,
    incomplete,
    desc,
    asc,
    setFilter,
  } = props;

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

        {/* ---------------------- フィルター ---------------------- */}

        <select defaultValue="all" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">全て表示</option>
          <option value="num3">3つ表示</option>
          <option value="imcomplete">未完了のみ表示</option>
          <option value="complete">完了のみ表示</option>
        </select>
      </div>
    </>
  );
};
