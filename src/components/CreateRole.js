import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import firebase from './FirebaseDatabase'

export default class CreateRole extends Component {

  constructor (props) {
    super(props)
    this.state = {role_name: null, role_detail: null, redirect: false}
  }

  _insertRole = () => {
    let ref = firebase.database().ref('cmmc/roles')
    let then = this
    const {role_name, role_detail} = this.state
    ref.push({
      name: role_name,
      detail: role_detail
    }).then(function () {
      then.setState({redirect: true})
    })
  }

  render () {

    if (this.state.redirect) {
      return <Redirect to='/manage'/>
    }

    return (
      <div className='container'>
        <div className='columns'>

          <div className='column is-2 is-offset-1'>
            <aside className='menu section'>
              <p className='menu-label'> Menu </p>
              <ul className='menu-list'>
                <li>
                  <a href='#'> Role </a>
                </li>
                <li>
                  <a href='#'> Sign Out </a>
                </li>
              </ul>
            </aside>
          </div>

          <div className='column is-8'>

            <div className='section'>

              <h1 className='title'>New Role</h1>
              <hr/>

              <div className='card'>
                <div className='card-content'>

                  <div className='field level-right'>
                    <div className='control'>
                      <Link to='/manage'>
                        <button className='button is-danger'>Back</button>
                      </Link>
                    </div>
                  </div>

                  <div className='field'>
                    <div className='control'>
                      <input type='text' id='role_name' className='input is-info' placeholder='Role Name'
                             onChange={(e) => this.setState({role_name: e.target.value})}/>
                    </div>
                  </div>

                  <div className='field'>
                    <textarea className='textarea' id='role_detail' cols='30' rows='10'
                              placeholder='Write something about your role ...'
                              onChange={(e) => this.setState({role_detail: e.target.value})}/>
                  </div>

                  <div className='field'>
                    <div className='level-right'>
                      <div className='control'>
                        <button type='button' id='btn-submit' className='button is-success' style={{width: '100px'}}
                                onClick={this._insertRole}>
                          Add
                        </button>
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
}