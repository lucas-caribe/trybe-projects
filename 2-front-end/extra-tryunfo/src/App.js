import React from 'react';

import { Form, Card, CardList, Input } from './components';

import compareStrings from './utils/compareStrings';

const MAX_ATTRIBUTE_VALUE = 90;
const MAX_ATTRIBUTE_SUM = 210;
const NUMBER_OF_VALIDATIONS = 7;

const INITIAL_STATE = {
  cardInfo: {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
  },
  filters: {
    name: '',
  },
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  validInputs: {},
  cardList: [],
  filteredCards: [],
};

class App extends React.Component {
  validationTypes = {
    cardName: 'default',
    cardDescription: 'default',
    cardAttr1: 'attribute',
    cardAttr2: 'attribute',
    cardAttr3: 'attribute',
    cardImage: 'default',
  };

  validateInputs = {
    default: (name, value) => {
      this.setState(
        ({ validInputs }) => ({
          validInputs: {
            ...validInputs,
            [name]: !!value.length,
          },
        }),
        () => this.checkValidInputs(),
      );
    },
    attribute: (name, value) => {
      const { cardInfo } = this.state;
      const { cardAttr1, cardAttr2, cardAttr3 } = cardInfo;
      const sum = +cardAttr1 + +cardAttr2 + +cardAttr3;

      const validAttribute = value >= 0 && value <= MAX_ATTRIBUTE_VALUE;
      const validSum = sum <= MAX_ATTRIBUTE_SUM;

      this.setState(
        ({ validInputs }) => ({
          validInputs: {
            ...validInputs,
            [name]: validAttribute,
            sum: validSum,
          },
        }),
        () => this.checkValidInputs(),
      );
    },
  };

  constructor() {
    super();

    this.state = INITIAL_STATE;

    this.handleNameFilter = this.handleNameFilter.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.checkValidInputs = this.checkValidInputs.bind(this);
  }

  handleNameFilter({ target }) {
    const { value } = target;

    this.setState(({ filters, cardList }) => ({
      filters: {
        ...filters,
        name: value,
      },
      filteredCards: cardList.filter(({ cardName }) => compareStrings(cardName, value)),
    }));
  }

  onInputChange({ target }) {
    const { name, type, checked, value } = target;

    const validationType = this.validationTypes[name];
    const newValue = type === 'checkbox' ? checked : value;

    this.setState(
      ({ cardInfo }) => ({ cardInfo: { ...cardInfo, [name]: newValue } }),
      () => validationType && this.validateInputs[validationType](name, value),
    );
  }

  onSaveButtonClick() {
    this.setState(
      ({ hasTrunfo, cardList, cardInfo }) => ({
        ...INITIAL_STATE,
        cardList: [...cardList, cardInfo],
        hasTrunfo: cardInfo.cardTrunfo || hasTrunfo,
      }),
      () => this.setState(({ cardList, filters }) => ({
        filteredCards: cardList
          .filter(({ cardName }) => compareStrings(cardName, filters.name)),
      })),
    );
  }

  onDeleteButtonClick(cardIndex, cardTrunfo) {
    this.setState(
      ({ cardList }) => ({
        cardList: cardList.filter((_, index) => index !== cardIndex),
        filteredCards: cardList.filter((_, index) => index !== cardIndex),
        hasTrunfo: !cardTrunfo,
      }),
    );
  }

  checkValidInputs() {
    const { validInputs } = this.state;
    const validValues = Object.values(validInputs);

    const areValid = validValues.length === NUMBER_OF_VALIDATIONS
      && validValues.every((value) => value);

    this.setState({
      isSaveButtonDisabled: !areValid,
    });
  }

  render() {
    const {
      filteredCards,
      cardInfo,
      isSaveButtonDisabled,
      hasTrunfo,
      filters,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <form>
          <Input
            type="text"
            labelText="Nome da carta"
            id="name"
            testId="name-filter"
            onChange={ this.handleNameFilter }
            value={ filters.name }
          />
        </form>
        <Form
          { ...cardInfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...cardInfo } />
        <CardList
          cardList={ filteredCards }
          onDeleteButtonClick={ this.onDeleteButtonClick }
        />
      </div>
    );
  }
}

export default App;
