import {
  Input
} from "@raralabs/components";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex justify-center items-center min-w-48">
      <Input
        size="x-sm"
        type="search"
        leadingIcon={<Search />}
        placeHolder="Search by the category here"
        />

    </div>
  );
};

export default SearchBar;
