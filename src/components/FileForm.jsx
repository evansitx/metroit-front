import { Formik } from "formik";
import { Button, addToast } from "@heroui/react";
import { useState } from "react";
import FileFolderInput from "./FileFolderInput";
import useFormValidationSchema from "../hooks/useFormValidationSchema";
import PropTypes from "prop-types";
import ImageGallery from "./utils/ImageGallery";
import useAxios from "../hooks/useAxios";

const FileForm = ({
  validationType,
  clearButtonText,
  sendButtonText,
  httpRequest,
}) => {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const validationSchema = useFormValidationSchema(validationType);
  const { executeRequest, downloadFile } = useAxios();

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
    if (validationType === "image") {
      const previewUrls = newFiles.map((fileObj) => ({
        name: fileObj.name,
        url: URL.createObjectURL(fileObj),
      }));
      setPreviews(previewUrls);
    }
  };

  const handleChange = (event, setFieldValue) => {
    let filesArray = event.map((file) => ({
      file: file,
      name: file.name,
      type: file.type,
      path: file.webkitRelativePath,
      size: file.size,
    }));

    setFieldValue(validationType, filesArray);
  };

  const resetFiles = () => {
    setFiles([]);
    setPreviews([]);
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  };

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log(values);
    const bodyFormData = new FormData();
    values[validationType].forEach((file) => {
      bodyFormData.append(validationType, file.file || file);
    });
    try {
      const response = await executeRequest(httpRequest, bodyFormData);
      console.log(response);
      downloadFile(response);
      // reseteamos el formulario y los archivos
      resetFiles();
      resetForm();
      addToast({
        title: "Éxito",
        description: "Los archivos se han enviado correctamente",
        color: "success",
        timeout: 3500,
      });
    } catch (error) {
      console.log("Error en la descarga:", error);
      addToast({
        title: "Error",
        description:
          "Hubo un error al enviar los archivos, inténtalo de nuevo más tarde. Código de error: " +
          (error.message ? `${error.message}` : ""),
        color: "danger",
        timeout: 3500,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ [validationType]: [] }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        setFieldValue,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
        resetForm,
      }) => (
        <>
          <div className="w-full max-w-[1024px] mx-auto p-4">
            <div className="flex gap-2 flex-col">
              <div className="w-full">
                <FileFolderInput
                  onFilesChange={(files) => {
                    handleFilesChange(files);
                    handleChange(files, setFieldValue);
                  }}
                  value={files} // Pasamos el estado del padre
                />

                {errors[validationType] && touched[validationType] && (
                  <div className="mt-2 relative block w-full rounded-lg bg-red-600 p-2 opacity-100">
                    <p className="text-base text-white font-regular">
                      {errors[validationType]}
                    </p>
                  </div>
                )}
              </div>

              <div>
                {files.length > 0 && (
                  <>
                    <div className="flex gap-2">
                      <Button
                        color="primary"
                        onPress={handleSubmit}
                        isLoading={isSubmitting}
                      >
                        {isSubmitting
                          ? "Procesando..."
                          : sendButtonText || "Enviar archivos"}
                      </Button>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          resetForm();
                          resetFiles(); // Limpiamos los archivos
                          addToast({
                            title: "Borrado correcto",
                            description: "Se han borrado todos los archivos",
                            color: "warning",
                            timeout: 2500,
                          });
                        }}
                      >
                        {clearButtonText || "Borrar archivos"}
                      </Button>
                    </div>
                    <div>
                      <div className="mt-2">
                        <div>
                          <p>Se ha cargado {files.length} archivo(s)</p>
                        </div>
                      </div>

                      {validationType === "image" && previews.length > 0 && (
                        <div className="mt-2">
                          <ImageGallery
                            files={files}
                            previews={previews}
                            imageInfo={true}
                            width={200}
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

FileForm.propTypes = {
  validationType: PropTypes.string.isRequired,
  clearButtonText: PropTypes.string,
  sendButtonText: PropTypes.string,
  httpRequest: PropTypes.string,
};

export default FileForm;
