const InputLabel = (props) => {
  return (
    <label {...props} className="text-sm font-semibold text-brand-dark-blue">
      {props.children}
    </label>
  );
};

export default InputLabel;
