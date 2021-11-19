import { getExchangeRates, getCurrencies } from '../services/currencyApi';

// Coloque aqui suas actions
const ACTIONS = {
  SET_EMAIL: 'SET_EMAIL',
  SET_EXPENSE: 'SET_EXPENSE',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE',
  SET_CURRENCIES: 'SET_CURRENCIES',
  FETCH_API: 'FETCH_API',
  SET_EDITOR: 'SET_EDITOR',
  EDIT_EXPENSE: 'EDIT_EXPENSE',
  SET_ID_TO_EDIT: 'SET_ID_TO_EDIT',
};

const fetchApi = () => ({ type: ACTIONS.FETCH_API });

export const setEmail = (email) => ({
  type: ACTIONS.SET_EMAIL,
  payload: email,
});

const setCurrencies = (currencies) => ({
  type: ACTIONS.SET_CURRENCIES,
  payload: currencies,
});

const setExpense = (expense) => ({
  type: ACTIONS.SET_EXPENSE,
  payload: expense,
});

export const removeExpense = (expense) => ({
  type: ACTIONS.REMOVE_EXPENSE,
  payload: expense,
});

export const setEditor = () => ({
  type: ACTIONS.SET_EDITOR,
});

export const setIdToEdit = (id) => ({
  type: ACTIONS.SET_ID_TO_EDIT,
  payload: id,
});

export const editExpense = (expense) => ({
  type: ACTIONS.EDIT_EXPENSE,
  payload: expense,
});

export const setExpenseThunk = (expense) => async (dispatch) => {
  dispatch(fetchApi());

  const exchangeRates = await getExchangeRates();

  dispatch(setExpense({ ...expense, exchangeRates }));
};

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(fetchApi());

  const currencies = await getCurrencies();

  dispatch(setCurrencies(currencies));
};

export default ACTIONS;
