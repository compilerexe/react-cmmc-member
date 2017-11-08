import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from './FirebaseDatabase'
import Menu from './Menu.jsx'
import 'sweetalert'

export default class RoleEdit extends Component {

  constructor (props) {
    super(props)
    this.state = {role_name: '', role_detail: ''}
  }

  componentDidMount () {
    let ref = firebase.database().ref('cmmc/roles')
    let then = this

    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        //console.log(then.state.role_id)
        if (childSnapshot.key === then.props.match.params.id) {
          then.setState({
            role_name: childSnapshot.val().name,
            role_detail: childSnapshot.val().detail
          })
        }
      })
    })
  }

  _Submit = (e) => {
    e.preventDefault()
    let ref = firebase.database().ref('cmmc/roles/' + this.props.match.params.id)
    ref.set({
      name: this.state.role_name,
      detail: this.state.role_detail
    })
    swal('Success', '', 'success')
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