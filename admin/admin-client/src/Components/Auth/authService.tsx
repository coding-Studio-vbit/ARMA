const login = async (email: String, password: String) => {
  const userAgent = navigator.userAgent;
  try {
    const serverUrl = (process.env.REACT_APP_SERVER_URL || "http://localhost:5001/").trim();
    const baseUrl = serverUrl.endsWith("/") ? serverUrl : serverUrl + "/";
    const res = await fetch(baseUrl + "login", {
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
    const data = await res.json();
    if (data.status === 1) {
      localStorage.setItem("adminToken", data.response.token);
    }
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    return {
      status: -1,
      response: "Unable to connect to server. Please try again later."
    };
  }
};

export { login };



