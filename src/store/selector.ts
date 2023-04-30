import { GameDataType } from "./game-data";
import { CurrentElementType } from "./single-field-data";

export const getEntities = (state: CurrentElementType) => state.entities;
export const getActiveField = (state: CurrentElementType) => state.activeFieldElement;
export const clearEntities = (state: CurrentElementType) => state.clearEntities;
export const addFieldSelector = (state: CurrentElementType) => state.addField;
export const updateFieldsSelector = (state: CurrentElementType) => state.updateFields;
export const addFlagToField = (state: CurrentElementType) => state.addFieldFlag;
export const removeFlagFromField = (state: CurrentElementType) => state.removeFieldFlag;
export const setActiveFieldElement = (state: CurrentElementType) => state.setActiveElement;
export const clearActiveField = (state: CurrentElementType) => state.clearActiveElement;
export const showHiddenField = (state: CurrentElementType) => state.openField;

//Status selectors
export const getGameStatus = (state: GameDataType) => state.gameStatus;
export const setGameStatus = (state: GameDataType) => state.setGameStatus;
export const addFlagGlobal = (state: GameDataType) => state.addFlag;
export const removeFlagGlobal = (state: GameDataType) => state.removeFlag;
