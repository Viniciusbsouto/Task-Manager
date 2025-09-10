const SidebarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-[#35383E] hover:bg-gray-200 ";
    } else if (variant === "selected") {
      return "bg-[#E6F7F8] text-[#00ADB5] hover:bg-[#D1F0F1]";
    }
  };
  return (
    <a href="#" className={`rounded-lg px-6 py-3 ${getVariantClasses()}`}>
      {children}
    </a>
  );
};

export default SidebarButton;
