import { useState } from "react";
import { Button, Input } from "@nextui-org/react";

const FileForm = () => {
  const [emailData, setEmailData] = useState({
    attachments: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "attachments") {
      const files = e.target.files;
      setEmailData({
        ...emailData,
        attachments: files,
      });
    } else {
      setEmailData({
        ...emailData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("attachment", emailData.attachments[0]); // Cambiado a "attachment"

      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Correo enviado exitosamente");
      } else {
        console.error("Error al enviar el correo", response);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  return (
    <div>
      <div className="mb-5">
        <h2>Enviar archivos de fotos</h2>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <Input
            label="Adjuntar Archivos"
            type="file"
            name="attachments"
            onChange={handleChange}
            multiple
          />

          <Button color="primary" type="submit" className="mt-5">
            Procesar
          </Button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default FileForm;
