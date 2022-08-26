// Initializes the `henrik` service on path `/henrik`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Henrik } from './henrik.class';
import hooks from './henrik.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'henrik': Henrik & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/henrik', new Henrik(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('henrik');

  service.hooks(hooks);
}
