// Initializes the `stats/profile` service on path `/stats/profile`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { StatsProfile } from './stats-profile.class';
import createModel from '../../../models/stats-profile.model';
import hooks from './stats-profile.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'stats/profile': StatsProfile & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/stats/profile', new StatsProfile(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('stats/profile');

  service.hooks(hooks);
}
