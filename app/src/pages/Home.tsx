import React from "react";
import { useQuery, useQueryClient } from "react-query";
import GoogleLogin from "react-google-login";

import { create, readAll, update } from "../api/todos";

const myTodo = {
  title: "My todo title",
  completed: false
};

const Home: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery("todos", readAll);
  const responseGoogle = (response: any) => {
    console.log("here");
    console.log(response);
  };
  return (
    <div>
      <section>
        <h1>{`Hello ${"Friend"}`}</h1>
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
      </section>
      <section>
        <GoogleLogin
          clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
          isSignedIn={true}
        />
      </section>
    </div>
  );
};
export default Home;
