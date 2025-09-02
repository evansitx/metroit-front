/* eslint-disable react/prop-types */
import { Image } from "@heroui/react";

const ImageGallery = ({ files, previews, width, imageInfo }) => {
  return (
    <>
      <div>
        <ul className="grid grid-cols-5 gap-2 my-2">
          {files.map((file, index) => (
            <li key={index} className="border p-2 rounded-md border-blue-600">
              <Image
                src={previews[index]?.url}
                fallbackSrc="https://heroui.com/images/hero-card-complete.jpeg"
                alt={`Previsualización de ${file.name}`}
                width={width || 200}
                className="rounded-md mb-3"
              />
              {imageInfo && (
                <p className="text-sm">
                  <strong>Nombre:</strong> {file.name} <br />
                  <strong>Ruta:</strong> {file.path} <br />
                  <strong>Tamaño:</strong> {file.size} bytes
                  <br />
                  <strong>Tipo:</strong> {file.type}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ImageGallery;
