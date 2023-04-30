import { create } from "zustand"

export type ElementInfo = {
  id: string,
  coordinates: number[],
  showOffContent: string | null,
  isOpen: boolean,
  hiddenContent: null | number,
}

export type CurrentElementType = {
  entities: ElementInfo[],
  activeFieldElement: number[],
  addField: (id: string, content: ElementInfo) => void,
  updateFields: ( content: ElementInfo[]) => void,
  updateShowOffContent: (id: string, content: string | null) => void,
  updateIsOpenContent: (id: string, content: boolean) => void,
  setActiveElement: (coordinates: number[]) => void,
  clearEntities: () => void,
  clearActiveElement: () => void,
}

export const usePlaygroundStore = create<CurrentElementType>((set) => ({
  entities: [],
  activeFieldElement: [],
  setActiveElement: (coordinates) => set((state) => (
    {
      activeFieldElement: coordinates,
    }
  )),
  clearActiveElement: () => set((state) => (
    {
      activeFieldElement: [],
    }
  )),
  clearEntities: () => set((state) => (
    {
      entities: [],
    }
  )),
  addField: (id: string, content: ElementInfo) => set((state) => (
    {
      entities: [
        ...state.entities,
        content,
      ]
    }
  )),
  updateFields: (content: ElementInfo[]) => set((state) => (
    {
      entities: [
        ...content,
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
