export const useSelections = () => {
  const toggleSelection = async (dishId: number) => {
    try {
      const response = await fetch(`/api/dishes/${dishId}/selections`, {
        method: "POST"
      });

      return response.ok;
    } catch (error) {
      console.error("Failed to toggle selection:", error);
    }
  };

  return {
    toggleSelection
  };
};

export type SelectionsContextType = ReturnType<typeof useSelections>;
