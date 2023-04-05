import Cookies from "js-cookie";

const getHomePage = () => {
const token = Cookies.get("_user_token");

  return fetch("http://localhost:3002/home-page", {
    headers: {
      token,
    },
  }).then((response) => {
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  });
};

export default getHomePage;