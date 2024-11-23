import { Spinner } from "flowbite-react";

const PageLoader = ({ height }: { height?: string | Number }) => {
  return (
    <div className={`flex h-[80vh] items-center justify-center`}>
      <Spinner size="xl" />
    </div>
  );
};

export default PageLoader;
