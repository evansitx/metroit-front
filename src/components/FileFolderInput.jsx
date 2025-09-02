/* eslint-disable react/prop-types */
const FileFolderInput = ({ onFilesChange, value = [] }) => {
  // Nuevos props para control desde el padre

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
          promises.push(
            getFile(entry).then((files) => files && newFiles.push(files))
          );
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

    // Usamos el callback del padre en lugar de estado local
    if (onFilesChange) {
      // Nombres de los ya existentes
      const existingNames = new Set(value.map((f) => f.name));

      // Filtrar duplicados
      const uniqueNewFiles = newFiles.filter(
        (files) => !existingNames.has(files.name)
      );

      const merged = [...value, ...uniqueNewFiles];
      onFilesChange(merged);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Helpers (se mantienen igual)
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
            readEntries();
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
          <p className="text-center text-gray-600">
            Arrastra y suelta archivos o carpetas aquí
          </p>
        </div>
      </div>
    </>
  );
};

export default FileFolderInput;
