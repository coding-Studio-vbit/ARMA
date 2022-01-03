import { InputField } from "../../Components/InputField/InputField";

export const EditAdmin = () => {
  return (
    <div className="flex flex-col grow items-center">
      <div className="ml-10 mt-12 w-max flex flex-col gap-y-5  ">
        <p className="text-arma-title text-2xl font-medium mb-12 ml-2 text-center ">
          EDIT ADMIN
        </p>
        <InputField
          name="Current Password"
          type="password"
          onChange={(e) => {}}
        />
        <InputField name="New Password" type="password" onChange={(e) => {}} />
        <InputField
          name="Confirm New Password"
          type="password"
          onChange={(e) => {}}
        />
        <button className="btn bg-arma-title rounded-[8px] px-6 py-2 mt-12 ml-auto mr-auto flex justify-center">
          EDIT
        </button>
      </div>
    </div>
  );
};
