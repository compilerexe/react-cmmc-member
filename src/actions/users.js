export const sign_up = (
  {
    signup_name = '',
    signup_email = '',
    signup_password = '',
    signup_confirm_password = 'none',
    signup_role = 'none',
    signup_then = ''
  } = {}) => ({
  type: 'sign_up',
  info:
    {
      signup_name,
      signup_email,
      signup_password,
      signup_confirm_password,
      signup_role,
      signup_then
    }
})

export const sign_up_facebook = (
  {
    signup_facebook_id = '',
    signup_facebook_name = '',
    signup_facebook_then = ''
  } = {}) => ({
  type: 'sign_up_facebook',
  info:
    {
      signup_facebook_id,
      signup_facebook_name,
      signup_facebook_then
    }
})

export const sign_in = (
  {
    signin_email = '',
    signin_password = '',
    signin_then = ''
  } = {}) => ({
    type: 'sign_in',
    info:
      {
        signin_email,
        signin_password,
        signin_then
      }
  }
)

export const sign_in_facebook = (
  {
    signin_facebook_id = '',
    signin_facebook_then = ''
  } = {}) => ({
    type: 'sign_in_facebook',
    info:
      {
        signin_facebook_id,
        signin_facebook_then
      }
  }
)

export const sign_out = ({sign_out_then} = {}) => ({type: 'sign_out', info: {sign_out_then}})

export const profile_init = (
  {
    profile_init = ''
  } = {}) => ({
    type: 'profile_init',
    info:
      {
        profile_init
      }
  }
)

export const profile_update = (
  {
    profile_name = '',
    profile_email = '',
    profile_role = 'none',
    profile_then = ''
  } = {}) => ({
    type: 'profile_update',
    info:
      {
        profile_name,
        profile_email,
        profile_role,
        profile_then
      }
  }
)