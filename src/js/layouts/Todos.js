import React, { useEffect, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { debounce } from 'lodash';
import { PlusCircleOutlined } from '@ant-design/icons';

import Todo from './../components/Todo';

const Todos = ({ userData }) => {
  const ref = firebase.firestore().collection('userData').doc(userData.uid);
  const [value, loading, error] = useDocumentData(ref);
  const [todos, setTodos] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    if (!shouldUpdate) return;
    ref.update({ data: todos });
  });

  useEffect(() => {
    let el = document.querySelector('.todos__wrapper');
    el.style.height = getComputedStyle(el).getPropertyValue('height');
  }, []);

  useEffect(() => {
    if (!value) return;
    setShouldUpdate(false);
    setTodos(value.data);
  }, [value]);

  const updateTodo = debounce((index, val) => {
    setShouldUpdate(true);
    let newArr = todos.map((cur, i) => (i == index ? val : cur));
    setTodos(newArr);
  }, 1000);

  const removeTodo = debounce(index => {
    let newArr = todos.filter((cur, i) => i != index);
    setTodos([]);
    setShouldUpdate(true);
    setTodos(newArr);
  }, 100);

  const addTodo = debounce(() => {
    let newArr = [...todos, 'New Todo'];
    setShouldUpdate(false);
    setTodos(newArr);
  }, 100);

  return (
    <>
      <div className="todos__wrapper">
        <div className="todos__container">
          <div className="todos__header">
            <div className="todos__theader-text">Todos</div>
            <PlusCircleOutlined onClick={addTodo} />
          </div>
          <div className="todos__controls"></div>
          <div className="todos">
            {todos.map((cur, index) => (
              <Todo
                content={cur}
                index={index}
                key={index}
                updateTodo={updateTodo}
                removeTodo={removeTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
