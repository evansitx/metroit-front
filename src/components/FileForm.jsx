import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Image } from "@nextui-org/react";
import { useState } from "react";

const FileForm = () => {
  const [previews, setPreviews] = useState([]);

  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  };

  const isValidFileType = (fileName, fileType = "image") => {
    const extension = fileName?.split(".").pop().toLowerCase();
    return extension && validFileExtensions[fileType]?.includes(extension);
  };

  const validationSchema = Yup.object().shape({
    images: Yup.array()
      .min(1, "Añade al menos un archivo")
      .test("not-valid-types", "Algunos archivos no son válidos", (value) => {
        return value?.every((file) => isValidFileType(file.name, "image"));
      }),
  });

  const handleFileChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    // Filtra solo archivos de imágenes y extrae el nombre, ruta y tamaño
    const imageFiles = files
      .filter((file) => isValidFileType(file.name))
      .map((file) => ({
        file: file,
        name: file.name,
        path: file.webkitRelativePath,
        size: file.size,
      }));

    const previewUrls = imageFiles.map((fileObj) => ({
      name: fileObj.name,
      url: URL.createObjectURL(fileObj.file),
    }));

    setPreviews(previewUrls);

    console.log("Archivos de imagen seleccionados:", files);
    setFieldValue("images", imageFiles);
  };

  const onSubmit = (values, { resetForm }) => {
    console.log("Formulario enviado con valores:", values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ images: [] }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        setFieldValue,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
        values,
      }) => (
        <>
          <div className="w-6/12">
            <input
              type="file"
              name="images"
              className="flex h-9 w-full rounded-md border bg-background px-3 border-blue-600 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              webkitdirectory="true"
              multiple
              onChange={(event) => handleFileChange(event, setFieldValue)}
            />
            {errors.images && touched.images}
            {errors.images && touched.images ? errors.images : ""}
            <div className="mt-2">
              {values.images && previews.length > 0 && (
                <ul className="grid grid-cols-2 gap-2">
                  {values.images.map((file, index) => (
                    <li
                      key={index}
                      className="border p-2 rounded-md border-blue-600"
                    >
                      <p className="text-sm">
                        <strong>Nombre:</strong> {file.name} <br />
                        <strong>Ruta:</strong> {file.path} <br />
                        <strong>Tamaño:</strong> {file.size} bytes
                      </p>
                      <Image
                        src={previews[index]?.url}
                        alt={`Previsualización de ${file.name}`}
                        width={350}
                        className="rounded-md"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <br />

          <Button
            color="primary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Procesar imágenes
          </Button>
        </>
      )}
    </Formik>
  );
};

export default FileForm;
