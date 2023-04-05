const registerUser = (user) => {
    return fetch("http://localhost:3002/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
  });
}

  export default registerUser;
