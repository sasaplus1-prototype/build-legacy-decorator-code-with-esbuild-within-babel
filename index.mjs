import * as React from 'react';

function logger(target) {
  console.log(`Class ${target} is created`);
  return target;
}

@logger
class A extends React.Component {
  render() {
    return React.createElement('div', null, 'Hello World');
  }
}
