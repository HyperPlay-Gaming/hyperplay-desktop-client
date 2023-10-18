import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback
} from 'react'

interface MintAchievementsType {
  achievementsToBeMinted: string[] // Define the type of your context value
  achievementsToBeUpdated: string[] // Define the type of your context value
  toggleAchievementToBeMinted: (id: string) => void
  toggleAchievementToBeUpdated: (id: string) => void
  handleMint: () => void
  handleUpdate: () => void
  isLoading: boolean
}

const MintAchievements = createContext<MintAchievementsType | undefined>(
  undefined
)

interface MintAchievementsProviderProps {
  children: ReactNode
}

const MintAchievementsProvider: React.FC<MintAchievementsProviderProps> = ({
  children
}) => {
  const [achievementsToBeMinted, setAchievementsToBeMinted] = useState<
    string[]
  >([])
  const [achievementsToBeUpdated, setAchievementsToBeUpdated] = useState<
    string[]
  >([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const toggleAchievementToBeMinted = useCallback(
    (id: string) => {
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

  const toggleAchievementToBeUpdated = useCallback(
    (id: string) => {
      if (achievementsToBeUpdated.includes(id)) {
        setAchievementsToBeUpdated((state) =>
          state.filter((item) => item !== id)
        )
      } else {
        setAchievementsToBeUpdated((state) => [...state, id])
      }
    },
    [achievementsToBeUpdated]
  )

  const handleMint = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setAchievementsToBeMinted([])
    }, 3000)
  }, [achievementsToBeMinted])

  const handleUpdate = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setAchievementsToBeUpdated([])
    }, 3000)
  }, [achievementsToBeUpdated])

  const value = useMemo(() => {
    return {
      achievementsToBeMinted,
      toggleAchievementToBeMinted,
      handleMint,
      isLoading,
      toggleAchievementToBeUpdated,
      handleUpdate,
      achievementsToBeUpdated
    }
  }, [
    achievementsToBeMinted,
    toggleAchievementToBeMinted,
    handleMint,
    isLoading,
    toggleAchievementToBeUpdated,
    handleUpdate,
    achievementsToBeUpdated
  ])

  return (
    <MintAchievements.Provider value={value}>
      {children}
    </MintAchievements.Provider>
  )
}

const useMintAchievements = () => {
  const context = useContext(MintAchievements)

  if (context === undefined) {
    throw new Error(
      'useMintAchievements must be used within a MintAchievementsProvider'
    )
  }

  return context
}

export { MintAchievementsProvider, useMintAchievements }
