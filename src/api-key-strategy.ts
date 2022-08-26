import { AuthenticationBaseStrategy, AuthenticationResult } from '@feathersjs/authentication/lib';
import { NotAuthenticated } from '@feathersjs/errors';
import { Params } from '@feathersjs/feathers';
import { IncomingMessage, ServerResponse } from 'http';

interface AuthResponseType {
  authentication: {
      [x: number]: any;
      strategy: string | undefined;
  };
  headers: any;
  apiKey: boolean;
}

interface ParseResponseType {
  [x: number]: string | string[];
  strategy: string | undefined;
}

export class ApiKeyStrategy extends AuthenticationBaseStrategy {
  private serviceBased = false;
  constructor() {
    super();
  }

  verifyConfiguration(): void {
    this.serviceBased = ['service', 'entity'].every(
      (prop) => prop in this.configuration
    );
    if (!this.serviceBased) {
      if (!('key' in this.configuration)) {
        throw new Error(
          `A static key is missing, when strategy '${this.name}', is not service based`
        );
      }
    }
    ['headerField'].forEach((prop) => {
      if (prop in this.configuration) return;
      throw new Error(`'${prop}' is missing from configuration`);
    });
  }

  get configuration(): any {
    const config = super.configuration || {};
    return { errorMessage: 'Invalid API key', entity: 'api-key', ...config };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findEntity(apiKey: string, params: Params ): Promise<any> {
    const { errorMessage, entity } = this.configuration;
    try {
      const result = await this.entityService.find({
        query: { [entity]: apiKey, $limit: 1 },
      });
      if (result.total === 0) {
        throw new NotAuthenticated(errorMessage);
      }
      return result.data[0];
    } catch (error) {
      throw new NotAuthenticated(errorMessage);
    }
  }

  async authenticate(authRequest: AuthenticationResult, params: Params): Promise<AuthResponseType> {
    const {
      key,
      errorMessage,
      entity,
      revokedField,
      headerField,
    } = this.configuration;
    const apiKey = authRequest[entity];
    const response = {
      authentication: {
        strategy: this.name,
        [entity]: apiKey,
      },
      headers: {
        ...params.headers,
        [headerField]: apiKey,
      },
      apiKey: true,
    };

    if (!this.serviceBased) {
      if (key !== apiKey) throw new NotAuthenticated(errorMessage);
      return response;
    }

    const apiKeyData = await this.findEntity(apiKey, params);
    if (revokedField in apiKeyData) {
      if (apiKeyData[revokedField]) {
        throw new NotAuthenticated('API Key has been revoked');
      }
    }

    Object.assign(response, { [entity]: apiKeyData });
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async parse(req: IncomingMessage, res: ServerResponse): Promise<ParseResponseType | null > {
    const { headerField, entity } = this.configuration;
    const apiKey = req.headers[headerField];
    if (apiKey) {
      return {
        strategy: this.name,
        [entity]: apiKey,
      };
    }

    return null;
  }
}
