import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions'

const initialState = fromJS({
  board:[0,1,2,3,4,5,6,7,8],
  players: [
    {
    id: 1,
    name: 'player1',
    wins: 0,
    plays: [],
    symbol: 'X',
    color: '#54741e'
  },
  {
    id: 1,
    name: 'player2',
    wins: 0,
    plays: [],
    symbol: 'O',
    color: '#658fdf'
  }],
  symbols:{
    "X":'#54741e',
    "O":'#658fdf',
  },
  currentPlayer: 0,
  startTime: null,
  gameOver: false,
  timeDuration: null,
  fastestTime: null,
  slowestTime: null,
  winCombination: null
})

function hasWin(plays) {
  var result = null;
  var winCombinations =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ]
	for (var i = 0; i < winCombinations.length; i++) {
		let win = winCombinations[i];
		if (win.every(position => plays.indexOf(position) > -1)) {
			result = win;
			break;
		}
	}
	return result;
}
// Check if there are numbers in the board not pickup yet.
function hasTie(board) {
	return !board.some(position => typeof position === 'number');
}

export default handleActions(
  {
    TURN: (state, { payload }) => {
      var currentPlayer = state.getIn(['players', payload.currentPlayer]);
      var newState = state
      .setIn(['board', payload.cellId], currentPlayer.get('symbol'))
      .updateIn(['players', payload.currentPlayer, 'plays'], plays => plays.push(payload.cellId))

      // First X play
      if(!newState.get('startTime')) newState = newState.set('startTime', new Date());

      var winCombination = hasWin(newState.getIn(['players', payload.currentPlayer, 'plays']).toJS());
      if(winCombination){
        var diff = new Date() - newState.get('startTime');
        var timeDuration = Math.abs(diff / 1000).toFixed(1);
        var fastestTime = newState.get('fastestTime');
        var slowestTime = newState.get('slowestTime');

        return newState
        .set('winCombination', winCombination)
        .set('timeDuration', timeDuration)
        .set('fastestTime', fastestTime ? Math.min(fastestTime,timeDuration) : timeDuration)
        .set('slowestTime', slowestTime ? Math.max(slowestTime,timeDuration) : timeDuration)
        .setIn(['players', payload.currentPlayer, 'wins'], currentPlayer.get('wins') + 1 )
        .set('gameOver', true)

      } else if(hasTie(newState.get('board').toJS())){
        return newState.set('gameOver', true)
      } else {
        return newState
        .set('currentPlayer', (state.get('currentPlayer') + 1) % 2)
      }
    },
    RESET: (state, { payload }) => {
      return state
      .set('board',fromJS([0,1,2,3,4,5,6,7,8]))
      .set('currentPlayer', 0)
      .set('startTime', null)
      .set('gameOver', false)
      .set('winCombination', null)
      .set('players', state.get('players').map( player => player.set('plays',fromJS([]))))
    }
  },
  initialState,
)
