import assert from 'assert';
import app from '../../src/app';

describe('\'henrik\' service', () => {
  it('registered the service', () => {
    const service = app.service('henrik');

    assert.ok(service, 'Registered the service');
  });
});
