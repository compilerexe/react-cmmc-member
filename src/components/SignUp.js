import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { sign_up } from '../actions/users'
import configureStore from '../store/configureStore'

const store = configureStore()

export default class SignUp extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      redirect: false
    }
  }

  _Submit = (e) => {
    e.preventDefault()
    store.dispatch(sign_up({
      signup_name: this.state.name,
      signup_email: this.state.email,
      signup_password: this.state.password,
      signup_confirm_password: this.state.confirm_password,
      signup_role: 'none',
      signup_then: this
    }))
  }

  render () {

    if (this.state.redirect) {
      return <Redirect to='/'/>
    }

    return (
      <div className='container'>
        <div className='section'>
          <div className='columns'>
            <div className='column is-4 is-offset-4'>
              <h1 className='title'>CMMC Sign Up</h1>
              <div className='card'>
                <div className='card-content'>

                  <form onSubmit={this._Submit}>
                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='text' onChange={(e) => this.setState({name: e.target.value})}
                               placeholder='Name' required/>
                      </div>
                    </div>
                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='email' onChange={(e) => this.setState({email: e.target.value})}
                               placeholder='E-mail' required/>
                      </div>
                    </div>
                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='password'
                               onChange={(e) => this.setState({password: e.target.value})} placeholder='Password'
                               required/>
                      </div>
                    </div>
                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='password'
                               onChange={(e) => this.setState({confirm_password: e.target.value})}
                               placeholder='Confirm Password' required/>
                      </div>
                    </div>
                    <div className='columns'>
                      <div className='column'>
                        <div className='left'>
                          <div className='field'>
                            <div className='control'>
                              <Link to='/'>
                                <button type='button' className='button is-danger'>Back</button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='column'>
                        <div className='level-right'>
                          <div className='field'>
                            <div className='control'>
                              <button className='button is-success'>Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}