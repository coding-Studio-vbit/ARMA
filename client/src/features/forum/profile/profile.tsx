import React, { useEffect, useState } from "react";
import { AccountCircle } from "@material-ui/icons";
import "./profile.css";
import axios from "../../../utils/axios";

function Profile({ url, setUrl, isEdit }) {
  const [profileObj, setprofileObj] = useState(null);
  async function getProfileURL() {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}forum/profilePicture`
    );

    console.log(response.data);
    setUrl(response.data);
  }
  useEffect(() => {
    getProfileURL();
  }, []);

  return (
    <div>
      {isEdit ? (
        <label className="custom-file-upload">
          <input
            type="file"
            name="file"
            onChange={(e) => {
              console.log(URL.createObjectURL(e.target.files[0]))              
              setprofileObj(URL.createObjectURL(e.target.files[0]));
              let myFormData = new FormData();
              myFormData.append("profilePicture", URL.createObjectURL(e.target.files[0]));
              axios
                .post(
                  `${process.env.REACT_APP_SERVER_URL}forum/profilePicture`,
                  myFormData
                )
                .then((response) => {
                  console.log(response);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
          {profileObj == null ? (
            url.length > 0 ? (
              <img src={url} alt="profile"></img>
            ) : (
              <AccountCircle className="!text-7xl text-arma-title" />
            )
          ) : (
            <img src={profileObj} alt="profile" className="profileImg"></img>
          )}
        </label>
      ) : url.length > 0 ? (
        <img src={url} alt="profile"></img>
      ) : (
        <AccountCircle className="!text-7xl text-arma-title" />
      )}
    </div>
  );
}

export default Profile;
