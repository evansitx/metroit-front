import { useEffect } from "react";
const usePageTitle = (pageTitle) => {
  useEffect(() => {
    const defaultPageTitle = "MetroIT";

    const dynamicTitle = `${defaultPageTitle} - ${pageTitle}`;
    !pageTitle
      ? (document.title = defaultPageTitle)
      : (document.title = dynamicTitle);
  }, [pageTitle]);
};

export default usePageTitle;
