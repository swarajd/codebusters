import { app } from 'hyperapp';

import actions from './actions';
import state from './state';
import view from './components/Counter';

const appArgs = [
  state,
  actions,
  view,
  document.getElementById('app'),
];

let main;

if (process.env.NODE_ENV !== 'production') {
  import('hyperapp-redux-devtools')
    .then((devtools) => {
      main = devtools(app)(...appArgs);
    });
} else {
  main = app(...appArgs);

}
