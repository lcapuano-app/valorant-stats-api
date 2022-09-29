import assert from 'assert';
import app from '../../src/app';

describe('\'bot-quotes\' service', () => {
  it('registered the service', () => {
    const service = app.service('bot-quotes');

    assert.ok(service, 'Registered the service');
  });
});
