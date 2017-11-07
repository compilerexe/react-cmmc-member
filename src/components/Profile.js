import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import SignIn from './SignIn'

export default class Profile extends Component {

  constructor (props) {
    super(props)
    this.state = {token: props.token}
  }

  _SignOut = () => {
    ReactDOM.render(<SignIn/>, document.getElementById('app'))
  }

  render () {
    return (
      <div className='container'>
        <div className='columns'>

          <div className='column is-2 is-offset-1'>
            <aside className='menu section'>
              <p className='menu-label'> Menu </p>
              <ul className='menu-list'>
                <li>
                  <a href='#'> Profile </a>
                </li>
                <li>
                  <button type='button' className='button is-danger' onClick={this._SignOut}> Sign Out </button>
                </li>
              </ul>
            </aside>
          </div>

          <div className='column is-8'>

            <div className='section'>

              <h1 className='title'>Profile</h1>
              <hr/>

                <div className='card'>
                  <div className='card-content'>


                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='text' placeholder='Name'/>
                      </div>
                    </div>

                    <div className='field'>
                      <div className='control'>
                        <input className='input' type='email' placeholder='E-mail'/>
                      </div>
                    </div>

                    <div className='field'>
                      <label className='label'>Role</label>
                      <div className='control'>
                        <div className='select'>
                          <select>
                            <option value='none'>-- Select Role --</option>
                            <option value='Electronics'>Electronics</option>
                            <option value='Software Developer'>Software Developer</option>
                            <option value='Designer'>Designer</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className='field'>
                      <div className='level-right'>
                        <div className='control'>
                          <button className='button is-success'>save</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

            </div>

          </div>

        </div>

      </div>
    )
  }
}