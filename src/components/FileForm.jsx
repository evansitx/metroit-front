import { Formik } from "formik";
import { Button, addToast } from "@heroui/react";
import { useState } from "react";
import FileFolderInput from "./FileFolderInput";
import useFormValidationSchema from "../hooks/useFormValidationSchema";
import PropTypes from "prop-types";
import ImageGallery from "./utils/ImageGallery";
import useAxios from "../hooks/useAxios";
// import { TrashIcon } from "@heroicons/react/24/outline";

const FileForm = ({
  validationType,
  clearButtonText,
  sendButtonText,
  httpRequest,
  fileName,
}) => {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const validationSchema = useFormValidationSchema(validationType);
  const { executeRequest, downloadFile } = useAxios();

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
    console.log(newFiles);
    const previewUrls = newFiles.map((fileObj) => ({
      name: fileObj.name,
      url: fileObj.type.startsWith("image/")
        ? URL.createObjectURL(fileObj)
        : "../../img/archive-icon.png",
    }));
    setPreviews(previewUrls);
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

  // Función para eliminar un archivo individual
  const removeFile = (index, setFieldValue) => {
    // Crear nuevas arrays sin el elemento a eliminar
    const newFiles = [...files];
    const newPreviews = [...previews];

    if (validationType === "image") {
      URL.revokeObjectURL(newPreviews[index].url);
    }

    // Eliminar el elemento
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    // Actualizar estados
    setFiles(newFiles);
    setPreviews(newPreviews);

    // Actualizar Formik
    const formikFiles = newFiles.map((fileObj) => ({
      file: fileObj,
      name: fileObj.name,
      type: fileObj.type,
      path: fileObj.webkitRelativePath,
      size: fileObj.size,
    }));

    setFieldValue(validationType, formikFiles);

    addToast({
      title: "Archivo eliminado",
      description: "El archivo ha sido eliminado correctamente",
      color: "warning",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
        </svg>
      ),
      timeout: 2500,
    });
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
      downloadFile(response, fileName);
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
                            icon: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                              >
                                <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                              </svg>
                            ),
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
                      <div className="mt-2">
                        <ImageGallery
                          files={files}
                          previews={previews}
                          removeFiles={true}
                          imageInfo={true}
                          width={200}
                          onRemoveFile={(index) =>
                            removeFile(index, setFieldValue)
                          }
                        />
                      </div>
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
  fileName: PropTypes.string,
};

export default FileForm;
