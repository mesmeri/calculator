import React from 'react';
import './InfoCard.css';

const InfoCard = function(props) {
  return (
    <div className="Info_card">
      <div className="msrp_block">
        MSRP
        <span className="msrp">
          $
{props.MSRP}
        </span>
      </div>
      <div className="month_amount">
        $<span className="monthly_payment">{props.monthlyPayment || '0'}</span>/<sub>mo</sub>
      </div>
      <div className="taxes">
        Taxes: &nbsp;
        {props.taxes}
      </div>
      <h3 className="vehicle_name">{props.vehicleName}</h3>
      <p className="dealer_name">
        <span className="bold">Dealer:</span>
        {props.dealerName}
      </p>
      <p className="dealer_phone">
        <span className="bold">Dealer phone number:</span>
        {props.phone}
      </p>
      <p>
        <span className="bold">Dealer rating:</span>
        {props.rating}
      </p>
    </div>
  );
};

export default InfoCard;
