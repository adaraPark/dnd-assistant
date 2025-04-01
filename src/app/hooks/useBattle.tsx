import { useReducer, useCallback } from "react";

type State = {
  isPlayersTurn: boolean;
  playerCp: number;
  opponentCp: number;
  isGameOver: boolean;
};

type Action =
  | { type: "PLAYER_MOVE"; damage: number }
  | { type: "CPU_MOVE"; damage: number }
  | { type: "RESET_GAME"; playerCp: number; opponentCp: number };

// The reducer function that updates the state based on actions
const gameReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "PLAYER_MOVE":
      const opponentCp = Math.max(state.opponentCp - action.damage, 0);
      return {
        ...state,
        isPlayersTurn: false,
        opponentCp,
        isGameOver: opponentCp <= 0,
      };
    case "CPU_MOVE":
      const playerCp = Math.max(state.playerCp - action.damage, 0);
      return {
        ...state,
        isPlayersTurn: true,
        playerCp,
        isGameOver: playerCp <= 0,
      };
    case "RESET_GAME":
      return {
        ...state,
        isPlayersTurn: true,
        playerCp: action.playerCp,
        opponentCp: action.opponentCp,
        isGameOver: false,
      };
    default:
      return state;
  }
};

type UseTurnBasedGameArgs = {
  initialPlayerCp: number;
  initialOpponentCp: number;
  isPlayersTurn: boolean;
};

const useBattle = ({
  initialPlayerCp,
  initialOpponentCp,
  isPlayersTurn,
}: UseTurnBasedGameArgs) => {
  const initialState: State = {
    isPlayersTurn,
    playerCp: initialPlayerCp,
    opponentCp: initialOpponentCp,
    isGameOver: false,
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Action handlers
  const playerMove = useCallback((damage: number) => {
    dispatch({ type: "PLAYER_MOVE", damage });
  }, []);

  const cpuMove = useCallback((damage: number) => {
    dispatch({ type: "CPU_MOVE", damage });
  }, []);

  const resetGame = useCallback((playerCp: number, opponentCp: number) => {
    dispatch({
      type: "RESET_GAME",
      playerCp,
      opponentCp,
    });
  }, []);

  return {
    state,
    playerMove,
    cpuMove,
    resetGame,
  };
};

export default useBattle;
