import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './search-bar';

describe('SearchBar Component', () => {
    it('should render with default placeholder', () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText('Search...');
        expect(input).toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
        render(<SearchBar placeholder="Find items..." />);
        const input = screen.getByPlaceholderText('Find items...');
        expect(input).toBeInTheDocument();
    });
    
    it('should not show clear button when query is empty', () => {
        render(<SearchBar />);
        const clearButton = screen.queryByLabelText('Clear search');
        expect(clearButton).not.toBeInTheDocument();
    });
});