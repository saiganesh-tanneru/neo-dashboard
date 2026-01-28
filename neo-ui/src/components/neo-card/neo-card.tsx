import React from 'react';
import './neo-card.module.scss';
import { NeoItem } from '../../models/neoModel';

interface NearEarthObject {
    name: string;  
}

interface NeoCardProps {
    data: NeoItem;
}

const GetSize = (neo: NeoItem): number| String => {
    const diameter = neo.estimatedDiameterKm
    if (diameter?.min != null && diameter?.max != null) {
        return( (diameter.min + diameter.max) / 2).toFixed(2)
    }
    return "N/A";
}

const GetRelativeVelocity = (neo: NeoItem): any => {
    const velocityKph = neo.closeApproach?.relativeVelocityKph
    return velocityKph != null ? velocityKph / 3600 : "N/A"
}

const GetClosenessToEarth = (neo: NeoItem): any => {
    const missDistanceKm = neo.closeApproach?.missDistanceKm
    return missDistanceKm != null ? missDistanceKm.toFixed(2) : "N/A"
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
                    <span className="value">{GetSize(data)} km</span>
                </div>
                <div className="neo-card-field">
                    <span className="label">Closeness to Earth:</span>
                    <span className="value">{GetClosenessToEarth(data)} km</span>
                </div>
                <div className="neo-card-field">
                    <span className="label">Relative Velocity:</span>
                    <span className="value">{GetRelativeVelocity(data)} km/s</span>
                </div>
            </div>
        </div>
    );
};