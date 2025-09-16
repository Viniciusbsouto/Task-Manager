const InputLabel = (props) => {
  return (
    <label {...props} className="text-sm font-semibold text-[#35383E]">
      {props.children}
    </label>
  );
};

export default InputLabel;
