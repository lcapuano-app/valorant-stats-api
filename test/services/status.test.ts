import assert from 'assert';
import app from '../../src/app';

describe('\'status\' service', () => {
  it('registered the service', () => {
    const service = app.service('status');

    assert.ok(service, 'Registered the service');
  });
});
