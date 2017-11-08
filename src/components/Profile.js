import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import firebase from './FirebaseDatabase'

const RoleList = (props) => {
  return <option value={props.value}>{props.name}</option>
}

export default class Profile extends Component {

  constructor (props) {
    super(props)
    this.state = {token: this.props.match.params.id, RoleLists: [], Auth: false, SignOut: false}
  }

  componentDidMount () {
    let then = this
    let refAuth = firebase.database().ref('cmmc/member')

    refAuth.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key === then.state.token) {
          then.setState({Auth: true})
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
          value={childSnapshot.key}
        />)
      })
      then.setState({RoleLists: lists})
    })
  }

  _SignOut = () => {
    this.setState({SignOut: true})
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


                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='text' placeholder='Name'/>
                      </div>
                    </div>

                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='email' placeholder='E-mail'/>
                      </div>
                    </div>

                    <div className='field'>
                      <label className='label'>Role</label>
                      <div className='control'>
                        <div className='select'>
                          <select>
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

                    <div className='field'>
                      <div className='level-right'>
                        <div className='control'>
                          <button className='button is-success'>Save</button>
                        </div>
                      </div>
                    </div>

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