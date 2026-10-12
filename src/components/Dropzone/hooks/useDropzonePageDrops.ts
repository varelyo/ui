import { useEffect } from 'react';
import { carriesFiles, takesDroppedFiles } from '../Dropzone.utils';

export function useDropzonePageDrops() {
  useEffect(() => {
    const keepOnPage = (event: DragEvent) => {
      if (carriesFiles(event.dataTransfer) && !takesDroppedFiles(event.target))
        event.preventDefault();
    };
    document.addEventListener('dragover', keepOnPage);
    document.addEventListener('drop', keepOnPage);
    return () => {
      document.removeEventListener('dragover', keepOnPage);
      document.removeEventListener('drop', keepOnPage);
    };
  }, []);
}
