import React from 'react';

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import Main from './components/Pages/Main';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path='/'
                    exact
                    component={() => <Redirect to='/estate' />}
                />
                <Route path='/estate' exact component={Main} />
            </Switch>
        </Router>
    );
};

export default App;
