import { cloneDeep } from "lodash";

export function updateItems(state, payload) {
  const total = payload.items.reduce(
    (prev, item) => item.price * item.units + prev,
    0
  );

  return {
    ...state,
    ...payload,
    total,
  };
}

export function resetState(state, payload) {
  return cloneDeep(payload);
}
