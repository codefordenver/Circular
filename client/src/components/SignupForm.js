import React from 'react';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert(
      `firstName: ${
        this.state.firstName
      } lastName: ${
        this.state.lastName
      } email: ${
        this.state.email}`
    );
  }

  render() {
    return (
      <form className="text-left form-group" onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            className="form-control"
            name="firstName"
            type="textarea"
            value={this.state.value}
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
            value={this.state.value}
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
            value={this.state.value}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <button className="ui button fluid submit" type="submit" value="Submit">
          Submit
        </button>
      </form>
    );
  }
}

export default SignupForm;
