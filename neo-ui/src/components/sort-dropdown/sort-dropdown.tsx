import React from 'react';
import { SORT_OPTIONS } from '../app-constants';
import './sort-dropdown.module.scss';

type SortOption = {
    value: string;
    label: string;
};

interface SortDropdownProps {
    options: SortOption[];
    onSelect: (option: string) => void;
}

const SortDropdownComponent: React.FC<SortDropdownProps> = ({ options, onSelect }) => {
    return (
        <div className="sort-dropdown">
            <select
                className="sort-select"
                onChange={(e) => onSelect(e.target.value)}
                aria-label="Sort options"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const SortDropdown: React.FC = () => {
    const handleSelect = (option: string) => {
        console.log('Selected option:', option);
    };

    return (
            <SortDropdownComponent options={SORT_OPTIONS} onSelect={handleSelect} />
    );
};

export default SortDropdown;