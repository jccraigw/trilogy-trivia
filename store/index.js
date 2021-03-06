const { createStore } = require('redux');

const initialState = {
  round: {
    question: 'Whatcha doin?',
    choices: [
      'Uh, nuthin',
      'Chillaxin',
      'Worrying about climate change',
      'Courting sweet oblivion :)'
    ],
    answer: null,
    revealed: false,
    responses: []
  },
  players: []
};

// The heart of Rock & Roll right here, the reducer!
const reducer = (state, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        round: {
          ...state.round,
          responses: [...state.round.responses, action.payload]
        }
      };
    case 'STATE_UPDATE':
      return action.payload;
    case 'ANSWER_REVEAL':
      return {
        ...state,
        round: {
          ...state.round,
          revealed: true
        }
      };
    case 'PLAYER_JOINED':
      return {
        ...state,
        players: [...state.players, action.payload]
      };
    case 'PLAYER_LEFT':
      let [dropped, ...players] = state.players;
      return {
        ...state,
        players
      };
    default:
      return state;
  }
};

const devTools =
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const store = devTools
  ? createStore(reducer, initialState, devTools)
  : createStore(reducer, initialState);

module.exports = {
  store
};
