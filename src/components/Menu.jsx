import React from 'react'

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
              <a href='#'> Role </a>
            </li>
            <li>
              <a href='#'> Sign Out </a>
            </li>
          </ul>
        </aside>
      </div>
    )
  }
}

export default Menu