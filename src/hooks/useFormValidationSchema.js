import * as Yup from "yup";

const getFileExtension = (file) => {
  if (!file?.name) return "";
  return file.name.split(".").pop().toLowerCase();
};

const createFileSchema = (
  fieldName,
  validExtensions,
  minFiles = 1,
  errorMessage = "Archivo inválido"
) =>
  Yup.object().shape({
    [fieldName]: Yup.array()
      .min(
        minFiles,
        `Añade al menos ${minFiles} archivo${minFiles > 1 ? "s" : ""}`
      )
      .test("is-valid-type", errorMessage, (files) => {
        if (!files || files.length === 0) return true; // deja que .min() maneje el error
        return files.every((file) =>
          validExtensions.includes(getFileExtension(file))
        );
      }),
  });

const useFormValidationSchema = (validationType) => {
  const schemas = {
    excel: createFileSchema(
      "excel",
      ["xls", "xlsx"],
      1,
      "Los archivos deben ser de tipo Excel (.xls, .xlsx)"
    ),
    image: createFileSchema(
      "image",
      ["jpg", "jpeg", "png", "gif", "bmp", "webp", "zip", "rar"],
      1,
      "Formato inválido"
    ),
  };

  return schemas[validationType] || Yup.object(); // devuelve el schema que corresponda
};

export default useFormValidationSchema;
