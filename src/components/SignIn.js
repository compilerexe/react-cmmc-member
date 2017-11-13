import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { sign_in } from '../actions/users'
import configureStore from '../store/configureStore'
import 'font-awesome/css/font-awesome.css'

const store = configureStore()

export default class SignIn extends Component {

  constructor (props) {
    super(props)
    this.state = {email: '', password: '', token: '', redirect: false}
  }

  componentDidMount () {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '1997418417198726',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
      })
      FB.AppEvents.logPageView()
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {return}
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
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

                    <div className='field'>
                      <div className='control'>
                        <Link to='/signup'>
                          <button type='button' className='button is-danger' style={{width: '100%'}}>
                            Sign Up with Email
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className='field'>
                      <div className='control'>
                        <button className='button is-success' style={{width: '100%'}}>
                          <i className='fa fa-envelope'/>&nbsp;
                          Sign In with Email
                        </button>
                      </div>
                    </div>

                    <div className='field'>
                      <div className='control'>
                        <button type='button' className='button is-link' style={{width: '100%'}}>
                          <i className='fa fa-facebook'/>&nbsp;
                          Sign In with Facebook
                        </button>
                      </div>
                    </div>

                    <div className='field'>
                      <div className='control'>
                        <button type='button' className='button is-warning' style={{width: '100%'}}>
                          <i className='fa fa-google'/>&nbsp;
                          Sign In with Google
                        </button>
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