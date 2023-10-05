import React, { createContext, useContext, ReactNode, useState, useMemo, useCallback } from 'react';

// Define the context type
interface MintAchievementsType {
  achievementsToBeMinted: string[]; // Define the type of your context value
  toggleAchievement: (id: string) => void;
  handleMint: () => void;
  isLoading: boolean;
}

// Create the context with an initial value
const MintAchievements = createContext<MintAchievementsType | undefined>(undefined);

// Define a provider component
interface MintAchievementsProviderProps {
  children: ReactNode;
}

const MintAchievementsProvider: React.FC<MintAchievementsProviderProps> = ({ children }) => {
  const [achievementsToBeMinted, setAchievementsToBeMinted] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const toggleAchievement = useCallback(
    (id: string) => {
      console.log('toggleAchievement', id)
      if (achievementsToBeMinted.includes(id)) {
        setAchievementsToBeMinted((state) =>
          state.filter((item) => item !== id)
        )
      } else {
        setAchievementsToBeMinted((state) => [...state, id])
      }
    },
    [achievementsToBeMinted]
  )

  const handleMint = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setAchievementsToBeMinted([])
    }, 3000)
  }, [achievementsToBeMinted])

  const value = useMemo(() => {
    return { achievementsToBeMinted, toggleAchievement, handleMint, isLoading }
  }, [achievementsToBeMinted, toggleAchievement, handleMint, isLoading])

  return (
    <MintAchievements.Provider value={value}>
      {children}
    </MintAchievements.Provider>
  );
};

// Define a custom hook to access the context value
const useMintAchievements = () => {
  const context = useContext(MintAchievements);

  if (context === undefined) {
    throw new Error('useMintAchievements must be used within a MintAchievementsProvider');
  }

  return context;
};

export { MintAchievementsProvider, useMintAchievements };
