import { Table } from "flowbite-react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface SortableHeaderParams {
  label: string;
  sortKey: string;
  currentSort: { sortBy: string; sortOrder: string };
  onSortChange: (sortBy: string, sortOrder: string) => void;
}

const SortableHeader = ({
  label,
  sortKey,
  currentSort,
  onSortChange,
}: SortableHeaderParams) => {
  const isSorted = currentSort.sortBy === sortKey;
  const sortDirection = isSorted ? currentSort.sortOrder : null;

  const handleSort = () => {
    const newSort = sortDirection === "asc" ? "desc" : "asc";
    onSortChange(sortKey, newSort);
  };

  return (
    <Table.HeadCell>
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={handleSort}
      >
        <span>{label}</span>
        {isSorted &&
          (sortDirection === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
      </div>
    </Table.HeadCell>
  );
};

export default SortableHeader;
