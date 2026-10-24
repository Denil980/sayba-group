import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isSiteVisitOpen: boolean;
  selectedProject?: string;
  openSiteVisit: (projectName?: string) => void;
  closeSiteVisit: () => void;
  isVideoOpen: boolean;
  videoTitle?: string;
  openVideo: (title?: string) => void;
  closeVideo: () => void;
  floorPlanData: { image: string; title: string; bhk: string; area: string } | null;
  openFloorPlan: (data: { image: string; title: string; bhk: string; area: string }) => void;
  closeFloorPlan: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState<string | undefined>(undefined);

  const [floorPlanData, setFloorPlanData] = useState<{
    image: string;
    title: string;
    bhk: string;
    area: string;
  } | null>(null);

  const openSiteVisit = (projectName?: string) => {
    setSelectedProject(projectName);
    setIsSiteVisitOpen(true);
  };

  const closeSiteVisit = () => {
    setIsSiteVisitOpen(false);
    setSelectedProject(undefined);
  };

  const openVideo = (title?: string) => {
    setVideoTitle(title || 'Sayba Group - Building Better Tomorrows');
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  const openFloorPlan = (data: { image: string; title: string; bhk: string; area: string }) => {
    setFloorPlanData(data);
  };

  const closeFloorPlan = () => {
    setFloorPlanData(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isSiteVisitOpen,
        selectedProject,
        openSiteVisit,
        closeSiteVisit,
        isVideoOpen,
        videoTitle,
        openVideo,
        closeVideo,
        floorPlanData,
        openFloorPlan,
        closeFloorPlan,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
