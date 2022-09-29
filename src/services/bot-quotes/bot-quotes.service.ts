// Initializes the `bot-quotes` service on path `/bot-quotes`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { BotQuotes } from './bot-quotes.class';
import createModel from '../../models/bot-quotes.model';
import hooks from './bot-quotes.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'bot-quotes': BotQuotes & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: [ 'delete', 'remove', 'create' ]
  };

  // Initialize our service with any options it requires
  app.use('/bot-quotes', new BotQuotes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('bot-quotes');

  service.hooks(hooks);
}
