import { GameStatus } from "utils/constants";
import { create } from "zustand"

export type GameDataType = {
  gameStatus: GameStatus,
  setGameStatus: (status: GameStatus) => void,
}

export const useGameData = create<GameDataType>((set) => ({
  gameStatus: GameStatus.Idle,
  setGameStatus: (status: GameStatus) => set((state) => (
    {
      gameStatus: status,
    }
  )),
}))
