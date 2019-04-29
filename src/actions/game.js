import { createAction } from 'redux-actions';

export const turn = createAction('TURN', (currentPlayer, cellId) => ({
	cellId: cellId,
	currentPlayer: currentPlayer,
}));
export const reset = createAction('RESET', () => ({}));
export const start = createAction('START', (player1, player2) => [
	{
    id: 0,
		name: player1,
		wins: 0,
		plays: [],
		symbol: 'X',
		color: '#54741e',
		diffLeaderBoard: 0,
	},
	{
    id: 1,
		name: player2,
		wins: 0,
		plays: [],
		symbol: 'O',
		color: '#658fdf',
		diffLeaderBoard: 0,
	},
]);
export const syncLeaderBoard = createAction('SYNC_PLAYERS');
