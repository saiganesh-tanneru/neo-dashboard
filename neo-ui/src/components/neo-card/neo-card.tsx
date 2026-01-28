import React from 'react';
import './neo-card.module.scss';

interface NearEarthObject {
    name: string;
    size: number;
    closenessToEarth: number;
    relativeVelocity: number;
}

interface NeoCardProps {
    data: NearEarthObject;
}

export const NeoCard: React.FC<NeoCardProps> = ({ data }) => {
    return (
        <div className="neo-card">
            <div className="neo-card-header">
                <h2 className="neo-card-title">{data.name}</h2>
            </div>
            <div className="neo-card-content">
                <div className="neo-card-field">
                    <span className="label">Size:</span>
                    <span className="value">{data.size.toFixed(2)} km</span>
                </div>
                <div className="neo-card-field">
                    <span className="label">Closeness to Earth:</span>
                    <span className="value">{data.closenessToEarth.toFixed(2)} km</span>
                </div>
                <div className="neo-card-field">
                    <span className="label">Relative Velocity:</span>
                    <span className="value">{data.relativeVelocity.toFixed(2)} km/s</span>
                </div>
            </div>
        </div>
    );
};