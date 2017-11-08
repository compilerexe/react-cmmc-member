import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import 'bulma/css/bulma.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'

class Main extends Component {

  constructor (props) {
    super(props)
    this.state = {token: null}
  }

  _PageNotFound = ({ location }) => (
    <div className='container'>
      Page not found for <code>{location.pathname}</code>
    </div>
  )

  render () {
    return (
      <Router>
        <Switch>
          <Route path='/' component={SignIn} exact/>
          <Route path='/signup' component={SignUp} exact/>
          <Route path='/profile' component={Profile} exact/>
          <Redirect to='/'/>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'))
