'use client';

import { KeyboardEvent, useState } from 'react';

interface SearchFormProps {
  onSearch: (username: string) => void;
  onReset: () => void;
  disabled: boolean;
  initialValue?: string;
}

const SearchForm = ({ onSearch, onReset, disabled, initialValue = '' }: SearchFormProps) => {
  const [username, setUsername] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(username);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setUsername('');
      onReset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter GitHub username"
          className="text-black flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 md:px-4 md:py-2 md:text-base"
          disabled={disabled}
          aria-label="GitHub username"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 md:px-4 md:py-2 md:text-base"
          disabled={disabled || !username.trim()}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
