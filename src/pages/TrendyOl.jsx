import FileForm from "../components/FileForm";

const TrendyOl = () => {
  return (
    <>
      <FileForm
        validationType="excel"
        clearButtonText="Eliminar archivos"
        sendButtonText="Enviar archivos"
        httpRequest={import.meta.env.VITE_API_TRENDY_OL_SERVICE}
      />
    </>
  );
};
export default TrendyOl;
