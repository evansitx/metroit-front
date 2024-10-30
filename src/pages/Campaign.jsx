import { Input, Spinner } from "@nextui-org/react";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import FileForm from "../components/FileForm";

const Campaign = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return (
    <>
     <FileForm/>
    </>
  );
};
export default Campaign;
