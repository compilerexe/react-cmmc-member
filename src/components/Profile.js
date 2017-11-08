import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import firebase from './FirebaseDatabase'
import 'sweetalert'

const RoleList = (props) => {
  return <option value={props.value}>{props.name}</option>
}

export default class Profile extends Component {

  constructor (props) {
    super(props)
    this.state = {
      token: this.props.match.params.id,
      RoleLists: [],
      Auth: false,
      SignOut: false,
      name: null,
      email: null,
      role: null,
      role_detail: null
    }
  }

  componentDidMount () {
    let then = this
    let refAuth = firebase.database().ref('cmmc/member')

    refAuth.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key === then.state.token) {
          then.setState({
            Auth: true,
            name: childSnapshot.val().name,
            email: childSnapshot.val().email,
            role: childSnapshot.val().role
          })
        }
      })
    }).then(() => {
      if (!then.state.Auth) {
        then.setState({SignOut: true})
      }
    })

    let ref = firebase.database().ref('cmmc/roles')
    let lists = []

    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        lists.push(<RoleList
          key={childSnapshot.key}
          name={childSnapshot.val().name}
          value={childSnapshot.val().name}
        />)

        if (childSnapshot.val().name === then.state.role) {
          then.setState({
            role_detail: childSnapshot.val().detail
          })
        }
      })
      then.setState({RoleLists: lists})
    })
  }

  componentDidUpdate () {
    // console.log(`select : ${this.state.role}`)
  }

  _SignOut = () => {
    this.setState({SignOut: true})
  }

  _Submit = (e) => {
    e.preventDefault()
    firebase.database().ref('cmmc/member/' + this.state.token).update({
      name: this.state.name,
      email: this.state.email,
      role: this.state.role
    })
    let then = this
    let ref = firebase.database().ref('cmmc/roles/')
    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().name === then.state.role) {
          then.setState({role_detail: childSnapshot.val().detail})
        }
      })
    })
    swal('Success', '', 'success')
  }

  render () {

    if (this.state.SignOut) {
      return <Redirect to='/'/>
    }

    if (this.state.Auth) {
      return (
        <div className='container'>
          <div className='columns'>

            <div className='column is-2 is-offset-1'>
              <aside className='menu section'>
                <p className='menu-label'> Menu </p>
                <ul className='menu-list'>
                  <li>
                    <a href='#'> Profile </a>
                  </li>
                  <li>
                    <button type='button' className='button is-danger' onClick={this._SignOut}> Sign Out</button>
                  </li>
                </ul>
              </aside>
            </div>

            <div className='column is-8'>

              <div className='section'>

                <h1 className='title'>Profile</h1>
                <hr/>

                <div className='card'>
                  <div className='card-content'>

                    <form onSubmit={this._Submit}>
                      <div className='field'>
                        <div className='control'>
                          <input
                            className='input'
                            type='text'
                            value={this.state.name}
                            onChange={(e) => this.setState({name: e.target.value})}
                            placeholder='Name'/>
                        </div>
                      </div>

                      <div className='field'>
                        <div className='control'>
                          <input
                            className='input'
                            type='email'
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                            placeholder='E-mail'/>
                        </div>
                      </div>

                      <div className='field'>
                        <label className='label'>Role</label>
                        <div className='control'>
                          <div className='select'>
                            <select
                              onChange={(e) => this.setState({role: e.target.options[e.target.selectedIndex].text})}
                              value={this.state.role}
                            >
                              <option value='none'>-- Select Role --</option>
                              {
                                this.state.RoleLists.map((role) => {
                                  return role
                                })
                              }
                            </select>
                          </div>
                        </div>
                      </div>

                      {
                        this.state.role_detail
                      }

                      <div className='field'>
                        <div className='level-right'>
                          <div className='control'>
                            <button className='button is-success'>Save</button>
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

    return <div></div>

  }
}