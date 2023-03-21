import axios from "axios";

const login = async (username, secret) => {
  return await axios.get("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": "825d2d7b-0d64-4a97-ad5b-f074d475cba3",
      "User-Name": username,
      "User-Secret": secret,
    },
  });
};

const registration = async (username, secret, email, first_name, last_name) => {
  return await axios.post(
    "https://api.chatengine.io/users/",
    { username, secret, email, first_name, last_name },
    {
      headers: {
        "Private-Key": "1597a43b-7b9c-4686-a8d0-b12c27efc478",
      },
    }
  );
};

const userApi = { registration, login };

export default userApi;
