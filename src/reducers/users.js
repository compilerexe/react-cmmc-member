import firebase from '../components/FirebaseDatabase'
import 'sweetalert'

export default (state = {}, action) => {
  switch (action.type) {
    case 'sign_up':
      const {name, email, password, confirm_password, role, then} = action.info
      const ref = firebase.database().ref('cmmc')

      if (password !== confirm_password) {
        swal('Error', 'Password do not match.', 'error')
        break
      }

      /* === check duplicate email === */
      let duplicate_email = 0
      ref.child('member').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().email === email) {
            duplicate_email = 1
          }
        })
      }).then(function () {
        if (duplicate_email === 1) {
          swal('Error', 'Email not available.', 'error')
        } else {
          ref.child('member').push({
            name: name,
            email: email,
            password: password,
            role: role
          }).then(function () {
            swal('Success', 'Woo hoo.', 'success')
            then.setState({redirect: true})
          })
        }
      })
      /* ============================= */

      break
    default:
      return state
  }
}