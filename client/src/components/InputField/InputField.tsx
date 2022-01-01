import { FC } from "react";
import "./inputField.css";
interface IFProps {
  name: string;
  className?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
}

const InputField: FC<IFProps> = ({
  className,
  name,
  value,
  onChange,
  error,
}: IFProps) => {
  return (
    <div className={`inputDiv ${error && "mb-10"} ${className}`}>
      <input
        className="inputField"
        value={value}
        type="text"
        required
        onChange={(e) => onChange(e)}
      />
      <div className="label flex items-center 	">
        <label>{name}</label>
      </div>
      <br />
      {error && (
        <span className={`absolute mt-1 text-red-600 pl-[8px]`}>{error}</span>
      )}
    </div>
  );
};

export { InputField };
