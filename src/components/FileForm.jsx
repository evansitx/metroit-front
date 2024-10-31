import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";

const FileForm = () => {
  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  };

  const isValidFileType = (fileName, fileType) => {
    const extension = fileName?.split(".").pop().toLowerCase();
    return extension && validFileExtensions[fileType].includes(extension);
  };

  const validationSchema = Yup.object().shape({
    images: Yup.array()
      .required("Añade al menos un archivo")
      .test("are-valid-types", "Algunos archivos no son válidos", (value) => {
        if (!value) return false;

        return value.every((file) => isValidFileType(file.name, "image"));
      }),
  });

  const handleFileChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files); // Convierte FileList a Array
    console.log("Archivos seleccionados:", files); // Muestra los archivos en la consola
    setFieldValue("images", files); // Actualiza el estado de Formik
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
          <Input
            type="file"
            label="Selecciona una carpeta"
            variant="bordered"
            isInvalid={errors.images && touched.images}
            errorMessage={errors.images && touched.images ? errors.images : ""}
            className="max-w-xs"
            onChange={(event) => handleFileChange(event, setFieldValue)}
            name="images"
            webkitdirectory="true"
            multiple
          />
          {console.log("valores:", values)}
          {values.images && values.images.length > 0 && (
            <ul>
              {values.images.map((value, index) => (
                <li key={index}>{value.name}</li> // Solo se mostrarán las imágenes
              ))}
            </ul>
          )}

          {values?.image?.name && values.image.name}

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
