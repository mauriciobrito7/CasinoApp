import {
  GET_PROFILE,
  SET_PROFILE,
  LOG_OUT,
  ADD_BALANCE,
  ADD_SLOTS_MACHINE_RECORD,
} from "../types";

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
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          balance: Number.parseFloat(state.user.balance) + payload.amount,
        },
      };
    case ADD_SLOTS_MACHINE_RECORD:
      return {
        ...state,
        user: {
          ...state.user,
          balance: state.user
            ? Number.parseFloat(state.user.balance) + payload.amount
            : Number.parseFloat(state.user.balance) + 0,
          slotsMachineRecords: [
            ...(state.user?.slotsMachineRecords || []),
            payload.transaction,
          ],
        },
      };

    default:
      return state;
  }
};
