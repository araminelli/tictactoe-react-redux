import { handleActions } from 'redux-actions'

const initialState = {
  board:[0,1,2,3,4,5,6,7,8,9]
}

export default handleActions(
  {
    ADD_BOT_MESSAGE_SUCCESS: (state, {payload}) => [...state, payload],
    ADD_USER_MESSAGE: (state, {payload}) => [...state, payload],
    ADD_BOT_MESSAGE_ERROR: (state, {payload}) => [{type: 'error', payload}],
    RESET_MESSAGES: () => [],
  },
  initialState,
)
