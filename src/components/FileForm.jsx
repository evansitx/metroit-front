import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Image } from "@nextui-org/react";
import { useRef, useState } from "react";
import axios from "axios";

const FileForm = () => {
  const [previews, setPreviews] = useState([]);
  const inputFile = useRef(null);

  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  };

  const isValidFileType = (fileName, fileType = "image") => {
    const extension = fileName?.split(".").pop().toLowerCase();
    return extension && validFileExtensions[fileType]?.includes(extension);
  };

  const validationSchema = Yup.object().shape({
    images: Yup.array()
      .min(1, "Añade al menos una carpeta")
      .test("not-valid-types", "Algunos archivos no son válidos", (value) => {
        return value?.every((file) => isValidFileType(file.name, "image"));
      }),
  });

  const handleFileChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);

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
    setFieldValue("images", imageFiles);
    console.log(files);
  };

  const onSubmit = (values, { resetForm }) => {
    // axios
    //   .post("https://api.metroit.com", {
    //     values: values,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    console.log(`Se han enviado ${values?.images?.length} imágenes`);
    inputFile.current.value = "";
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
            <div className="flex gap-2">
              <div className="w-full">
                <input
                  ref={inputFile}
                  type="file"
                  name="images"
                  className="flex h-9 w-full rounded-md border bg-background px-3 border-blue-600 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  webkitdirectory="true"
                  multiple
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                />
                {errors.images && touched.images && (
                  <div className=" mt-2 relative block w-full rounded-lg bg-red-600 p-2 opacity-100">
                    <p className="text-base text-white font-regular">
                      {errors.images}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : "Procesar imágenes"}
                </Button>
              </div>
            </div>
            <div>
              <div className="mt-2">
                {values?.images && previews.length > 0 && (
                  <>
                    {values.images.length > 0 && (
                      <div>
                        <p>Se han cargado {values?.images?.length} imágenes</p>
                      </div>
                    )}

                    <ul className="grid grid-cols-3 gap-2 my-2">
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
                            width={200}
                            className="rounded-md"
                          />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          <br />
        </>
      )}
    </Formik>
  );
};

export default FileForm;
