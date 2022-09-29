import assert from 'assert';
import app from '../../src/app';

describe('\'faker\' service', () => {
  it('registered the service', () => {
    const service = app.service('faker');

    assert.ok(service, 'Registered the service');
  });
});
