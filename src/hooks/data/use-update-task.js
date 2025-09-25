import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const { data: updatedTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title: data.title.trim(),
          time: data.time.trim(),
          description: data.description.trim(),
        },
      );

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
