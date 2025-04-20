import { useState } from "react";
import { EyeFilledIcon } from "../../components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../components/icons/EyeSlashFilledIcon";

const MaterialInput = ({
  id,
  name,
  type,
  label,
  value,
  error,
  whenChange,
  whenBlur,
  readOnly,
  showOnly,
  disabled,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Determine actual input type
  const inputType =
    (name === "password" || name === "repassword") && isVisible ? "text" : type;

  const isPasswordField = name === "password" || name === "repassword";

  return (
    <div className="relative w-full">
      <div className="material-textfield w-full bg-white dark:bg-darkblack-600">
        <input
          placeholder=" "
          type={inputType}
          className={`w-full pr-10 ${
            readOnly && showOnly
              ? "border-none bg-transparent text-gray-700 dark:text-white cursor-default"
              : "border-medium border-gray-300 rounded-md text-gray-800 dark:text-postLight bg-white dark:bg-darkblack-600"
          }`}
          id={id}
          name={name}
          onChange={whenChange}
          onBlur={whenBlur}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
        />
        <label className="text-xl text-gray-600 dark:text-postLight">
          {label}
        </label>

        {/* Show eye icon for password fields */}
        {isPasswordField && (
          <div className="absolute top-3 right-3">
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-postRed mt-1">{error}</p>
    </div>
  );
};

export default MaterialInput;
