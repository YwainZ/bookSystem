import dva from 'dva';
import './index.css';
import { browserHistory }from 'dva/router'


// 1. Initialize
const app = dva({
  history: browserHistory
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

