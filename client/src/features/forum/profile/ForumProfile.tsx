import { Delete, Edit } from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/CustomTable";
import { Dialog } from "../../../components/Dialog/Dialog";
import { InputField } from "../../../components/InputField/InputField";
import { TextArea } from "../../../components/InputField/TextArea";
import { useUser } from "../../../providers/user/UserProvider";
import ForumService from "../../../services/forum/ForumService";
import axios from "../../../utils/axios";
import Profile from "./profile";
import Select from "react-select";

let headers: any[] = [
  {
    displayName: "Roll Number",
    dataPath: "rollNumber",
    sortable: true,
  },
  { displayName: "Name", dataPath: "name", sortable: false },
  { displayName: "Department", dataPath: "branch", sortable: true },
  { displayName: "Year", dataPath: "year", sortable: true },
  { displayName: "Section", dataPath: "section", sortable: false },
  { displayName: "Designation", dataPath: "designation", sortable: false },
];
let memHeaders: any[] = [
  {
    displayName: "Roll Number",
    dataPath: "rollNumber",
    sortable: true,
  },
  { displayName: "Name", dataPath: "name", sortable: false },
  { displayName: "Department", dataPath: "branch", sortable: true },
  { displayName: "Year", dataPath: "year", sortable: true },
  { displayName: "Section", dataPath: "section", sortable: false },
];

export default function ForumProfile() {
  const navigate = useNavigate();
  const { forum, setForum } = useUser();
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  //const [link, setLink] = useState("")
  const [description, setDescription] = useState<string>(
    forum?.description ?? " "
  );
  const [facultycoordinator, setFacultycoordinator] = useState<string>(
    forum?.facultyCoordinatorID.name ?? " "
  );
  // const [allCheckedCore,setAllCheckedCore] = useState(false)
  // const [allCheckedMem,setAllCheckedMem] = useState(false)
  const [loading, setLoading] = useState(false);
  const [show1, setShow1] = useState(false);
  const [myfac, setMyFac] = useState<{}[]>();
  const [dialogMsg, setDialogMsg] = useState<{
    title: string;
    proceed: () => Promise<void>;
  }>({ title: "", proceed: async () => {} });
  // console.log("Rebuild Profile");
  const [profileObj, setprofileObj] = useState(null);
  const [pictureChanged, setPictureChanged] = useState<boolean>(false);
  const [url, setUrl] = useState("");
  let [name, setName] = useState<string>(" ");

  const [forumEmail, setForumEmail] = useState<string>(forum?.email ?? " ");

  const handelCheckbox = (
    item: any,
    i: number,
    core: boolean,
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    let displayName = (
      <input
        key={i}
        className="w-5 h-5 rounded-none accent-[#0B5B8A] cursor-pointer"
        type="checkbox"
        name={item?.studentID ? "core" : "noncore"}
        onChange={(e) => console.log(e.target.name)}
      ></input>
    );
    item["displayName"] = displayName;
    let dataPath = (
      <div key={i} className="flex items-center   justify-around gap-2">
        {/* <input
          className="w-5 h-5  rounded-none accent-[#0B5B8A] cursor-pointer"
          type="checkbox"
          
          name={item.name}
          onChange={(e) => null}
        ></input> */}
        <Delete
          className="text-black/50"
          onClick={async () => {
            setDialogMsg({
              title: "Are you sure want to delete the member?",
              proceed: async () => {
                const res = await ForumService.deleteForumMemeber(
                  forum?.name ?? "",
                  core ? item.studentID._id : item._id,
                  core ? "core" : "nonCore"
                );
                setShow1(false);
                setDialogMsg({ title: "", proceed: async () => {} });
                setLoading(false);
                setMessage(res);
                setShow(true);
                setUpdate((v) => !v);
              },
            });
            setShow1(true);
          }}
        />
      </div>
    );
    item["dataPath"] = dataPath;
    if (memHeaders.length === 5) {
      if (!core) {
        memHeaders.push({
          displayName: "Actions",
          dataPath: "dataPath",
          sortable: false,
        });
      }
    }
    if (headers.length === 6) {
      if (core) {
        headers.push({
          displayName: "Actions",
          dataPath: "dataPath",
          sortable: false,
        });
      }
    }
    item.designation = item.forumCoreTeamMemberships.filter((v) => {
      return v.forumId.name == forum.name;
    })[0]?.designation;
    return { ...item };
  };
  const save = async () => {
    const res = await axios.put(
      process.env.REACT_APP_SERVER_URL + "forum/updateProfile",
      {
        email: forumEmail,
        description: description,
        facultyCoordinator: facultycoordinator,
      }
    );
    if (pictureChanged) {
      let myFormData = new FormData();
      console.log(profileObj);
      myFormData.append("profilePicture", profileObj);
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}forum/profilePicture`,
          myFormData
        )
        .then((response) => {
          console.log(response);
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const data = res.data;
    if (data.status === 1) {
      setForum(data.response);
      setMessage("Details Updated");
    } else {
      setMessage(data.response);
      setForumEmail(forum?.email ?? "");
      setFacultycoordinator(forum?.facultyCoordinatorID.name ?? "");
      setDescription(forum?.description ?? "");
      setIsEdit(false);
    }
    setShow(true);
    setIsEdit(false);
  };

  useEffect(() => {
    const faculty = async () => {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_URL + "faculty/fetchFaculty",
        { name: name }
      );
      const data = res.data.response;
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push({ value: data[i].name, label: data[i].name });
      }

      setMyFac(arr);
    };
    if (name.length !== 0) {
      faculty();
    } else {
      setMyFac([]);
    }
  }, [name]);
  const handleInputChange = (characterEntered) => {
    setName(characterEntered);

    console.log(name);
  };
  return (
    <div className="mt-8 overflow-x-auto">
      <Dialog
        show={show1}
        setShow={setShow1}
        title={dialogMsg.title}
        loading={loading}
      >
        <button className="outlineBtn" onClick={() => setShow1(false)}>
          Cancel
        </button>
        <button
          className="btn"
          onClick={async () => {
            setLoading(true);
            setDialogMsg({ title: "Deleting...", proceed: async () => {} });

            await dialogMsg.proceed();
          }}
        >
          Proceed
        </button>
      </Dialog>

      <div className="flex flex-col items-center m-auto sm:w-[80%] md:w-max w-[90%] ">
        <Profile
          url={url}
          setUrl={setUrl}
          isEdit={isEdit}
          profileObj={profileObj}
          setprofileObj={setprofileObj}
          setPictureChanged={setPictureChanged}
        />
        <span className="text-center  item-center text-2xl font-semibold text-arma-blue">
          {forum?.name}
          <AnimatePresence initial={false} exitBeforeEnter>
            {!isEdit && (
              <motion.span
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: 0.25 }}
              >
                <Edit
                  className="ml-3 text-black !text-xl cursor-pointer"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <p className="text-black mb-10 text-lg">Forum</p>
        <div className="mx-auto w-full">
          <TextArea
            className="mb-5 resize-none	"
            name="Forum Description"
            value={description}
            disabled={!isEdit}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col w-full md:flex-row gap-y-8 sm:gap-x-8">
          {isEdit ? (
            <Select
              name="Faculty Coordinator"
              isDisabled={true}
              options={myfac}
              placeholder={facultycoordinator}
              onInputChange={handleInputChange}
              noOptionsMessage={() => null}
              onChange={(e: any) => {
                setFacultycoordinator(e?.value);
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: 52,
                  minWidth: 270,
                  borderRadius: "0.5rem",
                  border: "2px solid rgb(200, 200, 200)",
                }),

                placeholder: (base) => ({
                  ...base,
                  color: "black",
                }),

                valueContainer: (base) => ({
                  ...base,
                  paddingLeft: "16px",
                }),
              }}
              className="basic-multi-select "
            />
          ) : (
            <InputField
              className="mb-5"
              name="Faculty Coordinator"
              disabled={!isEdit}
              value={facultycoordinator}
              onChange={(e) => {
                setFacultycoordinator(e.target.value);
              }}
            />
          )}

          <InputField
            className="mb-5"
            name="Forum Email"
            value={forumEmail}
            disabled={true}
            onChange={(e) => {
              setForumEmail(e.target.value);
            }}
          />
        </div>
        <div className="h-12">
          <AnimatePresence initial={false} exitBeforeEnter>
            {isEdit && (
              <motion.div
                initial={{ y: "-1vh", opacity: 0 }}
                animate={{ y: "0", opacity: 1 }}
                exit={{ y: "-0.5vh", opacity: 0 }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              >
                <button
                  className="btn mr-8  bg-arma-title rounded-[8px] px-6 py-2"
                  onClick={() => {
                    setForumEmail(forum?.email ?? "");
                    setFacultycoordinator(
                      forum?.facultyCoordinatorID.name ?? ""
                    );
                    setDescription(forum?.description ?? "");
                    setIsEdit(false);
                  }}
                >
                  CANCEL
                </button>
                <button
                  className="btn  bg-arma-title rounded-[8px] px-6 py-2 m-auto"
                  onClick={save}
                >
                  SAVE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <Dialog show={show} setShow={setShow} title={message} />
        </div>
      </div>
      <div className="md:mx-[5rem] lg:mx-[8rem] xl:mx-[12rem] sm:mx-[2rem] mx-4  mt-4">
        <div className="flex flex-col  gap-2 sm:flex-row  mb-4">
          <span className="text-arma-gray font-semibold text-lg">
            Forum Core Team
          </span>
          <button
            className="btn  bg-arma-blue rounded-[8px] w-max px-6 py-1 "
            onClick={() => navigate("/forum/addNewCoreTeamMember/")}
          >
            ADD
          </button>
          {/* <button className="btn  bg-arma-blue rounded-[8px] w-max px-6 py-1">
            GENERATE CERTIFICATE
          </button> */}
        </div>
        <div className="l">
          <Table
            api={`${
              process.env.REACT_APP_SERVER_URL + "forum/getCoreForumMembers"
            }`}
            rowsPerPage={5}
            buttonsCount={5}
            transformer={(item, i, setUpdate) => {
              return handelCheckbox(item, i, true, setUpdate);
            }}
            filter={{ name: forum?.name }}
            headers={headers}
          />
        </div>
        <div className="flex flex-col  gap-2 sm:flex-row  mb-4">
          <span className="text-arma-gray font-semibold text-lg">
            Forum Members
          </span>
          <button
            className="btn  bg-arma-blue rounded-[8px] w-max px-6 py-1 "
            onClick={() => navigate("/forum/addNewForumMember")}
          >
            ADD
          </button>
          {/* <button className="btn  bg-arma-blue rounded-[8px] w-max px-6 py-1">
            GENERATE CERTIFICATE
          </button> */}
        </div>
        <div className="">
          <Table
            api={`${
              process.env.REACT_APP_SERVER_URL + "forum/getForumMembers"
            }`}
            rowsPerPage={2}
            buttonsCount={1}
            transformer={(item, i, setUpdate) => {
              return handelCheckbox(item, i, false, setUpdate);
            }}
            filter={{ name: forum?.name }}
            headers={memHeaders}
          />
        </div>
      </div>
    </div>
  );
}
