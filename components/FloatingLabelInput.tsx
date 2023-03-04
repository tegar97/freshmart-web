import { useState,ChangeEvent } from "react";
interface FloatingLabelInputProps {
  label: string;
  placeholder: string;
    value: string;
    type: string;
    isTextArea: boolean,
    readonly:boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function FloatingLabelInput({
  label = '',
  placeholder = '',
  value,
  type,
  onChange,
  isTextArea = false,
  readonly = false,
}: FloatingLabelInputProps) {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <div className="relative w-full mb-3">
      <label
        className={`${
          focused ? "text-primary-green" : "text-gray-500"
        } absolute left-0 -top-3 transition-all duration-300 ease-in-out mb-4 ${
          focused && "text-xs"
        }`}
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          type={type}
          className=" border-2 mt-4 border-gray-200 placeholder:text-gray-400 rounded-md py-4 px-3 w-full transition duration-300 ease-in-out focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green"
          placeholder={placeholder}
          onFocus={onFocus}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readonly}
        ></textarea>
      ) : (
        <input
          type={type}
          className=" border-2 mt-4 border-gray-200 placeholder:text-gray-400 rounded-md py-4 px-3 w-full transition duration-300 ease-in-out focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green"
          placeholder={placeholder}
          onFocus={onFocus}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readonly}
        />
      )}
    </div>
  );
}
export default FloatingLabelInput;