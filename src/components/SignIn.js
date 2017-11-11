import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { sign_in } from '../actions/users'
import configureStore from '../store/configureStore'

const store = configureStore()

export default class SignIn extends Component {

  constructor (props) {
    super(props)
    this.state = {email: '', password: '', token: '', redirect: false}
  }

  _Submit = (e) => {
    e.preventDefault()
    store.dispatch(sign_in({
      signin_email: this.state.email,
      signin_password: this.state.password,
      signin_then: this
    }))
  }

  render () {

    if (this.state.redirect) {
      return <Redirect to={'/profile/' + this.state.token}/>
    }

    return (
      <div className='container'>
        <div className='section'>
          <div className='columns'>
            <div className='column is-4 is-offset-4'>
              <h1 className='title'>CMMC Authentication</h1>
              <div className='card'>
                <div className='card-content'>

                  <form onSubmit={this._Submit}>
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
                    <div className='columns'>
                      <div className='column'>
                        <div className='left'>
                          <div className='field'>
                            <div className='control'>
                              <Link to='/signup'>
                                <button type='button' className='button is-primary'>Sign Up
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='column'>
                        <div className='level-right'>
                          <div className='field'>
                            <div className='control'>
                              <button className='button is-link'>Sign In
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