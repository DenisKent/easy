import React from "react";
import { useQuery, useQueryClient } from "react-query";

import { create, readAll, update } from "../api/todos";

const myTodo = {
  title: "My todo title",
  completed: false
};

const Home: React.FC = () => {
  const add = (a: number, b: number): number => {
    return a + b;
  };
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery("todos", readAll);

  return (
    <div>
      <h1>Hello typescript world, {add(5, 5)}</h1>
      {todos.map((todo: any) => {
        const { id } = todo.ref["@ref"];
        return (
          <button
            key={id}
            onClick={async () => {
              const _updatedTodo = await update(id, { title: todo.data.title, completed: !todo.data.completed });
              queryClient.invalidateQueries("todos");
            }}
          >
            {JSON.stringify(todo.data)}
          </button>
        );
      })}
      <button onClick={() => create(myTodo)}>Create todo</button>
    </div>
  );
};
export default Home;
