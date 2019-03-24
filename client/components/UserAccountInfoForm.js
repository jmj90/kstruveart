import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import { Button, Form, Message } from 'semantic-ui-react'
import { updateUser } from '../store/user';
import { Footer } from './Footer'


class AccountForm extends Component {

  constructor(props) {
    super(props);

    this.editUserDetailsEmail = this.editUserDetailsEmail.bind(this);
  }

  emailUpdaterButton() {
    document.getElementById('email-field').disabled = false
    document.getElementById('email-field').classList.add('active')
    document.getElementById('email-save-button').disabled = false
  }

  passwordUpdaterButton() {
    document.getElementById('password-field').disabled = false
    document.getElementById('password-field').classList.add('active')
    document.getElementById('password-save-button').disabled = false
  }

  render(){
  const { user} = this.props

    return (
      <div>
          <Form onSubmit={(event) => this.editUserDetailsEmail(event, user)} id="user-info-container">
            <div className="account-form-inputs">
              <label className="user-info"><b>Email</b>: {user.email} </label>
              <input name="email" id="email-field" disabled placeholder={user.email} defaultValue={user.email} />
              <div className="edit-button-1" onClick={this.emailUpdaterButton}>edit</div>
              <button disabled id="email-save-button" className="edit-button" onClick={this.emailUpdaterButton}>save</button>
            </div>
            </Form>
            <Form onSubmit={(event) => this.editUserDetailsPassword(event, user)} id="user-info-container2">
            <div className="account-form-inputs">
              <label className="user-info"><b>Password</b>:</label>
              <input name="password" type="password" id="password-field" disabled placeholder="***************" />
              <div className="edit-button-1" onClick={this.passwordUpdaterButton}>edit</div>
              <button disabled id="password-save-button" className="edit-button" onClick={this.passwordUpdaterButton}>save</button>
            </div>
          </Form>
        <Footer />
      </div>
    )
  }

  // ========= Admin: Edit Product ========= \\
  editUserDetailsEmail(event, user) {
    event.preventDefault();
    const updatedUser = Object.assign({}, user,
      {
        id: this.props.user.id,
        email: event.target.email.value.toLowerCase(),
      }
    )
    this.props.updateUser(updatedUser);
    window.location.reload()
  }

  editUserDetailsPassword(event, user) {
    event.preventDefault();
    const updatedUser = Object.assign({}, user,
      {
        id: this.props.user.id,
        password: event.target.password.value,
      }
    )
    this.props.updateUser(updatedUser);
    window.location.reload()
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


const mapDispatchToProps = { updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
