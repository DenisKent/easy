export const create = (data: { title: string; completed: boolean }) => {
  return fetch("/.netlify/functions/todos-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then((response) => {
    return response.json();
  });
};

export const readAll = () => {
  return fetch("/.netlify/functions/todos-read-all").then((response) => {
    return response.json();
  });
};

export const update = (todoId: string, data: { title: string; completed: boolean }) => {
  return fetch(`/.netlify/functions/todos-update/${todoId}`, {
    body: JSON.stringify(data),
    method: "POST"
  }).then((response) => {
    return response.json();
  });
};

export const deleteTodo = (todoId: string) => {
  return fetch(`/.netlify/functions/todos-delete/${todoId}`, {
    method: "POST"
  }).then((response) => {
    return response.json();
  });
};

export const batchDeleteTodo = (todoIds: [string]) => {
  return fetch(`/.netlify/functions/todos-delete-batch`, {
    body: JSON.stringify({
      ids: todoIds
    }),
    method: "POST"
  }).then((response) => {
    return response.json();
  });
};
