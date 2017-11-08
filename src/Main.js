import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import 'bulma/css/bulma.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Manage from './components/Manage'
import RoleCreate from './components/RoleCreate'
import RoleEdit from './components/RoleEdit'

class Main extends Component {

  constructor (props) {
    super(props)
    this.state = {token: null}
  }

  render () {

    const PageNotFound = ({ location }) => (
      <div className='container'>
        Page not found for <code>{location.pathname}</code>
      </div>
    )

    return (
      <HashRouter>
        <Switch>
          <Route path='/' component={SignIn} exact/>
          <Route path='/signup' component={SignUp} exact/>
          <Route path='/profile/:id' component={Profile} exact/>
          <Route path='/manage' component={Manage} exact/>
          <Route path='/role/create' component={RoleCreate} exact/>
          <Route path='/role/edit/:id' component={RoleEdit} exact/>
          <Route component={PageNotFound}/>
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'))
