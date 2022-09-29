// Initializes the `faker` service on path `/faker`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Faker } from './faker.class';
import hooks from './faker.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'faker': Faker & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/faker', new Faker(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('faker');

  service.hooks(hooks);
}
