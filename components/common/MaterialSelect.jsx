const MaterialSelect = ({
    id,
    name,
    items,
    label,
    value,
    isRequired,
    isDisabled,
    onSelectionChange,
}) => {
    return (
        <div>
            <div className="material-textfield w-full">
                <div className="material-select text-gray-700 dark:text-postLight">
                   
                    <select
                        className={`material-select-text border-postLight bg-white dark:bg-black rounded-md ${isDisabled ? "opacity-50" : ""}`}
                        required={isRequired}
                        id={id}
                        name={name}
                        onChange={(e) => onSelectionChange(e.target.value)} 
                        value={value}
                        disabled={isDisabled}
                  
                  >
                        <option key="x" value="">
                            {/* Empty option */}
                        </option>
                        {items?.map((item) => (
                            <option key={item + 1} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <label className="material-select-label text-gray-600  dark:text-postLight">
                        {label}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default MaterialSelect;
