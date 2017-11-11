export const role_init = ({init = ''} = {}) => ({
  type: 'role_init',
  info:
    {
      init
    }
})

export const role_create = ({c_role_name = '', c_role_detail = '', c_role_than = ''} = {}) => ({
  type: 'role_create',
  info:
    {
      c_role_name,
      c_role_detail,
      c_role_than
    }
})

export const role_edit = ({e_role_than = ''} = {}) => ({
  type: 'role_edit',
  info:
    {
      e_role_than
    }
})

export const role_update = ({u_role_name = '', u_role_detail = '', u_role_than = ''} = {}) => ({
  type: 'role_update',
  info:
    {
      u_role_name,
      u_role_detail,
      u_role_than
    }
})