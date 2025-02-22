
function Task({ title, value, children, className, fontColor }) {
  return (
    <div
      className={`w-full h-[128px]  flex justify-center items-center rounded-md ${className ? className : ""
        }`}
    >
      <div>
        <div className="flex justify-center mb-3">
          <span>{children}</span>
        </div>
        <p
          className={`text-xs text-center ${fontColor ? fontColor : "dark:text-bgray-50 text-bgray-500"
            }`}
        >
          {title}
        </p>
        <p
          className={`text-base font-bold ${fontColor ? fontColor : "text-bgray-900 dark:text-white"
            } text-center`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}


export default Task;
