import { tv } from "tailwind-variants";

const SidebarButton = ({ children, color }) => {
  const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        unselected: "text-brand-dark-blue hover:bg-gray-200",
        selected: "bg-[#E6F7F8] text-brand-primary hover:bg-[#D1F0F1]",
      },
    },
  });
  return (
    <a href="#" className={sidebar({ color })}>
      {children}
    </a>
  );
};

export default SidebarButton;
