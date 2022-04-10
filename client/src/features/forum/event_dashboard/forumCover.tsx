import { useEffect } from "react";
import { Add } from "@material-ui/icons";
import "../profile/profile.css";
import axios from "../../../utils/axios";

function ForumCover({ url, setUrl, isEdit=true,profileObj,setprofileObj }) {
  async function getProfileURL() {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}forum/profilePicture`
    );
    console.log(res.data.response)
    setUrl(res.data.response);
  }
  useEffect(() => {
    getProfileURL();
  }, []);

  return (
    <div className="mt-5">
        {profileObj == null ? (
            url.length > 0 ? (
              <img className="profileImg" src={`data:image/png;base64, ${url}`} alt="profile"></img>
            ) : (
                <img
                src="/sky.jpg"
                alt="forum-cover"
                className="w-full h-[300px] object-cover rounded-sm opacity-60"
              />
            )
          ) : (
            <img src={profileObj} alt="profile" className="w-full h-[300px] object-cover rounded-sm opacity-60"
            ></img>
          )}
        <label className="custom-file-upload">
          <input
            type="file"
            name="file"
            onChange={(e) => {
              console.log(URL.createObjectURL(e.target.files[0]))              
              setprofileObj(URL.createObjectURL(e.target.files[0]));

              let myFormData = new FormData();
              myFormData.append("profilePicture", e.target.files[0]);
              axios
                .post(
                  `${process.env.REACT_APP_SERVER_URL}forum/profilePicture`,
                  myFormData
                )
                .then((response) => {
                  console.log(response);
                  window.location.reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
          <div className=" border-2 border-gray-100 absolute text-white z-40 bottom-10 right-10 bg-arma-blue px-5 py-2 rounded-full ">
            <Add fontSize="small" />
            {
                url.length>0?
                "Change Forum Profile":
                "Add Forum Profile"
            }
          </div>         
        </label>
    </div>
  );
}

export default ForumCover;
