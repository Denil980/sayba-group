import React from 'react';
import { PhotorealisticCinematicExperience } from './PhotorealisticCinematicExperience';

interface CinematicTowerExperienceProps {
  onComplete?: () => void;
  standalone?: boolean;
}

export const CinematicTowerExperience: React.FC<CinematicTowerExperienceProps> = ({
  onComplete,
  standalone = false,
}) => {
  return (
    <PhotorealisticCinematicExperience
      onComplete={onComplete}
      standalone={standalone}
    />
  );
};
