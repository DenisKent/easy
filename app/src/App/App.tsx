import React from "react";

function createTodo(todo: { title: string; completed: boolean }) {
  return fetch("/.netlify/functions/todos-create", {
    body: JSON.stringify(todo),
    method: "POST"
  }).then((response) => {
    return response.json();
  });
}

const myTodo = {
  title: "My todo title",
  completed: false
};

const App: React.FC = () => {
  const add = (a: number, b: number): number => {
    return a + b;
  };

  return (
    <div>
      <h1>Hello typescript world, {add(5, 5)}</h1>
      <button onClick={() => createTodo(myTodo)}>Create todo</button>
    </div>
  );
};
export default App;
