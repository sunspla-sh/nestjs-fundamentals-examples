import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { EnvConfig } from './interfaces/envconfig.interface';
// import { CONFIG_OPTIONS } from './config.constant';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';
import { ConfigModuleOptions } from './interfaces/config-module-options.interface';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  //no longer using our custom CONFIG_OPTIONS token, now instead using the MODULE_OPTIONS_TOKEN that was created by the ConfigurableModuleBuilder
  // constructor(@Inject(CONFIG_OPTIONS) private options: Record<string, any>) {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: ConfigModuleOptions,
  ) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
