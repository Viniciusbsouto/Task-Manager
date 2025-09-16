import { Toaster } from "sonner";

import Sidebar from "./componentes/Sidebar";
import Tasks from "./componentes/Tasks";

const App = () => {
  return (
    <div className="flex">
      <Toaster toastOptions={{ style: { color: "#35383E" } }} />
      <Sidebar />
      <Tasks />
    </div>
  );
};

export default App;
