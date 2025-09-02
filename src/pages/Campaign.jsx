import FileForm from "../components/FileForm";

const Campaign = () => {
  return (
    <>
      <FileForm
        validationType="image"
        clearButtonText="Eliminar imágenes"
        sendButtonText="Procesar imágenes"
        httpRequest={import.meta.env.VITE_API_CAMPAIGN_SERVICE}
      />
    </>
  );
};
export default Campaign;
