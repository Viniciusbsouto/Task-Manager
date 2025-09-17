import "./AddTaskDialog.css";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  // Uncontrolled inputs for title and description
  const [time, setTime] = useState("morning");
  const [errors, setErrors] = useState([]);

  const nodeRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const handleSaveClick = () => {
    const newErrors = [];

    const currentTitle = titleRef.current?.value ?? "";
    const currentDescription = descriptionRef.current?.value ?? "";

    if (!currentTitle.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório!",
      });
    }

    if (!currentDescription.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória!",
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    handleSubmit({
      id: v4(),
      title: currentTitle,
      description: currentDescription,
      time,
      status: "to-do",
    });
    handleClose();
  };

  useEffect(() => {
    if (!isOpen) {
      // ensure time resets; uncontrolled inputs will be reset by setting defaultValue
      setTime("morning");
      setErrors([]);
    } else {
      // When opened, focus the title input
      setTimeout(() => {
        titleRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const titleError = errors.find((error) => error.inputName === "title");
  const descriptionError = errors.find(
    (error) => error.inputName === "description",
  );

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
          >
            {/* DIALOG */}
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  label="Título"
                  id="title"
                  placeholder="Insira o Título da Tarefa"
                  defaultValue=""
                  errorMessage={titleError?.message}
                  ref={titleRef}
                />

                <TimeSelect
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a Tarefa"
                  defaultValue=""
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSaveClick}
                    size="large"
                    className="w-full"
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
