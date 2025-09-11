const Button = ({ children, variant = "primary" }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white hover:bg-[#019AA0]";
    }
    if (variant === "secondary") {
      return "bg-transparent text-[#818181] hover:bg-gray-200";
    }
  };

  return (
    <button
      className={`flex items-center gap-2 rounded-md px-4 py-1 text-xs transition duration-300 ${getVariantClasses()}`}
    >
      {children}
    </button>
  );
};

export default Button;
