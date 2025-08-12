import { Action } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

type DispatchableAction = Action & { payload?: unknown };

/**
 * Custom React hook to dispatch multiple Redux actions in a single call.
 *
 * This hook returns a memoized function that accepts an array of actions
 * (with optional payloads) and dispatches them sequentially.
 *
 * @template T - Extends `DispatchableAction`, representing the action type(s) to dispatch.
 *
 * @returns {(payloadAction: T[]) => void} - Function that dispatches all provided actions.
 *
 * @example
 * ```ts
 * const multipleDispatch = useMultipleDispatch();
 * multipleDispatch([
 *   setUser({ name: "Ömer", role: "admin" }),
 * ]);
 * ```
 */
const useMultipleDispatch = <T extends DispatchableAction>(): ((
  payloadAction: T[]
) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (payloadAction: T[]) => {
      payloadAction.forEach((action) => {
        dispatch(action);
      });
    },
    [dispatch]
  );
};

export default useMultipleDispatch;
