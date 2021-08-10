import React from 'react'

export const Edit = (props) => {
  const {editId,inputEditId,editTodo,inputEditTodo,editDetail,inputEditDetail,editDeadline,inputEditDeadline,editButton,check2} = props;
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
  )
}
