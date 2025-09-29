import PropTypes from "prop-types";
import { useState } from "react";

import { AddIcon, TrashIcon } from "../assets/icons";
import { useDeleteAllTasks } from "../hooks/data/use-delete-all-tasks";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";

function Header({ subtitle, title }) {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);
  const deleteAll = useDeleteAllTasks();

  const handleClearAll = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja apagar todas as tarefas? Esta ação não pode ser desfeita.",
    );
    if (!confirmed) return;

    try {
      await deleteAll.mutateAsync();
    } catch (err) {
      // log error and notify user
      console.error(err);
      window.alert("Erro ao limpar tarefas. Tente novamente.");
    }
  };

  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button
          color="ghost"
          onClick={handleClearAll}
          disabled={deleteAll.isLoading}
        >
          {deleteAll.isLoading ? "Limpando..." : "Limpar tarefas"}
          <TrashIcon />
        </Button>

        <Button onClick={() => setAddTaskDialogIsOpen(true)}>
          <AddIcon />
          Nova tarefa
        </Button>

        <AddTaskDialog
          isOpen={addTaskDialogIsOpen}
          handleClose={() => setAddTaskDialogIsOpen(false)}
        />
      </div>
    </div>
  );
}

Header.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

Header.defaultProps = {
  subtitle: "",
  title: "",
};

export default Header;
