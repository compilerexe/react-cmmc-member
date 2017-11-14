import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter,
  Route,
  withRouter,
  Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import 'bulma/css/bulma.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Manage from './components/Manage'
import RoleCreate from './components/RoleCreate'
import RoleEdit from './components/RoleEdit'

const store = configureStore()

class Main extends Component {

  constructor (props) {
    super(props)

    // console.log(store.getState().usersReducer)
    // store.dispatch(remember_token({token: 'hola'}))
    // console.log(store.getState().usersReducer)
    // store.dispatch(remember_token({token: 'this is token'}))
    // console.log(store.getState().usersReducer)
  }

  render () {

    const PageNotFound = ({location}) => (
      <div className='container'>
        Page not found for <code>{location.pathname}</code>
      </div>
    )

    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path='/' component={SignIn} exact/>
            <Route path='/signup' component={SignUp} exact/>
            <Route path='/profile' component={Profile} exact/>
            <Route path='/manage' component={Manage} exact/>
            <Route path='/role/create' component={RoleCreate} exact/>
            <Route path='/role/edit/:id' component={RoleEdit} exact/>
            <Route component={PageNotFound}/>
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'))
