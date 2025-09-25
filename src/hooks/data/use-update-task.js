import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { tasksQueryKeys } from "../../keys/queries";
export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: data.title.trim(),
        time: data.time.trim(),
        description: data.description.trim(),
      });

      queryClient.setQueryData(tasksQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((oldtask) => {
          if (oldtask.id === updatedTask.id) {
            return updatedTask;
          }
          return oldtask;
        });
      });
      queryClient.setQueryData(tasksQueryKeys.getOne(taskId), updatedTask);
      return updatedTask;
    },
  });
};
