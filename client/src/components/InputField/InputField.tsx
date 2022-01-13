import { FC } from "react";
import "./inputField.css";
interface IFProps {
  name: string;
  className?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  type?: string 
}

const InputField: FC<IFProps> = ({
  className,
  name,
  value,
  type,
  onChange,
  error,
}) => {
  return (
    <div>

    <div className={`inputDiv  ${error && "mb-10"}  ${className}`}>
      <input
        className="inputField !w-full"
        value={value}
        type={!type ? "text" : type}
        required
        onChange={(e) => onChange(e)}
      />
      <div className="label flex items-center 	">
        <label>{name}</label>
      </div>
      <br />
      {error && (
        <span className={`absolute mt-1 text-red-600 text-sm pl-[8px]`}>{error}</span>
      )}
    </div>
    </div>

  );
};

export { InputField };
