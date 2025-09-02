import { Formik } from "formik";
import { Button, addToast } from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import FileFolderInput from "./FileFolderInput";
import useFormValidationSchema from "../hooks/useFormValidationSchema";
import PropTypes from "prop-types";
import ImageGallery from "./utils/ImageGallery";

const FileForm = ({
  validationType,
  clearButtonText,
  sendButtonText,
  httpRequest,
}) => {
  const [previews, setPreviews] = useState([]);
  const [httpStatus, setHttpStatus] = useState(null);
  const [files, setFiles] = useState([]);

  const validationSchema = useFormValidationSchema(validationType);

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
    addToast({
      title: "Borrado correcto",
      description: "Se han borrado todos los archivos",
      color: "success",
      timeout: 2500,
    });
  };

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    const bodyFormData = new FormData();
    values[validationType].forEach((file) => {
      bodyFormData.append(validationType, file.file || file);
    });

    axios
      .post(httpRequest, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        setHttpStatus(response);
        resetForm();
        resetFiles(); // Limpiamos los archivos después del envío
        console.log(
          `Se han enviado ${values[validationType]?.length} archivos`
        );
      })
      .catch(function (error) {
        console.log(error);
        setHttpStatus(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
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
          <div className="w-3/4">
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
