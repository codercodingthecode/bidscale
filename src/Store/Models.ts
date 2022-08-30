import {Models} from "@rematch/core";
import { alertSlice } from "./AlertV2/AlertSliceV2";

export interface RootModel extends Models<RootModel> {
    alertSlice: typeof alertSlice;
}

export const models: RootModel = { alertSlice};