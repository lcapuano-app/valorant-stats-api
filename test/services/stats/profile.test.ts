import assert from 'assert';
import app from '../../../src/app';

describe('\'stats/profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('stats/profile');

    assert.ok(service, 'Registered the service');
  });
});
