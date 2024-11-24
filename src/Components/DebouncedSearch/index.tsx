import { useEffect, useState, useCallback, useRef } from "react";
import Input from "../Input";

interface DebouncedSearchProps {
  onChange: (searchTerm: string) => void;
  value?: string;
}

const DebouncedSearch: React.FC<DebouncedSearchProps> = ({
  onChange,
  value,
}) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  const handleSearch = (value: string) => {
    onChange(value);
  };

  const debouncedOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formValue = e.target.value;
      setSearchTerm(formValue);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        handleSearch(formValue);
      }, 1000);
    },
    [onChange],
  );

  return (
    <Input
      type="text"
      name="search"
      id="search"
      placeholder="Search..."
      value={searchTerm}
      onChange={debouncedOnChange}
      label="Search"
    />
  );
};

export default DebouncedSearch;
