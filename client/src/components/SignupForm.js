import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form id="SignupForm" className="text-left form-group" onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            className="form-control"
            name="firstName"
            type="textarea"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            className="form-control"
            name="lastName"
            type="textarea"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            className="form-control"
            name="email"
            type="email"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <button className="btn btn-primary btn-block btn-sm btn-wrapper" type="submit" form="SignupFor" value="Submit">
          Submit
        </button>
      </form>
    );
  }
}

export default SignupForm;
