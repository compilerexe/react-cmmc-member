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