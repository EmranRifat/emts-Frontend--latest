
function GreenBtnV2({ text, action }) {
  return (
    <li onClick={action}>
      <button
        aria-label="none"
        className="bg-success-300 dark:bg-success-300 dark:text-bgray-900 border-2 border-transparent text-white rounded-lg px-4 py-3 font-semibold text-sm"
      >
        {text}
      </button>
    </li>
  );
}


export default GreenBtnV2;
