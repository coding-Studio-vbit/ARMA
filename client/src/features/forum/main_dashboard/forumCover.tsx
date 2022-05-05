import { useEffect, useState } from "react";
import { Add, CloudUploadOutlined } from "@material-ui/icons";
import "../profile/profile.css";
import axios from "../../../utils/axios";
import { Dialog } from "../../../components/Dialog/Dialog";

function ForumCover() {
  const [url, setUrl] = useState("");
  const [profileObj, setprofileObj] = useState<any>();
  const [file, setFile] = useState<File>(null);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  async function getProfileURL() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}forum/dashboardCover`
      );
      setUrl(res.data.response);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateForumCover() {
    try {
      let myFormData = new FormData();
            myFormData.append("dashboardCover",file);
            axios
              .post(
                `${process.env.REACT_APP_SERVER_URL}forum/dashboardCover`,
                myFormData
              )
              .then((response) => {
                console.log(response);
                //window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
      setShowDialog(true);
      setDialogMessage("Forum Cover Updated Successfully");
    } catch (error) {
      console.log(error);
      setShowDialog(true);
      setDialogMessage("Failed to Update Forum Cover");
    }
  }

  useEffect(() => {
    getProfileURL();
  }, []);

  return (
    <div className="mt-5">
      <Dialog
        show={showDialog}
        setShow={setShowDialog}
        children={<div>{dialogMessage}</div>}
        title="Information"
      />
      {profileObj == null ? (
        url?.length > 0 ? (
          <img
            className="w-full h-[300px] object-cover rounded-sm "
            src={`data:image/png;base64, ${url}`}
            alt="profile"
          ></img>
        ) : (
          <img
            src="/sky.jpg"
            alt="forum-cover"
            className="w-full h-[300px] object-cover rounded-sm "
          />
        )
      ) : (
        <img
          src={profileObj}
          alt="profile"
          className="w-full h-[300px] object-cover rounded-sm"
        ></img>
      )}
      <label className="custom-file-upload">
        <input
          type="file"
          name="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setprofileObj(URL.createObjectURL(e.target.files[0]));
            
          }}
        />
        <div className="font-medium absolute text-white z-40 bottom-5 right-10 bg-arma-blue px-5 py-2 rounded-full ">
          {/* <Add fontSize="small" /> */}
          <Add fontSize="small"/>
          {" "}
          {url?.length > 0 ? "Change dashboard cover" : "Add dashboard cover"}
        </div>
      </label>

      {profileObj != null && (
        <button
          className="rounded-full font-medium absolute 
          bg-white z-40 bottom-10 right-3 text-arma-blue px-5 py-2"
          onClick={() => updateForumCover()}
        >
          <CloudUploadOutlined fontSize="small" />
        </button>
      )}
    </div>
  );
}

export default ForumCover;
