import { FC } from "react";
import "./inputField.css";

interface IFProps {
  name: string;
  className?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  type?: string;
  disabled?: boolean;
}

const InputField: FC<IFProps> = ({
  className,
  name,
  value,
  type,
  onChange,
  error,
  disabled = false,
}) => {
  const inputId = name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-input";
  return (
    <div className="w-full sm:w-[240px]">
      <div className={`inputDiv ${error && "mb-10"} ${className}`}>
        <input
          id={inputId}
          className="inputField !w-full focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none disabled:opacity-50"
          value={value}
          type={!type ? "text" : type}
          required
          onChange={(e) => onChange(e)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        <div className="label flex items-center">
          <label htmlFor={inputId}>{name}</label>
        </div>
        <br />
        {error && (
          <span
            id={`${inputId}-error`}
            role="alert"
            className="absolute mt-1 text-red-600 text-sm pl-[8px]"
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export { InputField };