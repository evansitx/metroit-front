/* eslint-disable react/prop-types */
const ImageGallery = ({
  files,
  previews,
  imageInfo = false,
  width,
  onRemoveFile,
  removeFiles = false,
}) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {previews.map((preview, index) => (
        <div key={index} className="relative group">
          <img
            src={preview.url}
            alt={preview.name}
            className="rounded-lg object-cover object-top border-2 border-gray-200"
            style={{ width: width, height: width }}
          />
          {imageInfo && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
              <p className="text-sm truncate">{preview.name}</p>
              <p className="text-xs">
                {Math.round(files[index].size / 1024)} KB
              </p>
            </div>
          )}
          {removeFiles && (
            <button
              onClick={() => onRemoveFile(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity w-[32px]"
              aria-label="Eliminar archivo"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
