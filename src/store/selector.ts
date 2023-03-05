import { CurrentElementType } from "./store";

export const getEntity = (state: CurrentElementType) => state.entities;
export const addFieldSelector = (state: CurrentElementType) => state.addField;
export const updateShowOffFieldSelector = (state: CurrentElementType) => state.updateShowOffContent;
export const updateIsOpenFieldSelector = (state: CurrentElementType) => state.updateIsOpenContent;
