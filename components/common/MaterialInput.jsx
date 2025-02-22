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
  return (
    <div>
      <div className="material-textfield w-full  bg-white dark:bg-black  ">
        <input
          placeholder=" "
          type={type}
          className={`w-full ${
            readOnly && showOnly
              ? "border-none bg-transparent text-gray-700 dark:text-white cursor-default"
              : "border-medium border-postLight rounded-md text-gray-800 dark:text-postLight  bg-white dark:bg-black "
          }`}
          id={id}
          name={name}
          onChange={(e) => whenChange(e)}
          onBlur={(e) => whenBlur(e)}
          value={value}
          readOnly={readOnly}
          disabled={disabled} 
        />
        <label className="text-xl text-gray-600  dark:text-postLight">
          {label}
        </label>
      </div>
      <p className="text-sm text-postRed">{error}</p>
    </div>
  );
};

export default MaterialInput;
