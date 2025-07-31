import { useRef, useState } from "react";
import fileIcon from "../static/file_icon.png";

/**
 * `DropFile` is a reusable file upload component that allows users to upload and 
 * preview files of a specific extension via drag-and-drop or file selection.
 * 
 * - Accepts `contentSetter` (a function to store file content) and `fileExtension`
 *   (the required file type) as props.
 * - Uses a `useRef` hook to programmatically open the file explorer when clicked.
 * - Handles both drag-and-drop and manual file selection.
 * - Reads the uploaded file as text and passes its content to `contentSetter`.
 * - Displays the uploaded file name, or a prompt if no file is selected.
 * - Includes a dashed border container and a file icon for better UX.
 */


interface DropFileProps {
  contentSetter: (c: string) => void;
  fileExtension: string;
}

function DropFile({ contentSetter, fileExtension }: DropFileProps) {
  const [filename, setFilename] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    if (file.name.endsWith(fileExtension)) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          contentSetter(reader.result);
          setFilename(file.name);
        }
      };
    } else {
      alert(`Please upload a proper ${fileExtension} file.`);
    }
  };

  const dropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };
  return (
    <div 
      className="mt-[5px] w-full h-full flex flex-col justify-center items-center border-2 border-dashed border-[#8a8989] p-4 cursor-pointer"
      onClick={openFileExplorer}
      onDragOver={(e) => e.preventDefault()}
      onDrop={dropHandler}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden"
        accept={fileExtension ? fileExtension : ""}
        onChange={(e) => {
          if (e.target.files?.length) {
            handleFile(e.target.files[0]);
          }
        }}
      />
      <img src={fileIcon} className="h-9 w-9 mb-2" alt="File icon" />
      <p className="text-[#8a8989] text-[12px] text-center">
        {filename ? filename : "Drag & drop a file here or click to upload"}
      </p>
    </div>
  );
}

export default DropFile;
