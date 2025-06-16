export const useComments = () => {
  const addComment = async (dishId: number, text: string) => {
    try {
      const response = await fetch(`/api/dishes/${dishId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      return response.ok;
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const editComment = async (
    dishId: number,
    commentId: number,
    text: string
  ) => {
    try {
      const response = await fetch(
        `/api/dishes/${dishId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        }
      );

      return response.ok;
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };

  const deleteComment = async (dishId: number, commentId: number) => {
    try {
      const response = await fetch(
        `/api/dishes/${dishId}/comments/${commentId}`,
        {
          method: "DELETE"
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  // toggle likes status on comments
  const toggleCommentLike = async (dishId: number, commentId: number) => {
    try {
      const response = await fetch(
        `/api/dishes/${dishId}/comments/${commentId}/like`,
        {
          method: "POST"
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Failed to toggle comment like:", error);
    }
  };

  return {
    addComment,
    editComment,
    deleteComment,
    toggleCommentLike
  };
};

export type CommentsContextType = ReturnType<typeof useComments>;
