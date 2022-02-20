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
          let data = await res.json()
          console.log(data);
          
          if(data.status === -1){
            
            return data
          }          
          let role = data.response.user.role
          localStorage.setItem('idk',data.response.token)
          data.response.user.role = {
            ADMIN:false,
            SAC:false,
            FO:false,
            FC:false,
            FACULTY:false
          }
          role.forEach((element:any) => {
            data.response.user.role[element.name] = true
          });
          return data
        } catch (error) {
          console.log(error);
          
          return {response: "Server not available. Try again later", status: -1}
        }
      };
      
      
      

}


  
  