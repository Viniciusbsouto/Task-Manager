const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-brand-primary text-white hover:bg-[#019AA0]";
    }
    if (variant === "secondary") {
      return "bg-brand-light-gray text-brand-dark-blue hover:bg-gray-300";
    }
    if (variant === "ghost") {
      return "bg-transparent text-brand-dark-gray hover:bg-gray-200";
    }
  };

  const getSizeClasses = () => {
    if (size === "small") {
      return " py-1 text-xs";
    }
    if (size === "large") {
      return " py-2 text-sm";
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-3 transition duration-300 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
