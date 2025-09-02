import { useEffect, useState } from "react";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    setShowButton(window.scrollY >= 700);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const buttonClassName = ` transition-all duration-300 ${
    showButton
      ? "w-[50px] h-[50px] bg-[#007ACC] rounded-full flex justify-center items-center hover:bg-gray-50 text-gray-50 hover:text-[#007ACC] hover:border hover:border-[#007ACC]"
      : "w-[0px] h-[0px] [&>i]:hidden"
  }`;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-10">
        <button className={buttonClassName} onClick={handleClick}>
          <i
            className={showButton ? "fa-solid fa-arrow-up text-white" : ""}
          ></i>
        </button>
      </div>
    </>
  );
};

export default BackToTop;
