import React , {Component} from 'react'
import { HashRouter, BrowserRouter , Route, Switch , Link} from 'react-router-dom'

import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'

class App extends Component {
    render () {
        return (
            <HashRouter>
                {/* <Link to="/login">关于</Link> */}
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    {/* <Route path='/admin' component={Admin}></Route> */}
                    <Route path="/" component={Admin}></Route>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;

//p53, p62, p137-p141
//p526-p541

//react1-晓飞,react2-2020,flex,webpack,promise