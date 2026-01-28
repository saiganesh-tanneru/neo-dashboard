import React, { useState } from 'react';
import './search-bar.module.scss';

interface SearchBarProps {
    value?: string;
    placeholder?: string;
    onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
    value="",
    placeholder = 'Search...', 
    onSearch 
}) => {
    const [query, setQuery] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch?.(value);
    };

    const handleClear = () => {
        setQuery('');
        onSearch?.('');
    };

    return (
        <div style={{
            margin: '1rem 0rem',
        }}>
                <div className="search-bar">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="search-input"
                    />
                    {query && (
                        <button 
                            onClick={handleClear}
                            className="clear-button"
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>
        </div>
    );
};