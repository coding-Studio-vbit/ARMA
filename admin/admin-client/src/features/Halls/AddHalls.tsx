import { ChangeEvent, useState } from "react"
import { Dialog } from "../../Components/Dialog/Dialog"
import { InputField } from "../../Components/InputField/InputField"
import { Close, InsertDriveFile } from "@material-ui/icons";
import { TextArea } from "../../Components/InputField/TextArea";
import axiosInstance from "../../utils/axios";


export const AddHalls = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string>();
  const [block, setBlock] = useState("");
  const [blockError, setBlockError] = useState<string>();
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState<string>();
  const [hallInfo, sethallInfo] = useState("");
  const [hallInfoError, sethallInfoError] = useState<string>();
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState<String>("");
  const [response, setResponse] = useState("")
  
    const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setName(name);
        if (name.length === 0) {
          setNameError("Name field is empty");
        } 
        else {
            setNameError("");
          }
        
      };

      const validateBlock = (e: React.ChangeEvent<HTMLInputElement>) => {
        const block = e.target.value;
        setBlock(block);
        if (block.length === 0) {
          setBlockError("Block field is empty");
        } 
        else {
            setBlockError("");
          }
        
      };

      const validateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = e.target.value;
        setQuantity(quantity);
        if (quantity.length === 0) {
          setQuantityError("Quantity field is empty");
        } 
        else {
            setQuantityError("");
          }
        
      };

      const validatehallInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hallInfo = e.target.value;
        sethallInfo(hallInfo);
        if (hallInfo.length === 0) {
          sethallInfoError("Hall Information field is empty");
        } 
        else {
            sethallInfoError("");
          }
        
      };


      const loginValidate = async() => {
        if (
          name.length === 0 ||
          quantity.length === 0 ||
          block.length === 0 ||
          hallInfo.length === 0 ||
          hallInfoError?.length !== 0 ||
          nameError?.length !== 0 ||
          quantityError?.length !== 0 ||
          blockError?.length !== 0
        ) {
          setShowError("Fill details appropriately");
        } else {
          setShowError("");
          const res = await axiosInstance.post(process.env.REACT_APP_SERVER_URL + "halls/addHall", {name:name, capacity:quantity, block:block, hallInfo:hallInfo })
          const data = res.data
          if (data.status === 1) {
            setResponse("New Hall Added")
            setShow(true)
          } else {
              setResponse(data.response)
              setShow(true)             
          }   
        }
      };

    return(
            <div className="flex flex-col grow items-center justify-center ">
            <div className="w-[80%] sm:w-[60%] md:w-[70%] lg:w-[50%] xl:w-[40%] items-center justify-center ">
            <p className= 'text-center  text-arma-title text-2xl font-medium mb-12 ml-2 '>ADD HALL</p>
            <div className=' flex flex-col w-full gap-y-6 mb-6 sm:gap-x-6 items-center justify-center '>
            <div className="basis-full">
            <InputField 
            name="Name"                         
            onChange={(e:any) =>{validateName(e)}}
            />
            </div>
            <div className="basis-full">
            <InputField 
            name="Block"
            onChange={(e:any) =>{validateBlock(e)}}
            />
            </div>
            <div>
           <InputField
            name="Capacity"
            onChange={(e:any) =>{validateQuantity(e)}}
            />
           </div>
           <div>
           <textarea
            className="mb-5 w-[270px] border-2 border-solid border-[#c8c8c8] outline-arma-title rounded-[8px] px-6 py-[0.75rem] placeholder:text-[#575757e1]"
            rows ={3}  
            placeholder="Hall Information"
            onChange={(e:any) => {validatehallInfo(e)}}
          /> 

           </div>
            </div>
            <Dialog show={show} setShow={setShow} title={response}>
          {" "}
        </Dialog>

        <button
          className="btn  bg-arma-title rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center"
          onClick={() => {
            loginValidate();
          }}
        >
          ADD
        </button>
        {showError.length !== 0 && (
          <span className="text-red-500 text-sm flex justify-center mt-2">
            {showError}
          </span>
        )}


            </div>
            

        </div>
    )
} 
