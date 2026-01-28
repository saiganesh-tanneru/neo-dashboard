import React from 'react';
import { render, screen } from '@testing-library/react';
import { NeoCard } from './neo-card';

describe('NeoCard', () => {
    const mockNeoData = {
        name: 'Apophis',
        size: 370.5,
        closenessToEarth: 31460000,
        relativeVelocity: 15.88,
    };

    it('renders the component with NEO data', () => {
        render(<NeoCard data={mockNeoData} />);
        expect(screen.getByText('Apophis')).toBeInTheDocument();
    });

    it('displays the object name in the header', () => {
        render(<NeoCard data={mockNeoData} />);
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Apophis');
    });

    it('displays size with 2 decimal places', () => {
        render(<NeoCard data={mockNeoData} />);
        expect(screen.getByText('370.50 km')).toBeInTheDocument();
    });

    it('displays closeness to Earth with 2 decimal places', () => {
        render(<NeoCard data={mockNeoData} />);
        expect(screen.getByText('31460000.00 km')).toBeInTheDocument();
    });

    it('displays relative velocity with 2 decimal places', () => {
        render(<NeoCard data={mockNeoData} />);
        expect(screen.getByText('15.88 km/s')).toBeInTheDocument();
    });

    it('renders all field labels', () => {
        render(<NeoCard data={mockNeoData} />);
        expect(screen.getByText('Size:')).toBeInTheDocument();
        expect(screen.getByText('Closeness to Earth:')).toBeInTheDocument();
        expect(screen.getByText('Relative Velocity:')).toBeInTheDocument();
    });
});