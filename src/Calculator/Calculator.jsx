import React from 'react';
import ModePanel from './ModePanel/ModePanel';
import Loan from './Loan/Loan';
import Lease from './Lease/Lease';
import InfoCard from './InfoCard/InfoCard';
import mockData from './data/mockData';
import './Calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMode: 'lease',
      controls: {
        common: {
          tradeIn: '10',
          downPayment: '10',
          creditScore: '750',
        },
        loan: {
          APR: '10',
          postCode: '10',
          term: '24',
        },
        lease: {
          APR: '10',
          postCode: '10',
          terms: '24',
          mileages: '12000',
        },
      },
      data: null,
      dataIsLoading: true,
      postCodeIsLoading: true,
      taxes: '0',
    };
    this.handleChangeMode = this.handleChangeMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChangeMode(e) {
    if (e.target.tagName === 'BUTTON') {
      const mode = e.target.value;
      this.setState({
        activeMode: mode,
      });
    }
  }

  handleChange(e, name) {
    const { value } = e.target;
    this.setState(prevState => {
      const controls = { ...prevState.controls };
      let key = prevState.activeMode;
      if (controls.common.hasOwnProperty(name)) {
        key = 'common';
      }
      controls[key][name] = value;
      return {
        controls,
      };
    }, this.calculate);
  }

  calculateCreditScoreValue = score => {
    let value;
    if (score >= 750) {
      value = 0.95;
    } else if (score >= 700 && score < 750) {
      value = 1;
    } else if (score >= 640 && score < 700) {
      value = 1.05;
    } else if (score < 640) {
      value = 1.2;
    }
    return value;
  };

  calculateLease = async () => {
    const { controls } = this.state;
    const msrp = Number(this.state.data[0].MSRP);
    const tradeIn = Number(controls.common.tradeIn);
    const downPayment = Number(controls.common.downPayment);
    const mileages = Number(controls.lease.mileages);
    const terms = Number(controls.lease.terms);
    const creditScore = Number(controls.common.creditScore);
    const creditScoreValue = this.calculateCreditScoreValue(creditScore);
    const res = (((msrp - tradeIn - downPayment) * mileages) / 10000 / terms) * creditScoreValue;
    return Math.round(res);
  };

  calculateLoan = async () => {
    const { controls } = this.state;
    const msrp = Number(this.state.data[0].MSRP);
    const tradeIn = Number(controls.common.tradeIn);
    const downPayment = Number(controls.common.downPayment);
    const terms = Number(controls.loan.term);
    const apr = Number(controls.loan.APR);
    const creditScore = Number(controls.common.creditScore);
    const creditScoreValue = this.calculateCreditScoreValue(creditScore);
    const res = ((msrp - tradeIn - downPayment) / terms) * creditScoreValue * apr;
    return Math.round(res);
  };

  calculate = async () => {
    const taxes = this.calculateTaxes();
    let payment;
    if (this.state.activeMode === 'loan') {
      payment = await this.calculateLoan();
    } else {
      payment = await this.calculateLease();
    }
    this.setState({
      payment,
      taxes,
    });
  };

  calculateTaxes = () => {
    const mode = this.state.activeMode;
    const code = this.state.controls[mode].postCode.trim();
    const taxes = code.split('').map(num => num * 11);
    return taxes.join('');
  };

  getPostCode = () => {
    const response = fetch('https://ipinfo.io?token=6d1e7ce929c7d5')
      .then(data => data.json())
      .then(data => data.postal);
    return response;
  };

  async componentDidMount() {
    try {
      const data = await Promise.resolve(mockData);
      const postCode = await this.getPostCode();
      this.setState(prevState => {
        const controls = { ...prevState.controls };
        controls.loan.postCode = postCode;
        controls.lease.postCode = postCode;
        return {
          controls,
          data,
          dataIsLoading: false,
          postCodeIsLoading: false,
        };
      }, this.calculate);
    } catch (e) {
      console.log(e);
      alert('An error occurred... Please, refresh the page.');
    }
  }

  render() {
    const mode = this.state.activeMode;
    const loanInfo = { ...this.state.controls.common, ...this.state.controls.loan };
    const leaseInfo = { ...this.state.controls.common, ...this.state.controls.lease };
    const { payment } = this.state;
    return (
      <div className="Calculator">
        <div className="computation">
          <ModePanel onClick={this.handleChangeMode} activeMode={mode} />
          {mode === 'loan' ? (
            <Loan mode={mode} handleChange={this.handleChange} {...loanInfo} />
          ) : (
            <Lease mode={mode} handleChange={this.handleChange} {...leaseInfo} />
          )}
        </div>
        <div className="info">
          {this.state.dataIsLoading ? (
            <h4>Loading...</h4>
          ) : (
            <InfoCard
              {...this.state.data[0]}
              monthlyPayment={this.state.payment}
              taxes={this.state.taxes}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Calculator;
