import {
  GetAchievementsOptions,
  PlayerOptions,
  GetIndividualAchievementsOptions
} from 'common/types'
import { ipcRenderer } from 'electron'

export const getSummaryAchievements = async (options: GetAchievementsOptions) =>
  ipcRenderer.invoke('getSummaryAchievements', options)

export const getIndividualAchievements = async (
  options: GetIndividualAchievementsOptions
) => ipcRenderer.invoke('getIndividualAchievements', options)

export const getAchievementsStats = async (options: PlayerOptions) =>
  ipcRenderer.invoke('getAchievementsStats', options)

export const syncAchievements = async (options: PlayerOptions) =>
  ipcRenderer.invoke('syncAchievements', options)

export const getQuestsForGame = async (projectId: string) =>
  ipcRenderer.invoke('getQuestsForGame', projectId)

export const getQuest = async (questId: number) =>
  ipcRenderer.invoke('getQuest', questId)

export const getSteamGameMetadata = async (gameId: number) =>
  ipcRenderer.invoke('getSteamGameMetadata', gameId)

export const getQuestRewardSignature = async (
  address: `0x${string}`,
  questId: number,
  rewardId: number
) => ipcRenderer.invoke('getQuestRewardSignature', address, questId, rewardId)

export const getDepositContracts = async (questId: number) =>
  ipcRenderer.invoke('getDepositContracts', questId)
