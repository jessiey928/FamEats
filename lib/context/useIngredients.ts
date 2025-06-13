export const useIngredients = () => {
  const getAllIngredients = async (): Promise<string[]> => {
    try {
      const response = await fetch("/api/ingredients");
      if (response.ok) {
        const ingredients = await response.json();
        return ingredients;
      } else {
        console.error("Failed to fetch ingredients:", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      return [];
    }
  };
  return {
    getAllIngredients
  };
};
