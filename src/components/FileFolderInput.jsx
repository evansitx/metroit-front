/* eslint-disable react/prop-types */
import { useState } from "react";

const FileFolderInput = ({ onFilesChange }) => {
  const [items, setItems] = useState([]);

  const handleDrop = async (event) => {
    event.preventDefault();

    const dtItems = event.dataTransfer.items;
    const newFiles = [];

    // Procesar cada item arrastrado
    const promises = [];
    for (const item of dtItems) {
      const entry = item.webkitGetAsEntry?.();
      if (entry) {
        if (entry.isFile) {
          promises.push(getFile(entry).then((f) => f && newFiles.push(f)));
        } else if (entry.isDirectory) {
          promises.push(
            readDirectory(entry).then((dirFiles) => {
              newFiles.push(...dirFiles);
            })
          );
        }
      }
    }

    await Promise.all(promises);

    setItems((prev) => {
      // Nombres de los ya existentes
      const existingNames = new Set(prev.map((f) => f.name));

      // Filtrar duplicados
      const uniqueNewFiles = newFiles.filter((f) => !existingNames.has(f.name));

      const merged = [...prev, ...uniqueNewFiles];
      if (onFilesChange) onFilesChange(merged);
      return merged;
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Helpers
  const getFile = (fileEntry) =>
    new Promise((resolve) => fileEntry.file(resolve));

  const readDirectory = (dirEntry) =>
    new Promise((resolve) => {
      const reader = dirEntry.createReader();
      let allFiles = [];

      const readEntries = () => {
        reader.readEntries(async (entries) => {
          if (entries.length === 0) {
            resolve(allFiles);
          } else {
            for (const entry of entries) {
              if (entry.isFile) {
                const file = await getFile(entry);
                allFiles.push(file);
              } else if (entry.isDirectory) {
                const subDirFiles = await readDirectory(entry);
                allFiles.push(...subDirFiles);
              }
            }
            readEntries(); // seguir leyendo si hay más
          }
        });
      };

      readEntries();
    });

  return (
    <>
      <div className="w-full">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full h-32 border-2 border-dashed border-blue-600 flex items-center justify-center rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
        >
          <p className="text-gray-600 text-sm">
            Arrastra aquí archivos o carpetas
          </p>
        </div>

        {/* {items.length > 0 && (
          <ul className="mt-3 list-disc list-inside text-sm text-gray-700 max-h-40 overflow-y-auto">
            {items.map((file, index) => (
              <li key={`${file.name}-${index}`}>
                {file.webkitRelativePath || file.name}
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </>
  );
};

export default FileFolderInput;
