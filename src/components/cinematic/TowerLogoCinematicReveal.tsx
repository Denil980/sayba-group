import React from 'react';
import { BuildingToInteriorExperience } from './BuildingToInteriorExperience';

interface TowerLogoCinematicRevealProps {
  onComplete?: () => void;
  standalone?: boolean;
}

export const TowerLogoCinematicReveal: React.FC<TowerLogoCinematicRevealProps> = (props) => {
  return <BuildingToInteriorExperience {...props} />;
};

export default TowerLogoCinematicReveal;
