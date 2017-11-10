export const sign_up = (
  {
    name = '',
    email = '',
    password = '',
    confirm_password = 'none',
    role = 'none',
    then = ''
  } = {}) => ({
  type: 'sign_up',
  info:
    {
      name,
      email,
      password,
      confirm_password,
      role,
      then
    }
})