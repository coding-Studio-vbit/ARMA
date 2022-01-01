const authService = require("../../../../services/auth/authService");

const auth = (router) => {
    router.post("/login" ,async (req,res) =>{
      console.log(req.body);
      const {email,password,userType,userAgent} = (req.body)
        const result = await authService.login(email,password,userAgent,userType)

      res.json(result)
    })


  };
  
  module.exports = auth;