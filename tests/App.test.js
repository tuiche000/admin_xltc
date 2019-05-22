import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

import App from '../src/App';

test('test App', ()=>{
  let div=document.createElement('div');

  render(<App />, div);

  expect(div.querySelector('h1').innerHTML).toBe('App组件');

  unmountComponentAtNode(div);
});
