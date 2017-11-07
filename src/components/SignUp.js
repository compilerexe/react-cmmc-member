import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SignIn from './SignIn'
import firebase from './FirebaseDatabase'

export default class SignUp extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: null,
      email: null,
      password: null,
      cf_password: null
    }
  }

  _SignIn = () => {
    ReactDOM.render(<SignIn/>, document.getElementById('app'))
  }

  _Submit = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.cf_password) {
      let then = this
      let ref = firebase.database().ref('cmmc')
      /* === check duplicate email === */
      let duplicate_email = 0
      ref.child('member').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().email === then.state.email) {
            duplicate_email = 1
          }
        })
      }).then(function () {
        if (duplicate_email === 0) {
          ref.child('member').push({
            name: then.state.name,
            email: then.state.email,
            password: then.state.password
          }).then(function () {
            ReactDOM.render(<SignIn/>, document.getElementById('app'))
          })
        } else {
          alert('Email not available')
        }
      })
      /* ============================= */
    } else {
      alert('Password do not match')
    }
  }

  render () {
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
                               onChange={(e) => this.setState({password: e.target.value})} placeholder='Password' required/>
                      </div>
                    </div>
                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='password'
                               onChange={(e) => this.setState({cf_password: e.target.value})}
                               placeholder='Confirm Password' required/>
                      </div>
                    </div>
                    <div className='columns'>
                      <div className='column'>
                        <div className='left'>
                          <div className='field'>
                            <div className='control'>
                              <button type='button' className='button is-danger' onClick={this._SignIn}>Back</button>
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