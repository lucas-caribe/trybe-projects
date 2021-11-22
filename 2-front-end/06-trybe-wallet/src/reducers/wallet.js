import ACTIONS from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
  isFetching: false,
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS.SET_CURRENCIES:
    return { ...state, currencies: action.payload, isFetching: false };
  case ACTIONS.SET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      isFetching: false,
    };
  case ACTIONS.REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id,
      ),
    };
  case ACTIONS.EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) return action.payload;
        return expense;
      }),
      editor: false,
    };
  case ACTIONS.FETCH_API:
    return {
      ...state,
      isFetching: true,
    };
  case ACTIONS.SET_EDITOR:
    return {
      ...state,
      editor: true,
    };
  case ACTIONS.SET_ID_TO_EDIT:
    return {
      ...state,
      idToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
