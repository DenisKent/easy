import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

import { create, readAll, update } from "../api/todos";

const myTodo = {
  title: "My todo title",
  completed: false
};

const Home: React.FC = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();
  console.log({ isLoading, isAuthenticated, error, user, loginWithRedirect, logout });
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery("todos", readAll);

  return (
    <div>
      <h1>{`Hello ${user?.given_name || "Friend"}`}</h1>
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
      <button
        onClick={async () => {
          await create(myTodo);
          queryClient.invalidateQueries("todos");
        }}
      >
        Create todo
      </button>
      <button onClick={() => loginWithRedirect()}>Login</button>
      <button onClick={() => logout({ returnTo: process.env.DOMAIN })}>Logout</button>
    </div>
  );
};
export default Home;
