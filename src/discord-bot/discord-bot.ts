import { Client, GatewayIntentBits, REST } from 'discord.js';
import app from '../app';
import { AppExtraDiscord } from '../declarations';
import { BotInteraction } from './bot-interaction';

/**
 * Discord client singleton setup
 */
export class DiscordBot {

  private static _instance: DiscordBot;
  private static _appDiscord: AppExtraDiscord;
  private static _token: string;

  private constructor() {
    DiscordBot
      ._setup()
      ._init();
  }

  static getInstance() {
    if ( this._instance )
      return this._instance;

    this._instance = new DiscordBot()
  }

  private static _setup() {

    this._token = app.get('discordBot')?.token;
    this._appDiscord = { client: <Client>{}, rest: <REST>{} };
    this._clientSetup();
    this._restSetup();
    return this
  }

  private static _init() {
    this._clientInit();
    this._restInit();

  }

  private static _clientSetup(): void {

    const client =  new Client({ intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
    ]});
    this._appDiscord.client = client;
    app.discord = this._appDiscord

  }

  private static _restSetup(): void {
    const rest = new REST({ version: '10' }).setToken( this._token );
    this._appDiscord.rest = rest;
    app.discord = this._appDiscord;
  }

  private static _clientInit(): void {
    const client: Client = app?.discord?.client || <Client>{};

    if ( !client)
      return;

    client.on('ready', () => {
      console.log(`Logged in as ${client?.user?.tag}!`);
    });

    client.on('interactionCreate', BotInteraction.interact );

    client.login( this._token );
  }

  private static _restInit() {
    BotInteraction.setCommands().catch();
    return this;
  }
}
