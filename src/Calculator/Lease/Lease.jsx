import React from 'react';
import NumberInput from '../../components/NumberInput/NumberInput';
import './Lease.css';
import Select from '../../components/Select/Select';

const termVariants = ['24', '36', '48'];
const mileagesVariants = ['10000', '12000', '15000'];
const creditScoreVariants = ['600', '650', '700', '750', '800', '850', '900'];

function Lease(props) {
  return (
    <div className="lease_form">
      <NumberInput
        name="postCode"
        value={props.postCode}
        labelText="Home ZIP code"
        onChange={props.handleChange}
        isVertical
      />
      <Select
        name="creditScore"
        variants={creditScoreVariants}
        value={props.creditScore}
        labelText="Approx. Credit Score"
        onChange={props.handleChange}
      />
      <NumberInput
        name="tradeIn"
        value={props.tradeIn}
        labelText="Trade-In Value"
        onChange={props.handleChange}
        isVertical
      />
      <Select
        name="term"
        variants={termVariants}
        value={props.term}
        labelText="Term (Month)"
        onChange={props.handleChange}
      />
      <NumberInput
        name="downPayment"
        value={props.downPayment}
        labelText="Down Payment"
        onChange={props.handleChange}
        isVertical
      />
      <Select
        name="mileages"
        variants={mileagesVariants}
        value={props.mileages}
        labelText="Annual Miles"
        onChange={props.handleChange}
      />
    </div>
  );
}

export default Lease;
