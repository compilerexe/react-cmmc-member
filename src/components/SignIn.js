import React, { Component } from 'react'
import firebase from './FirebaseDatabase'
import { Link, Redirect } from 'react-router-dom'

export default class SignIn extends Component {

  constructor (props) {
    super(props)
    this.state = {email: null, password: null, token: null, redirect: false}
  }

  _Submit = (e) => {
    e.preventDefault()
    let then = this
    let ref = firebase.database().ref('cmmc/member')
    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().email === then.state.email &&
          childSnapshot.val().password === then.state.password) {
          then.setState({token: childSnapshot.key})
          //console.log(then.state.token)
        }
      })
    }).then(function () {
      if (then.state.token !== null) {
        then.setState({redirect: true})
      } else {
        alert('Member not found')
      }
    })
  }

  render () {

    if (this.state.redirect) {
      return <Redirect to="/profile"/>
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