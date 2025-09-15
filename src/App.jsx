import Sidebar from "./componentes/Sidebar";
import Tasks from "./componentes/Tasks";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  );
};

export default App;
