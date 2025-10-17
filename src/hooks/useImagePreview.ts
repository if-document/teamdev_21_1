import { useEffect, useState } from "react";

export function useImagePreview(
  initialImageUrl: string,
  newImageFile: File | undefined,
) {
  const [previewUrl, setPreviewUrl] = useState<string>(initialImageUrl);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (newImageFile instanceof File) {
      objectUrl = URL.createObjectURL(newImageFile);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(initialImageUrl);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [newImageFile, initialImageUrl]);

  return previewUrl;
}
