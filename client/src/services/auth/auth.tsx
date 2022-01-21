export class AuthService {

    static async  login(email: String, password: String, userType: String) :Promise<{response:any,status:number}> {
        const userAgent = navigator.userAgent;
        console.log(email, password, userType, userAgent);
        try {
          console.log(process.env.REACT_APP_SERVER_URL);
          const res = await fetch(process.env.REACT_APP_SERVER_URL + "login", {
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
          const data = await res.json()
          localStorage.setItem('idk',data.response.token)
         
          return data
        } catch (error) {
          return {response: "Server not available. Try again later", status: -1}
        }
      };
      
      
      

}


  
  