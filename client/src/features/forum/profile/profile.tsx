import React,{useEffect,useState} from 'react'
import { AccountCircle } from "@material-ui/icons";
import './profile.css'

function Profile({url,setUrl,isEdit}) {
  const [profileObj, setprofileObj] = useState(null);
  async function getProfileURL(){
    setUrl('')
  }
  useEffect(() => {
    getProfileURL()
  }, [])
  
  return (
    <div>
      {
        isEdit ?      
        <label className="custom-file-upload">
          <input type="file" name="file" onChange={
            (e)=>setprofileObj(URL.createObjectURL(e.target.files[0]))
          }/>
          {
            profileObj==null?
            url.length>0?
            <img src={url} alt="profile"></img>:
            <AccountCircle className="!text-7xl text-arma-title"/> 
            :     
            <img src={profileObj} alt="profile" className="profileImg"></img>       
          }
        </label> 
        :
        url.length>0?
        <img src={url} alt="profile"></img>:
        <AccountCircle className="!text-7xl text-arma-title"/> 
      }         
    </div>
  )
}

export default Profile;