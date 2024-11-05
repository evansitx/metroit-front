import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <main className="flex flex-col items-center px-5 lg:p-0">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
