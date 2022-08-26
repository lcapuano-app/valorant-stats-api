import assert from 'assert';
import app from '../../src/app';

describe('\'tracker\' service', () => {
  it('registered the service', () => {
    const service = app.service('tracker');

    assert.ok(service, 'Registered the service');
  });
});
