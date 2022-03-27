import { config } from 'dotenv';

class Environment {
  static getConfig(name: string) {
    let environmentVariable;
    if (process.env[name]) environmentVariable = <string>process.env[name];

    const parsed = config().parsed;
    environmentVariable = parsed ? parsed[name] : null;

    return environmentVariable;
  }
}

export { Environment };
