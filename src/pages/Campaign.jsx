import FileForm from "../components/FileForm";

const Campaign = () => {
  return (
    <>
      <div>
        <h1>Esto es Campañas</h1>
      </div>
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
