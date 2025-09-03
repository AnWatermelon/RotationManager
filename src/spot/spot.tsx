import React from 'react';
import { Spot } from '../AppModel';

type SpotProps = {
  spot: Spot;
};

export const SpotComponent: React.FC<SpotProps> = ({ spot }) => (
  <div>
    <p>{`${spot.id}: ${spot.owner}`}</p>
  </div>
);
