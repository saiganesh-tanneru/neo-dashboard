import React, { useState } from 'react';
import './search-bar.module.scss';
import SortDropdown from '../sort-dropdown/sort-dropdown';
import { CustomDatePicker } from '../custom-datepicker/custom-datepicker';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
    placeholder = 'Search...', 
    onSearch 
}) => {
    const [query, setQuery] = useState('');

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
        <>
        <CustomDatePicker />
        <div className="search-bar">
            <SortDropdown/>
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
        </>
    );
};