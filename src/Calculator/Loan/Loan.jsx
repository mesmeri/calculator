import React from 'react';
import NumberInput from '../../components/NumberInput/NumberInput';
import ButtonRow from '../../components/ButtonRow/ButtonRow';
import './Loan.css';

const inputInfo = [
  {
    type: 'number',
    name: 'tradeIn',
    labelText: 'Trade-In Value: ',
  },
  {
    type: 'number',
    name: 'downPayment',
    labelText: 'Down Payment: ',
  },
  {
    type: 'number',
    name: 'APR',
    labelText: 'Estimated APR: ',
  },
];
const terms = [12, 24, 36, 48, 72, 84];
const scores = [600, 650, 700, 750, 800, 850, 900];

const Loan = function(props) {
  return (
    <div className="loan_form">
      <ButtonRow
        values={terms}
        activeButton={props.term}
        label="Term (Months)"
        onClick={props.handleChange}
        name="term"
      />
      <NumberInput
        name="tradeIn"
        value={props.tradeIn}
        labelText="Trade-In Value"
        onChange={props.handleChange}
      />
      <NumberInput
        name="downPayment"
        value={props.downPayment}
        labelText="Down Payment"
        onChange={props.handleChange}
      />
      <NumberInput
        name="postCode"
        value={props.postCode}
        labelText="ZIP Code"
        onChange={props.handleChange}
      />
      <ButtonRow
        values={scores}
        activeButton={props.creditScore}
        label="Approx. Credit Score"
        onClick={props.handleChange}
        name="creditScore"
      />
      <NumberInput
        name="APR"
        value={props.APR}
        labelText="Estimated APR"
        onChange={props.handleChange}
      />
    </div>
  );
};

export default Loan;
