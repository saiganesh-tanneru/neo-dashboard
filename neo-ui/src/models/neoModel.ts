export type NeoItem = {
    id: string;
    name: string;
    date: string;
    nasaJplUrl: string;
    isPotentiallyHazardous: boolean;
    isSentryObject: boolean;
    estimatedDiameterKm: {
        min: number;
        max: number;
    };
    closeApproach: {
        date: string;
        dateFull: string;
        orbitingBody: string;
        relativeVelocityKph: number;
        missDistanceKm: number;
    };
};

export enum SortBy {
  Name = 'name',
  Size = 'size',
  ClosenessToEarth = 'closenessToEarth',
  RelativeVelocity = 'relativeVelocity',
}