import { Breadcrumb } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../utils";

const CustomBreadcrumb = ({
  pageTitle,
  pageSubTitle,
  pageLink = "#",
}: {
  pageTitle: string;
  pageSubTitle?: string;
  pageLink?: string;
}) => {
  const navigate = useNavigate();
  const handlePageTitleClick = () => {
    // if (pageLink) {
    //   navigate(pageLink);
    // }
  };
  return (
    <Breadcrumb
      aria-label="Default breadcrumb example"
      className="sticky top-0 z-10 bg-gray-50 px-5 py-3 dark:bg-gray-800"
    >
      <Breadcrumb.Item
        className={classNames(
          "cursor-pointer",
          pageLink ? "active-page-title" : "",
        )}
        onClick={handlePageTitleClick}
      >
        {pageTitle}
      </Breadcrumb.Item>
      {pageSubTitle && <Breadcrumb.Item>{pageSubTitle}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
