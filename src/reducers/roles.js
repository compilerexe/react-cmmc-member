import React from 'react'
import firebase from '../components/FirebaseDatabase'
import RoleList from '../components/RoleList.jsx'

export default (state = {}, action) => {

  switch (action.type) {

    case 'role_init':
      const {init} = action.info
      firebase.database().ref('cmmc/roles').on('value', (snapshot) => {
        let count = 1
        let lists = []
        snapshot.forEach(function (childSnapshot) {
          lists.push(<RoleList
            key={count} number={count}
            name={childSnapshot.val().name}
            edit={'role/edit/' + childSnapshot.key}
            delete={() => {firebase.database().ref('cmmc/roles/' + childSnapshot.key).remove()}}
          />)
          count++
        })
        init.setState({RoleLists: lists})
      })

      return null
      break

    case 'role_create':
      const {c_role_name, c_role_detail, c_role_than} = action.info
      firebase.database().ref('cmmc/roles').push({
        name: c_role_name,
        detail: c_role_detail
      }).then(function () {
        c_role_than.setState({redirect: true})
      })
      return null
      break

    case 'role_edit':
      const {e_role_name, e_role_detail, e_role_than} = action.info
      firebase.database().ref('cmmc/roles').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          //console.log(then.state.role_id)
          if (childSnapshot.key === e_role_than.props.match.params.id) {
            e_role_than.setState({
              role_name: childSnapshot.val().name,
              role_detail: childSnapshot.val().detail
            })
          }
        })
      })
      return null
      break

    case 'role_update':
      const {u_role_name, u_role_detail, u_role_than} = action.info
      firebase.database().ref('cmmc/roles/' + u_role_than.props.match.params.id).set({
        name: u_role_name,
        detail: u_role_detail
      })
      swal('Success', '', 'success')
      return null
      break

    default:
      return state

  }

}