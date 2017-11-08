import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from './FirebaseDatabase'
import Menu from './Menu.jsx'
import RoleList from './RoleList.jsx'

export default class Manage extends Component {

  constructor (props) {
    super(props)
    this.state = {RoleLists: []}
  }

  componentDidMount () {
    let ref = firebase.database().ref('cmmc/roles')

    ref.on('value', (snapshot) => {
      let count = 1
      let lists = []

      snapshot.forEach(function (childSnapshot) {
        lists.push(<RoleList key={count} number={count} name={childSnapshot.val().name}/>)
        count++
      })

      //console.log(lists)
      this.setState({RoleLists: lists})
    })
  }

  render () {

    const styles = {
      th: {
        textAlign: 'center',
        verticalAlign: 'middle'
      }
    }

    return (
      <div className='container'>
        <div className='columns'>

          <Menu.Admin/>

          <div className='column is-8'>

            <div className='section'>

              <h1 className='title'>Role</h1>
              <hr/>

              <div className='card'>
                <div className='card-content'>

                  <div className='field level-right'>
                    <div className='control'>
                      <Link to='/role/create'>
                        <button className='button is-success'>Add Role</button>
                      </Link>
                    </div>
                  </div>

                  <table className='table is-bordered' style={{width: '100%'}}>
                    <thead>
                    <tr>
                      <th style={styles.th}>#</th>
                      <th style={styles.th}>Role Name</th>
                      <th></th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody id='roles'>
                    {
                      this.state.RoleLists.map((list) => {
                        return list
                      })
                    }
                    </tbody>
                  </table>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    )
  }
}

