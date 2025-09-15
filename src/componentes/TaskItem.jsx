import CheckIcon from "../assets/icons/check.svg?react";
import LoaderIcon from "../assets/icons/loader.svg?react";
import DetailsIcon from "../assets/icons/details.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import Button from "./Button";

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
  const getStatusClasses = () => {
    switch (task.status) {
      case "done":
        return "bg-[#00ADB5] text-[#00ADB5] opacity-60 line-through ";
      case "in-progress":
        return "bg-[#FFAA04] text-[#FFAA04]";
      case "to-do":
        return "bg-gray-800 text-gray-800";
      default:
        return "bg-gray-800 text-gray-800 ";
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          htmlFor=""
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg opacity-70 ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && (
            <CheckIcon className="pointer-events-none h-4 w-4" />
          )}
          {task.status === "in-progress" && (
            <LoaderIcon className="pointer-events-none h-4 w-4 animate-spin text-white" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center">
        <Button variant="secondary" onClick={() => handleDeleteClick(task.id)}>
          <TrashIcon className="text-[#9A9C9F]" />
        </Button>

        <a href="#" className="transition-opacity hover:opacity-75">
          <DetailsIcon className="h-5 w-5 opacity-100" />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
