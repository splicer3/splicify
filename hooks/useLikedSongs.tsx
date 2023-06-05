"use client";

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface LikedSongsContextProps {
  likedSongs: string[];
  setLikedSongs: Dispatch<SetStateAction<string[]>>;
}

interface Props {
    children: React.ReactNode;
}

export const LikedSongsContext = createContext<LikedSongsContextProps>({
  likedSongs: [],
  setLikedSongs: () => {},
});

export const LikedSongsProvider: React.FC<Props> = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState<string[]>([]);

  return (
    <LikedSongsContext.Provider value={{ likedSongs, setLikedSongs }}>
      {children}
    </LikedSongsContext.Provider>
  );
};

export const useLikedSongs = () => {
  const context = useContext(LikedSongsContext);
  if (context === undefined) {
      throw new Error('useLikedSongs must be used within a LikedSongsContextProvider');
  }

  return context;
}

