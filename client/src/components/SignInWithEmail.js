import React from 'react';
import { FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

const SignInWithEmail = () => (
  <FormGroup>
    <ControlLabel className="sign-with-email-label">Display Name:</ControlLabel>
    <FormControl type="text" required />
    <ControlLabel className="sign-with-email-label">Email:</ControlLabel>
    <FormControl type="email" label="Email:" required />
    <ControlLabel className="sign-with-email-label">Password:</ControlLabel>
    <FormControl type="password" label="Password:" required />
    <ControlLabel className="sign-with-email-label">Confirm Password:</ControlLabel>
    <FormControl type="password" label="Confirm Password:" required />
    <Button className="btn-sign" block>
      Sign In With Email
    </Button>
  </FormGroup>
);
export default SignInWithEmail;
