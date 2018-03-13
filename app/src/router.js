import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import index from './routes/index.js';
import book from './routes/bookDetail.js';
import upload from './routes/uploadBook';
import info from './routes/info';
import about from './routes/about';
import register from './routes/register';
import uploaded from './routes/uploadedBook'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact  component={index} />
        <Route path='/book' exact component={book} />
        <Route path='/upload' exact component={upload}/>
        <Route path='/info' exact component={info}/>
        <Route path='/about' exact component={about}/>
        <Route path='/register' exact component={register}/>
        <Route path='/uploaded' exact component={uploaded}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
