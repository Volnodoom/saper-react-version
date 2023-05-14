import { create } from "zustand"

export type ElementInfo = {
  id: string,
  coordinates: number[],
  hasFlag: boolean,
  isOpen: boolean,
  hiddenContent: number,
}

export type CurrentElementType = {
  entities: ElementInfo[],
  activeFieldElement: number[],
  addField: (id: string, content: ElementInfo) => void,
  updateFields: ( content: ElementInfo[]) => void,
  clearEntities: () => void,
  setActiveElement: (coordinates: number[]) => void,
  clearActiveElement: () => void,
  openField: (id: string) => void,
  addFieldFlag: (id: string) => void,
  removeFieldFlag: (id: string) => void,
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
  addFieldFlag: (id) => set((state) => {
    const indexofUpdateElement = state.entities.findIndex((line) => line.id === id);

    if (indexofUpdateElement === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    return ({
      entities: [
        ...state.entities.slice(0, indexofUpdateElement),
        {
          ...state.entities[indexofUpdateElement],
          hasFlag: true,

        },
        ...state.entities.slice(indexofUpdateElement + 1),
      ]
    })
  }
  ),
  removeFieldFlag: (id) => set((state) => {
    const indexofUpdateElement = state.entities.findIndex((line) => line.id === id);

    if (indexofUpdateElement === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    return ({
      entities: [
        ...state.entities.slice(0, indexofUpdateElement),
        {
          ...state.entities[indexofUpdateElement],
          hasFlag: false,

        },
        ...state.entities.slice(indexofUpdateElement + 1),
      ]
    })
  }
  ),
  openField: (id) => set((state) => {
    const indexofUpdateElement = state.entities.findIndex((line) => line.id === id);

    if (indexofUpdateElement === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    return ({
      entities: [
        ...state.entities.slice(0, indexofUpdateElement),
        {
          ...state.entities[indexofUpdateElement],
          isOpen: true,

        },
        ...state.entities.slice(indexofUpdateElement + 1),
      ]
    })
  }
  ),
}))
