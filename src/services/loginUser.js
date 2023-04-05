const loginUser = (user) => {
    return fetch("http://localhost:3002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    });
  };

  export default loginUser;