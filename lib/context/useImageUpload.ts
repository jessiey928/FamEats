export const useImageUpload = () => {
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        return data.path;
      } else {
        console.error("Image upload failed:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  return {
    uploadImage
  };
};

export type ImageUploadContextType = ReturnType<typeof useImageUpload>;
