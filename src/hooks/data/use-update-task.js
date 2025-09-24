import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time.trim(),
          description: data.description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar a tarefa");
      }

      const updatedTask = await response.json();
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return oldTasks.map((oldtask) => {
          if (oldtask.id === updatedTask.id) {
            return updatedTask;
          }
          return oldtask;
        });
      });
      return updatedTask;
    },
  });
};
