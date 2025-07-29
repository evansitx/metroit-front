import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <main className="flex flex-col items-center">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
