import React from 'react'
import { Link } from 'react-router-dom'

const RoleList = (props) => (
  <tr>
    <td style={styles.td}>{props.number}</td>
    <td style={styles.td}>{props.name}</td>
    <td>
      <Link to={props.edit}>
        <button className="button is-primary" style={{width: '100%'}}>Edit</button>
      </Link>
    </td>
    <td>
      <button className="button is-danger" style={{width: '100%'}} onClick={props.delete}>Delete</button>
    </td>
  </tr>
)

const styles = {
  td: {
    textAlign: 'center',
    verticalAlign: 'middle'
  }
}

export default RoleList