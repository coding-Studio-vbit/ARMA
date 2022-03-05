import React,{useState} from 'react';
import profilepic from '../../../assets/profilepic.png';
import { AccountCircle} from "@material-ui/icons";

function Profile({link,onChange}) {
    const [url, setUrl] = useState<string>(link);
    const [image,setImage] = useState(null);
    async function updateProfile() {
        try {
            //updateProfile()
            //onChange to setURL and setImage to null 

        } catch (error) {
            //display dialog: update failed
        }
        
    }
  return (
    <div>
        { 
            image==null?
            
                url.length>0?<img src={url}> </img>: 
                <AccountCircle className="!text-7xl text-arma-title" />
            
      
      :<img src={image}> </img>
        }
        <label>
         <input
                    name="profile"
                    id="file-upload"
                    onChange={(e)=>{setImage(e.target.files[0]) }}

                    className="hidden"
                    type="file"
                ></input>
                upload profile
        </label>

      </div>

    
  )
}

export default Profile