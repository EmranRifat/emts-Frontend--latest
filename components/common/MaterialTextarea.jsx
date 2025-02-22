

import { ChangeEvent, FocusEvent } from "react";

const MaterialTextarea = ({
  id,
  name,
  label,
  value,
  error,
  maxLength,
  isRequired,
  rows,
  whenChange,
  readOnly,
}) => {
  return (
    <div>
      <div className="material-textarea w-full ">
        <textarea
          required={isRequired}
          placeholder=" "
          maxLength={maxLength}
          className="w-full  text-black dark:text-white border-postLight bg-white dark:bg-black rounded-md border-2"
          id={id}
          name={name}
          rows={rows}
          onChange={(e) => whenChange(e)}
          value={value}
          readOnly={readOnly}
        />
        <label className="text-xl text-gray-600  dark:text-white">{label}</label>
      </div>
      <p className="text-sm text-postRed">{error}</p>
    </div>
  );
};

export default MaterialTextarea;
