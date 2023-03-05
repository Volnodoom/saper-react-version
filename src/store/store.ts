import { create } from "zustand"

type ElementInfo = {
  id: string,
  coordinates: number[],
  showOffContent: string | null,
  isBomb: boolean,
  isOpen: boolean,
}

export type CurrentElementType = {
  entities: ElementInfo[],
  addField: (id: string, content: ElementInfo) => void,
  updateShowOffContent: (id: string, content: string | null) => void,
  updateIsOpenContent: (id: string, content: boolean) => void,
}

export const usePlaygroundStore = create<CurrentElementType>((set) => ({
  entities: [],
  addField: (id: string, content: ElementInfo) => set((state) => (
    {
      entities: [
        ...state.entities,
        content,
      ]
    }
  )),
  updateShowOffContent: (id, content) => set((state) => {
    const indexofUpdateElement = state.entities.findIndex((line) => line.id === id);

    if (indexofUpdateElement === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    return ({
      entities: [
        ...state.entities.slice(0, indexofUpdateElement),
        {
          ...state.entities[indexofUpdateElement],
          showOffContent: content,

        },
        ...state.entities.slice(indexofUpdateElement + 1),
      ]
    })
  }
  ),
  updateIsOpenContent: (id, content) => set((state) => {
    const indexofUpdateElement = state.entities.findIndex((line) => line.id === id);

    if (indexofUpdateElement === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    return ({
      entities: [
        ...state.entities.slice(0, indexofUpdateElement),
        {
          ...state.entities[indexofUpdateElement],
          isOpen: content,

        },
        ...state.entities.slice(indexofUpdateElement + 1),
      ]
    })
  }
  ),
}))
