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
  const [active, setActive] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
    if (!shouldUpdate) return;
    ref.update({ data: todos });
  }, [todos]);

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
    let newTodos = { ...todos };
    let newArr = todos[activeCategory].map((cur, i) =>
      i == index ? val : cur
    );
    newTodos[activeCategory] = newArr;
    setTodos(newTodos);
  }, 1000);

  const removeTodo = debounce(index => {
    let newArr = todos[activeCategory].filter((cur, i) => i != index);
    let newTodos = { ...todos };
    newTodos[activeCategory] = newArr;
    setShouldUpdate(true);
    setTodos(newTodos);
  }, 100);

  const addTodo = debounce(() => {
    let newTodos = { ...todos };
    newTodos[activeCategory] = [...todos[activeCategory], 'New Todo'];
    setShouldUpdate(false);
    setTodos(newTodos);
  }, 100);

  const moveTo = debounce((index, destination) => {
    let el = todos[activeCategory][index];
    console.log(index, el);
    console.log(todos[activeCategory].filter((cur, i) => i != index));
    let newTodos = {
      ...todos,
      [activeCategory]: todos[activeCategory].filter((cur, i) => i != index),
      [destination]: [...todos[destination], el],
    };
    setShouldUpdate(true);
    setTodos(newTodos);
  }, 100);

  return (
    <>
      <div className="todos__wrapper">
        <div className="todos__container">
          <div className="todos__categories">
            {todos &&
              Object.keys(todos).map((cat, index) => (
                <div
                  className={`todos__category ${
                    activeCategory == cat ? 'todos__category--active' : ''
                  }`}
                  key={index}
                  onClick={() => {
                    setActiveCategory(cat);
                  }}
                >
                  {cat}
                </div>
              ))}
          </div>
          <div className="todos__header">
            <div className="todos__header-text">{activeCategory}</div>
            <PlusCircleOutlined onClick={addTodo} />
          </div>
          <div className="todos__controls"></div>
          <div className="todos">
            {todos[activeCategory] &&
              todos[activeCategory].map((cur, index) => (
                <Todo
                  content={cur}
                  index={index}
                  key={`${activeCategory}-${todos[activeCategory].length}-${index}`}
                  updateTodo={updateTodo}
                  removeTodo={removeTodo}
                  activeCategory={activeCategory}
                  moves={Object.keys(todos).filter(
                    cur => cur != activeCategory
                  )}
                  moveTo={moveTo}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
