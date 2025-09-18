const SidebarButton = ({ children, color }) => {
  const getVariantClasses = () => {
    if (color === "unselected") {
      return "text-brand-dark-blue hover:bg-gray-200 ";
    } else if (color === "selected") {
      return "bg-[#E6F7F8] text-brand-primary hover:bg-[#D1F0F1]";
    }
  };
  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;
