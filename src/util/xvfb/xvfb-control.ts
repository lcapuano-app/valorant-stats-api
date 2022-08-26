import os from 'os';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _Xvfb = require('xvfb');
const xvfb = new _Xvfb();

export const xvfbInit = (): void => {

  if ( os.type() == 'Linux' ) {
    xvfb.startSync();
  }
}

export const xvfbStop = (): void => {

  if ( os.type() == 'Linux' ) {
    xvfb.stopSync();
  }
}