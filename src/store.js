import reducers from 'reducers'
import thunk from 'redux-thunk'
import { toJS } from 'immutable'
import subscribe from 'redux-actors'
import { syncLeaderBoard } from 'actions/game'
import { createStore, applyMiddleware, compose } from 'redux'

const middlewares = [thunk]

export const store = compose(applyMiddleware(...middlewares))(createStore)(reducers)

const saveState = ( state ) => {
  try {
    const leaderBoard = JSON.stringify(state.get('leaderBoard').toJS())
    localStorage.setItem('leaderboard', leaderBoard)
  } catch (e) {
    console.log('state is not json')
  }
}

let actors = {
    game (state, dispatch) {
        // handle state
        // console.log('state',state.get('gameOver'));
        if(state.get('gameOver')) {
          dispatch({ type: syncLeaderBoard , payload : null });
        }
        saveState(state);
    }
}

const unsibscribe = subscribe(store, actors)
