import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions'

const loadLeaderBoardState = () => {
  try {
    const leaderBoard = localStorage.getItem('leaderboard');
    if ( leaderBoard === null ) {
      return []
    }
    return JSON.parse(leaderBoard)
  } catch (e) {
    return [];
  }
}

const initialState = fromJS({
  board:[0,1,2,3,4,5,6,7,8],
  leaderBoard: loadLeaderBoardState(),
  isStarted: false,
  players: [],
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
    START: (state, { payload }) => {
      return state
      .set('isStarted', true)
      .set('players', fromJS(payload))
    },
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
        .setIn(['players', payload.currentPlayer, 'diffLeaderBoard'], currentPlayer.get('diffLeaderBoard') + 1 )
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
    },
    SYNC_PLAYERS: (state, { payload }) => {
      var leaderBoard = new Map(state.get('leaderBoard').toJS());
      state.get('players').forEach(player => {
        var playerName = player.get('name');
        if (leaderBoard.has(playerName)) {
  				leaderBoard.set(playerName, leaderBoard.get(playerName) + player.get('diffLeaderBoard'));
  			} else {
  				leaderBoard.set(playerName, player.get('diffLeaderBoard'));
  			}
      })
      var leaderBoardSorted = [...leaderBoard.entries()].sort((a, b) => b[1] - a[1]);
		  var top10 = leaderBoardSorted.splice(0,leaderBoardSorted.length >= 10 ? 10 : leaderBoardSorted.length);

      return state
      .set('leaderBoard', fromJS(top10))
      .set('players', state.get('players').map( player => player.set('diffLeaderBoard',0)));

    },
  },
  initialState,
)
