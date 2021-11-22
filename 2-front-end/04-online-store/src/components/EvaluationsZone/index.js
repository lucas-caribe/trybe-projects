import React from 'react';
import PropTypes from 'prop-types';
import Evaluation from '../Evaluation';

class EvaluationsZone extends React.Component {
  render() {
    const { evaluations } = this.props;
    return (
      <div>
        {evaluations.map((element, index) => (
          <Evaluation
            key={ index }
            user={ element.user }
            rating={ element.rating }
            comment={ element.comment }
          />
        ))}
      </div>
    );
  }
}

EvaluationsZone.propTypes = {
  evaluations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EvaluationsZone;
