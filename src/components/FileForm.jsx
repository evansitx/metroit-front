import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Image } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import FileFolderInput from "./FileFolderInput";

const FileForm = () => {
  const [previews, setPreviews] = useState([]);
  const [httpStatus, setHttpStatus] = useState(null);

  const validationSchema = Yup.object().shape({
    images: Yup.array().min(1, "Añade al menos un archivo"),
  });

  const handleFileChange = (event, setFieldValue) => {
    // console.log(event);
    const imageFiles = event.map((file) => ({
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
  };

  const onSubmit = (values, { resetForm }) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/campaign/make`, {
        values: values,
      })
      .then(function (response) {
        console.log(response);
        setHttpStatus(response);
      })
      .catch(function (error) {
        console.log(error);
        setHttpStatus(error);
      });

    console.log(`Se han enviado ${values?.images?.length} archivos`);

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
          <div className="w-3/4">
            <div className="flex gap-2 flex-col">
              <div className="w-full">
                <FileFolderInput
                  onFilesChange={(event) =>
                    handleFileChange(event, setFieldValue)
                  }
                />

                {errors.images && touched.images && (
                  <div className=" mt-2 relative block w-full rounded-lg bg-red-600 p-2 opacity-100">
                    <p className="text-base text-white font-regular">
                      {errors.images}
                    </p>
                  </div>
                )}
                {httpStatus != null && (
                  <div
                    className={`mt-2 relative block w-full rounded-lg 
                      ${
                        httpStatus.data ? "bg-green-600" : "bg-red-600"
                      } p-2 opacity-100`}
                  >
                    <p className="text-base text-white font-regular">
                      {httpStatus?.data?.status}
                      {httpStatus?.message}
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
                        <p>
                          Se han cargado {values?.images?.length} archivo(s)
                        </p>
                      </div>
                    )}

                    <ul className="grid grid-cols-5 gap-2 my-2">
                      {values.images.map((file, index) => (
                        <li
                          key={index}
                          className="border p-2 rounded-md border-blue-600"
                        >
                          <p className="text-sm">
                            <strong>Nombre:</strong> {file.name} <br />
                            <strong>Ruta:</strong> {file.path} <br />
                            <strong>Tamaño:</strong> {file.size} bytes
                            <br />
                            <strong>Tipo:</strong> {file?.file?.type}
                          </p>
                          <Image
                            src={previews[index]?.url}
                            alt={`Previsualización de ${file.name}`}
                            width={200}
                            className="rounded-md mt-3"
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
