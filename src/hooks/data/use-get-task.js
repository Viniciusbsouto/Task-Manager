import { useQuery } from "@tanstack/react-query";

export const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      onSuccess(data);
      return data;
    },
  });
};
