import Sidebar from "../componentes/Sidebar";
import Tasks from "../componentes/Tasks";

const TasksPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  );
};

export default TasksPage;
