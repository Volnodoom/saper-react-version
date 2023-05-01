import { BOMBS_NUMBER, GameStatus } from "utils/constants";
import { create } from "zustand"

export type GameDataType = {
  gameStatus: GameStatus,
  flagsNumber: number,
  setGameStatus: (status: GameStatus) => void,
  addFlag: () => void,
  removeFlag: () => void,
  setFlagNumber: (value: number) => void,
}

export const useGameData = create<GameDataType>((set) => ({
  gameStatus: GameStatus.Idle,
  flagsNumber: BOMBS_NUMBER,
  setGameStatus: (status: GameStatus) => set((state) => (
    {
      gameStatus: status,
    }
  )),
  addFlag: () => set((state) => (
    {
      flagsNumber: ++state.flagsNumber,
    }
  )),
  removeFlag: () => set((state) => (
    {
      flagsNumber: --state.flagsNumber,
    }
  )),
  setFlagNumber: (value) => set((state) => (
    {
      flagsNumber: value,
    }
  )),
}))
