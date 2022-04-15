const login = async (email: String, password: String) => {
  const userAgent = navigator.userAgent;
  try {
    const res = await fetch(process.env.REACT_APP_SERVER_URL + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
        userAgent: userAgent,
        userType:'ADMIN'
      }),
    });
    const data = await res.json()
    localStorage.setItem("adminToken", data.response.token)
    return data
  } catch (error) {
    console.log("Faking the login :)");
    return {response: {user:{name:'FakeUser'}}, status: 1}
  }
};

export { login };



