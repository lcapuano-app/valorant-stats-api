import assert from 'assert';
import app from '../../../src/app';

describe('\'stats/agent\' service', () => {
  it('registered the service', () => {
    const service = app.service('stats/agent');

    assert.ok(service, 'Registered the service');
  });
});
