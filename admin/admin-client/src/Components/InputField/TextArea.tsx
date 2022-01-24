import { FC } from "react";
import "./inputField.css";
interface TAprops {
  name: string;
  className?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string | undefined;
  disabled?:boolean
}

const TextArea: FC<TAprops> = ({
  className,
  name,
  value,
  onChange,
  error,
  disabled = false
}) => {
  return (
    <div>

    <div className={`inputDivTA inputDiv  ${error && "mb-10"}  ${className}`}>
      <textarea
        className="inputField !w-full"
        value={value}
        required
        rows={4}
        onChange={(e) => onChange(e)}
        disabled = {disabled}
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

export { TextArea };
