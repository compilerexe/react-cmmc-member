import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { sign_out, profile_init, profile_update } from '../actions/users'
import { connect } from 'react-redux'
import configureStore from '../store/configureStore'

const store = configureStore()

class Profile extends Component {

  constructor (props) {
    super(props)
    this.state = {
      RoleLists: [],
      name: '',
      email: '',
      role: '',
      role_detail: null,
      signout: false
    }
  }

  componentDidMount () {
    //console.log('profile init')
    store.dispatch(profile_init({profile_init: this}))
  }

  _SignOut = () => {
    store.dispatch(sign_out({sign_out_then: this}))
    //this.setState({signout: true})
  }

  _Submit = (e) => {
    e.preventDefault()
    store.dispatch(profile_update({
      profile_name: this.state.name,
      profile_email: this.state.email,
      profile_role: this.state.role,
      profile_then: this
    }))
  }

  render () {

    if (this.state.signout) {

      localStorage.removeItem('_token')
      return <Redirect to='/'/>

    } else {

      return (
        <div className='container'>
          <div className='columns'>

            <div className='column is-2 is-offset-1'>
              <aside className='menu section'>
                <p className='menu-label'> Menu </p>
                <ul className='menu-list'>
                  <li>
                    <a href='/#/profile'> Profile </a>
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
                            type='text'
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
                              onChange={(e) => this.setState({role: e.target.options[e.target.selectedIndex].value})}
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

  }
}

const mapStateToProps = (state) => (
  {
    user: state.usersReducer
  }
)

export default connect(mapStateToProps)(Profile)