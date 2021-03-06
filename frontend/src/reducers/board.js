import * as R from 'ramda';

const initialState = {
  team1: [
    1,
    0,
    2,
    1,
    1,
    0,
    1,
    1,
    0,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    2,
    1,
    1,
  ],
  team2: [
    0,
    1,
    2,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    1,
    1,
    0,
    1,
    2,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
  ],
  words: [
    'apple',
    'horse',
    'dog',
    'russia',
    'juice',
    'rum',
    'coke',
    'soda',
    'oranges',
    'pear',
    'persimmon',
    'socks',
    'blankets',
    'pets',
    'domestic',
    'bonsai',
    'european',
    'knead',
    'eat',
    'row',
    'rock',
    'marmalade',
    'biergarten',
    'teacher',
    'university',
  ],
};

const AssignTeam1Key = (state, action) => {
  const stateClone = Object.assign({}, state);
  stateClone.team1 = action.team1;
  return stateClone;
};

const AssignTeam2Key = (state, action) => {
  const stateClone = Object.assign({}, state);
  stateClone.team2 = action.team2;
  return stateClone;
};

const AssignWords = (state, action) => {
  const stateClone = Object.assign({}, state);
  stateClone.words = action.words;
  return stateClone;
};

export default (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'NEW_TEAM1_KEY':
      return AssignTeam1Key(state, action);
    case 'NEW_TEAM2_KEY':
      return AssignTeam2Key(state, action);
    case 'NEW_WORDS':
      return AssignWords(state, action);
    case 'RESET_WORDS':
      return { ...initialState };
    default:
      return state;
  }
};
