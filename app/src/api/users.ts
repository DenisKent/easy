export const createUser = (data: { name: string; google_id: string }): any => {
  return fetch("/.netlify/functions/users-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then((response) => {
    return response.json();
  });
};
