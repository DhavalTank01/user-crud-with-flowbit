import { Pagination } from "flowbite-react";

const CustomPagination = ({
  totalItems,
  onPageChange,
  itemsPerPage,
  currentPage,
  handleItemsPerPageChange,
  rowsOptions = [25, 50, 100],
}: any) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex flex-col items-center gap-4 border-t border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage} // Controlled select
          onChange={handleItemsPerPageChange}
          className="rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500"
        >
          {rowsOptions.map((option: number) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-6">
        <div className="text-sm text-gray-600">
          Showing rows {currentPage * itemsPerPage - itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </div>
        <Pagination
          layout="navigation"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
          className="mt-4 sm:mt-0"
        />
      </div>
    </div>
  );
};

export default CustomPagination;
