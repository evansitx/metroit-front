import FileForm from "../components/FileForm";

const TrendyOl = () => {
  return (
    <>
      <h1>Esto es TrendyOL</h1>
      <FileForm
        validationType="excel"
        clearButtonText="Eliminar archivos"
        sendButtonText="Enviar archivos"
        fileName="trendyOl.zip"
        httpRequest={import.meta.env.VITE_API_TRENDYOL_SERVICE}
      />
    </>
  );
};
export default TrendyOl;
