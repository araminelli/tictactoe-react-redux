import { createAction } from 'redux-actions'

export const turn = createAction('TURN', (currentPlayer, cellId) => ({
  cellId: cellId,
  currentPlayer: currentPlayer
}))

export const reset = createAction('RESET', () => ({}))
