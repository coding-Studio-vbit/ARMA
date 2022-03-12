import React,{useEffect,useState} from 'react'
import { AccountCircle } from "@material-ui/icons";
import './profile.css'

function Profile({url,setUrl}) {
  const [profileObj, setprofileObj] = useState(null);
  async function getProfileURL(){
    setUrl('')
  }
  useEffect(() => {
    // getProfileURL()
  }, [])
  
  return (
    <div>
        <label className="custom-file-upload">
          <input type="file" name="file" onChange={
            (e)=>setprofileObj(URL.createObjectURL(e.target.files[0]))
          }/>
          {
            profileObj==null?
            url.length>0?
            <img src={url} alt="fuckc"></img>:
            <AccountCircle className="!text-7xl text-arma-title"/> 
            :     
            <img src={profileObj} alt="fuckc"></img>       
          }
        </label>          
    </div>
  )
}

export default Profile;