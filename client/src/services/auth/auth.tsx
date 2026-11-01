export class AuthService {
  static async login(
    email: String,
    password: String,
    userType: String
  ): Promise<{ response: any; status: number }> {
    const userAgent = navigator.userAgent;
    try {
      const serverUrl = (process.env.REACT_APP_SERVER_URL || "https://armaserver.onrender.com/").trim();
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
          userType: userType,
          userAgent: userAgent,
        }),
      });
      let data = await res.json();

      if (data.status !== 1 || !data.response?.user) {
        return data;
      }

      let role = data.response.user.role;
      localStorage.setItem("arma_token", data.response.token);
      localStorage.setItem("idk", data.response.token);
      data.response.user.role = {
        ADMIN: false,
        SAC: false,
        FO: false,
        FC: false,
        FACULTY: false,
      };
      if (Array.isArray(role)) {
        role.forEach((element: any) => {
          if (element?.name) {
            data.response.user.role[element.name] = true;
          }
        });
      }
      return data;
    } catch (error) {
      console.log(error);
      return { response: "Server not available. Try again later", status: -1 };
    }
  }
}
