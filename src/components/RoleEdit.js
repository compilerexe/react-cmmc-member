import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu.jsx'
import {role_edit, role_update} from '../actions/roles'
import configureStore from '../store/configureStore'

const store = configureStore()

export default class RoleEdit extends Component {

  constructor (props) {
    super(props)
    this.state = {role_name: '', role_detail: ''}
  }

  componentDidMount () {
    store.dispatch(role_edit({e_role_than: this}))
  }

  _Submit = (e) => {
    e.preventDefault()
    store.dispatch(role_update({
      u_role_name: this.state.role_name,
      u_role_detail: this.state.role_detail,
      u_role_than: this
    }))
  }

  render () {
    return (
      <div className='container'>
        <div className='columns'>

          <Menu.Admin/>

          <div className='column is-8'>

            <div className='section'>

              <h1 className='title'>Role Edit</h1>
              <hr/>

              <div className='card'>
                <div className='card-content'>

                  <div className='field level-right'>
                    <div className='control'>
                      <Link to='/manage'>
                        <button type='button' className='button is-danger'>
                          Back
                        </button>
                      </Link>
                    </div>
                  </div>

                  <form onSubmit={this._Submit}>

                    <div className='field'>
                      <div className='control'>
                        <input type='text' className='input is-info' placeholder='Role Name'
                               value={this.state.role_name} onChange={(e) => this.setState({role_name: e.target.value})}
                               required/>
                      </div>
                    </div>

                    <div className='field'>
                      <textarea className='textarea' cols='30' rows='10' required value={this.state.role_detail}
                                onChange={(e) => this.setState({role_detail: e.target.value})}/>
                    </div>

                    <div className='field'>
                      <div className='level-right'>
                        <div className='control'>
                          <button className='button is-success' style={{width: '100px'}}>Save</button>
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