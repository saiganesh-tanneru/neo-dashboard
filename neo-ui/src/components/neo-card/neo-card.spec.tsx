import React from 'react';
import { render, screen } from '@testing-library/react';
import { NeoCard } from './neo-card';
import { NeoItem } from '../../models/neoModel';

describe('NeoCard', () => {
    const mockNeoItem: NeoItem = {
        name: 'Test Asteroid',
        estimatedDiameterKm: { min: 0.5, max: 1.5 },
        closeApproach: {
            relativeVelocityKph: 36000,
            missDistanceKm: 5000000,
        },
    } as NeoItem;

    it('renders the component with asteroid name', () => {
        render(<NeoCard data={mockNeoItem} />);
        expect(screen.getByText('Test Asteroid')).toBeInTheDocument();
    });

    it('displays the average diameter size', () => {
        render(<NeoCard data={mockNeoItem} />);
        expect(screen.getByText('1.00 km')).toBeInTheDocument();
    });

    it('displays closeness to earth in km', () => {
        render(<NeoCard data={mockNeoItem} />);
        expect(screen.getByText('5000000.00 km')).toBeInTheDocument();
    });

    it('displays relative velocity in km/s', () => {
        render(<NeoCard data={mockNeoItem} />);
        expect(screen.getByText('10 km/s')).toBeInTheDocument();
    });

    it('displays N/A when diameter data is missing', () => {
        const neoWithoutDiameter: NeoItem = { ...mockNeoItem, estimatedDiameterKm: {} } as NeoItem;
        render(<NeoCard data={neoWithoutDiameter} />);
        expect(screen.getByText('N/A km')).toBeInTheDocument();
    });

});