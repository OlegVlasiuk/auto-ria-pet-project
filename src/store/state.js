import { proxy } from "valtio";

export const InitialState = {
  userId: "",
  favoriteList: [],
};

export const state = proxy(InitialState);
