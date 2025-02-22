function ToggleBtn({ clickHandler, name, icon, active }) {
  return (
    <button
      aria-label="none"
      onClick={() => clickHandler(name)}
      type="button"
      id="store-btn"
      className="relative flex h-[52px] w-[52px] items-center justify-center dark:border-darkblack-400"
    >
      <span
        className={`absolute right-[0.5px] -top-[0.5px] h-3 w-3 rounded-full border-2 border-white  dark:border-none  ${
          active ? "bg-error-300" : "bg-bgray-300 dark:bg-bgray-600"
        }`}
      ></span>
      {icon}
    </button>
  );
}

export default ToggleBtn;
