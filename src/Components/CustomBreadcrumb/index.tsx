import { Breadcrumb } from "flowbite-react";

const CustomBreadcrumb = ({
  pageTitle,
  pageSubTitle,
  pageLink = "#",
}: {
  pageTitle: string;
  pageSubTitle?: string;
  pageLink?: string;
}) => {
  return (
    <Breadcrumb
      aria-label="Default breadcrumb example"
      className="sticky top-0 z-50 bg-gray-50 px-5 py-3 dark:bg-gray-800"
    >
      <Breadcrumb.Item href={pageLink}>{pageTitle}</Breadcrumb.Item>
      {pageSubTitle && <Breadcrumb.Item>{pageSubTitle}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
