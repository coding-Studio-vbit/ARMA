import { ChangeEvent, useState } from "react";
import { Dialog } from "../../Components/Dialog/Dialog";
import { InputField } from "../../Components/InputField/InputField";
import Select from "react-select";
import { containerCSS } from "react-select/dist/declarations/src/components/containers";
import { Close } from "@material-ui/icons";



export const AddEquip = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [nameError, setNameError] = useState<string>();
  const [quantityError, setQuantityError] = useState<string>();
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState<String>("");
  const [selectRoles, setSelectRoles] = useState<(string | undefined) []>([])



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

  const loginValidate = () => {
    if (
      name.length === 0 ||
      quantity.length === 0 ||
      nameError?.length !== 0 ||
      quantityError?.length !== 0
    ) {
      setShowError("Fill details appropriately");
    } else {
      setShow(true);
      setShowError("");
    }
  };

  return (
    <div className="flex flex-col grow items-center">
      <div className="mt-12 w-max">
        <p className="text-center lg:text-left text-arma-title text-2xl font-medium mb-12 ml-2 ">
          ADD EQUIPMENT
        </p>

        <div className=" flex flex-col gap-y-6 mb-6  md:flex-row sm:gap-x-8">
          <InputField
            name="Name"
            type="text"
            error={nameError}
            onChange={(e) => {
              validateName(e);
            }}
          />
          <InputField
            name="Quantity"
            type="text"
            error={quantityError}
            onChange={(e) => {
              validateQuantity(e);
            }}
          />
        </div>

        <div className=" w-full sm:w-[270px] ">
          <Select
            name="Faculty Incharge"
            placeholder="Faculty Incharge"
            value ={{value: "Faculty Incharge", label: "Faculty Incharge"}}
            options={[]}
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
                  paddingLeft: '16px'
                }),
                singleValue: (base) => ({
                    ...base,
                    paddingLeft: '16px',
                    color: '#575757e1'
                }) 
            }}
            
            className="basic-multi-select w-full h-full"
           
          /> 
        </div>

        <Dialog show={show} setShow={setShow} title="Added">
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
  );
};
