// Initializes the `stats/agent` service on path `/stats/agent`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { StatsAgent } from './stats-agent.class';
import createModel from '../../../models/stats-agent.model';
import hooks from './stats-agent.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'stats/agent': StatsAgent & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/stats/agent', new StatsAgent(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('stats/agent');

  service.hooks(hooks);
}
