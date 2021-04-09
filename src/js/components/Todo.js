import React, { useState, useEffect } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';

const Todo = ({ content, index, updateTodo, removeTodo }) => {
  return (
    <div className="todo">
      <div className="todo__index">{index + 1}.</div>
      <input
        onChange={e => {
          updateTodo(index, e.target.value);
        }}
        className="todo__content"
        defaultValue={content}
      ></input>
      <div className="todo__controls">
        <CloseCircleOutlined onClick={() => removeTodo(index)} />
      </div>
    </div>
  );
};

export default Todo;
