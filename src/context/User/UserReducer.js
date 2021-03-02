import { GET_PROFILE, SET_PROFILE, LOG_OUT, ADD_BALANCE } from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case SET_PROFILE:
      return {
        ...state,
        user: payload,
      };

    case LOG_OUT:
      return {
        ...state,
        user: null,
      };
    case ADD_BALANCE:
      return {
        user: {
          ...state.user,
          balance: Number.parseFloat(state.user.balance) + payload,
        },
      };
    default:
      return state;
  }
};
