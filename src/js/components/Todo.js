import React, { useState, useEffect } from 'react';
import {
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons';

const Todo = ({ content, index, updateTodo, removeTodo, moves, moveTo }) => {
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
        {moves.map(move =>
          move == 'Todos' ? (
            <CloseCircleOutlined
              key={Math.random()}
              onClick={() => moveTo(index, 'Todos')}
            />
          ) : move == 'Done' ? (
            <CheckCircleOutlined
              key={Math.random()}
              onClick={() => moveTo(index, 'Done')}
            />
          ) : (
            <SaveOutlined
              key={Math.random()}
              onClick={() => moveTo(index, 'Archived')}
            />
          )
        )}
        <DeleteOutlined key={Math.random()} onClick={() => removeTodo(index)} />
      </div>
    </div>
  );
};

export default Todo;
