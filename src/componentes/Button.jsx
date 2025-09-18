import { tv } from "tailwind-variants";

const Button = ({
  children,
  color = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const button = tv({
    base: "flex items-center justify-center gap-2 rounded-md px-3 transition duration-300",
    variants: {
      color: {
        primary: "bg-brand-primary text-white hover:bg-[#019AA0]",
        secondary: "bg-brand-light-gray text-brand-dark-blue hover:bg-gray-300",
        ghost: "bg-transparent text-brand-dark-gray hover:bg-gray-200",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  });

  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  );
};

export default Button;
