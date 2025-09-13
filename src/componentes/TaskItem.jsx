const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    switch (task.status) {
      case "done":
        return "bg-[#00ADB5] text-[#00ADB5]";
      case "in-progress":
        return "bg-[#FFAA04] text-[#FFAA04]";
      case "to-do":
        return "bg-gray-800 text-gray-800";
      default:
        return "bg-gray-800 text-gray-800";
    }
  };
  return (
    <div
      className={`"flex py-3" ${getStatusClasses()} items-center gap-2 rounded-lg bg-opacity-10 px-4 py-3`}
    >
      {task.title}
    </div>
  );
};

export default TaskItem;
