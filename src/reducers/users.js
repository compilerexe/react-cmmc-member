import firebase from '../components/FirebaseDatabase'
import 'sweetalert'

export default (state = {}, action) => {

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

    case 'sign_in':
      const {
        signin_email,
        signin_password,
        signin_then
      } = action.info
      const singin_ref = firebase.database().ref('cmmc/member')

      singin_ref.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().email === signin_email &&
            childSnapshot.val().password === signin_password) {
            signin_then.setState({token: childSnapshot.key})
            //console.log(then.state.token)
          }
        })
      }).then(function () {
        if (signin_then.state.token !== null) {
          signin_then.setState({redirect: true})
        } else {
          swal('Error', 'User not found.', 'error')
        }
      })
      return null
      break

    default:
      return state
  }
}