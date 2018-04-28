import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createHash } from '../store';

import ResetPasswordPage from './ResetPasswordPage';

export class ResetPasswordPageContainer extends Component {
  constructor(props) {
    super(props);

    // bound functions
    this.resetPasswordRequest = this.resetPasswordRequest.bind(this);
  }

  resetPasswordRequest(email) {
    const { dispatch } = this.props;
    dispatch(createHash(email));
  }

  render() {
    return (
      <ResetPasswordPage resetPasswordFunction={this.resetPasswordRequest} />
    );
  }
}

export default connect()(ResetPasswordPageContainer);
