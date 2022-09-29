import { Application as ExpressFeathers } from '@feathersjs/express';
import { HookContext, Service } from '@feathersjs/feathers';
import { Client, REST } from 'discord.js'
// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {}

// The application instance type that will be used everywhere else
export interface AppExtraDiscord {
  client?: Client,
  rest?: REST
}
export interface ApplicationCustom {
  discord?: AppExtraDiscord
}
export type Application = ExpressFeathers<ServiceTypes>// & ApplicationCustom;

export type HookResponse = Promise<HookContext<any, Service<any>>>
