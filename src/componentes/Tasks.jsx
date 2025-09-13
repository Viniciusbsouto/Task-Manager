import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import CloudSun from "../assets/icons/cloud-sun.svg?react";

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="mb-5 flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary">
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button>
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      {/* {Lista de tarefas} */}

      <div className="rounded-xl bg-white p-6">
        {/* {Manhã} */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <SunIcon />
            <p className="text-sm text-[#9A9C9F]">Manhã</p>
          </div>
        </div>

        {/* {Tarde} */}
        <div className="my-6 space-y-3">
          <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <CloudSun />
            <p className="text-sm text-[#9A9C9F]">Tarde</p>
          </div>
        </div>

        {/* {Noite} */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-1">
            <MoonIcon />
            <p className="text-sm text-[#9A9C9F]">Noite</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
