import axios from "axios";
import { useCallback } from "react";

const useAxios = () => {
  const executeRequest = useCallback(
    async (httpRequest, bodyFormData, options = {}) => {
      const response = await axios.post(httpRequest, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...options.headers,
        },
        responseType: "blob",
        ...options,
      });
      return response;
    },
    []
  );

  const downloadFile = useCallback((response, filename = "campañas.zip") => {
    if (!response?.data) return;

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, []);

  return {
    executeRequest,
    downloadFile,
  };
};

export default useAxios;
