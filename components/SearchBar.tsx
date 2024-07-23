import { useState } from "react";
import { Form, Input, Button } from "../components/styles/SearchStyled";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    onSearch(newKeyword); // Trigger search whenever the input changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        placeholder="Search news..."
        aria-label="Search News"
      />
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default SearchBar;
