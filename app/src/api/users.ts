export const createUser = async (data: {
  name: string;
  google_id: string;
  email: string;
}): Promise<{ name: string; id: string; google_id: string; email: string }> => {
  const response = await fetch("/.netlify/functions/users-create", {
    body: JSON.stringify(data),
    method: "POST"
  });

  const user = await response.json();
  return user;
};
