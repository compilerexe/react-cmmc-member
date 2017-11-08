import React from 'react'
import { Link } from 'react-router-dom'

const Menu = {
  User: () => {

  },
  Admin: () => {
    return (
      <div className='column is-2 is-offset-1'>
        <aside className='menu section'>
          <p className='menu-label'> Menu </p>
          <ul className='menu-list'>
            <li>
               <Link to='/manage'>
                 Role
               </Link>
            </li>
            <li>
              <Link to='/'>
                Sign Out
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    )
  }
}

export default Menu