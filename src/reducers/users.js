import React from 'react'
import firebase from '../components/FirebaseDatabase'
import 'sweetalert'
let key = '.F[.f4HJXtinJiyeYZNytH7;l5eTdVr3~Jd,](Z@<S0oCCWY^DA-~OM#d.-+YKc';
let encryptor = require('simple-encryptor')(key);

let facebook_id = ''

let initialState = {}

export default (state = initialState, action) => {

  switch (action.type) {

    case 'sign_up':
      const {
        signup_name,
        signup_email,
        signup_password,
        signup_confirm_password,
        signup_role,
        signup_then
      } = action.info
      const signup_ref = firebase.database().ref('cmmc')

      if (signup_password !== signup_confirm_password) {
        swal('Error', 'Password do not match.', 'error')
        break
      }

      /* === check duplicate email === */
      let duplicate_email = 0
      signup_ref.child('member').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().email === signup_email) {
            duplicate_email = 1
          }
        })
      }).then(function () {
        if (duplicate_email === 1) {
          swal('Error', 'Email not available.', 'error')
        } else {
          signup_ref.child('member').push({
            name: signup_name,
            email: signup_email,
            password: signup_password,
            role: signup_role
          }).then(function () {
            swal('Success', 'Woo hoo.', 'success')
            signup_then.setState({redirect: true})
          })
        }
      })
      /* ============================= */
      return null
      break

    case 'sign_up_facebook':
      const {
        signup_facebook_id,
        signup_facebook_name,
        signup_facebook_then
      } = action.info

      /* === check duplicate facebook sign up === */
      let search_facebook_id = 0
      let facebook_ref = firebase.database().ref('cmmc/member')
      facebook_ref.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().facebook_id === signup_facebook_id) {
            search_facebook_id = 1
          }
        })
      }).then(function () {
        if (search_facebook_id === 0) {
          facebook_ref.push({
            facebook_id: signup_facebook_id,
            name: signup_facebook_name,
            email: 'Insert your email ...',
            password: encryptor.encrypt(signup_facebook_id),
            role: 'none'
          }).then(function () {
            signup_facebook_then.setState({redirect: true})
          })
        }
      })
      /* ============================= */
      return null
      break

    case 'sign_in':
      const {
        signin_email,
        signin_password,
        signin_then
      } = action.info

      const singin_ref = firebase.database().ref('cmmc/member')
      let user_id = ''

      singin_ref.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().email === signin_email &&
            childSnapshot.val().password === signin_password) {

            user_id = childSnapshot.key

          }
        })
      }).then(function () {
        if (signin_then.state.token !== null) {

          const random_token = encryptor.encrypt(user_id)
          localStorage.setItem('_token', random_token)
          firebase.database().ref('cmmc/member/' + user_id).update({
            token: random_token
          })
          signin_then.setState({redirect: true})

        } else {
          swal('Error', 'User not found.', 'error')
        }
      })
      return null
      break

    case 'sign_in_facebook':
      const {
        signin_facebook_id,
        signin_facebook_then
      } = action.info

      const singin_facebook_ref = firebase.database().ref('cmmc/member')
      singin_facebook_ref.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().facebook_id === signin_facebook_id) {

            const random_token = encryptor.encrypt(childSnapshot.key)

            localStorage.setItem('_token', random_token)

            firebase.database().ref('cmmc/member/' + childSnapshot.key).update({
              token: random_token
            })

            signin_facebook_then.setState({redirect: true})

            //localStorage.setItem('_token', encryptor.encrypt(childSnapshot.key))
          }
        })
      })
      return null
      break

    case 'sign_out':

      const {sign_out_then} = action.info

      firebase.database().ref('cmmc/member').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {

          let _token = encryptor.decrypt(localStorage.getItem('_token'))

          if (childSnapshot.key === _token) {

            console.log(`logout : ${_token}`)

            firebase.database().ref('cmmc/member/' + _token).update({
              token: 'none'
            })

            sign_out_then.setState({signout: true})

          }

        })
      })

      return null
      break

    case 'profile_init':

      let profile_init_state = false
      const {profile_init} = action.info

      firebase.database().ref('cmmc/member').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {

          let _token = encryptor.decrypt(localStorage.getItem('_token'))

          if (childSnapshot.key === _token) {
            profile_init.setState({
              name: childSnapshot.val().name,
              email: childSnapshot.val().email,
              role: childSnapshot.val().role
            })
            profile_init_state = true
          } else {
            console.log(`--- key ${childSnapshot.key} != ${_token}`)
          }

        })
      }).then(() => {

        if (!profile_init_state) {
          profile_init.setState({signout: true})
        } else {

          const RoleList = (props) => {
            return <option value={props.value}>{props.name}</option>
          }
          let lists = []
          firebase.database().ref('cmmc/roles').once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              lists.push(<RoleList
                key={childSnapshot.key}
                name={childSnapshot.val().name}
                value={childSnapshot.key}
              />)

              if (childSnapshot.key === profile_init.state.role) {
                profile_init.setState({
                  role_detail: childSnapshot.val().detail
                })
              }
            })
            profile_init.setState({RoleLists: lists})
          })

        }

      })

      return null
      break

    case 'profile_update':
      const {profile_name, profile_email, profile_role, profile_then} = action.info
      firebase.database().ref('cmmc/member/' + profile_then.state.token).update({
        name: profile_name,
        email: profile_email,
        role: profile_role
      })
      firebase.database().ref('cmmc/roles/').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.key === profile_role) {
            profile_then.setState({role_detail: childSnapshot.val().detail})
          }
        })
      })
      swal('Success', '', 'success')
      return null
      break

    default:
      return state
  }
}