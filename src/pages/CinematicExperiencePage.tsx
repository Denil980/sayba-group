import React from 'react';
import { CinematicTowerExperience } from '../components/cinematic/CinematicTowerExperience';

export const CinematicExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101214] text-white">
      <CinematicTowerExperience standalone={false} />
    </div>
  );
};
