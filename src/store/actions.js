import { state } from "./state";

export const updateUser = (currentUserId) => {
  state.userId = currentUserId;
};
export const resetUser = () => {
  state.userId = "";
  state.favoriteList = [];
};

