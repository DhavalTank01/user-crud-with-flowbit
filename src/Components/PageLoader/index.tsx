import { Spinner } from "flowbite-react";

const PageLoader = ({ height }: { height?: string | Number }) => {
  return (
    <div
      className={`flex h-${height || "[500px]"} items-center justify-center`}
    >
      <Spinner size="xl" />
    </div>
  );
};

export default PageLoader;
