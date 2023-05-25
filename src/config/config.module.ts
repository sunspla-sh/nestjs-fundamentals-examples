import {
  // DynamicModule,
  Module,
} from '@nestjs/common';
import { ConfigService } from './config.service';
// import { CONFIG_OPTIONS } from './config.constant';
import { ConfigurableModuleClass } from './config.module-definition';

/**
 * this is our old custom config module with a register method. it is used basically as a host for providing and
 * exporting our injectable ConfigService for use by other providers
 */

// @Module({})
// export class ConfigModule {
//   static register(options: Record<string, any>): DynamicModule {
//     return {
//       module: ConfigModule,
//       providers: [
//         {
//           provide: CONFIG_OPTIONS,
//           useValue: options,
//         },
//         ConfigService,
//       ],
//       exports: [ConfigService],
//     };
//   }
// }

/**
 * this ConfigModule extends a ConfigurableModuleClass which already has a register method and an async register method so that
 * we don't have to create them ourselves from scratch. We get this ConfigurableModuleClass from the config.module-definition.ts
 * file, in which we used the ConfigurableModuleBuilder to scaffold a new configurable module with our ConfigModuleInterface (representing
 * the shape of our config object). It returned the ConfigurableModuleClass and a token (MODULE_OPTIONS_TOKEN) which we could use to inject
 * our options into the ConfigService after we invoked its .build() method. I assume that the .build() method must have registered the
 * options object as a provider somewhere using the MODULE_OPTIONS_TOKEN otherwise we wouldn't be able to inject it. Yep, I found it by
 * reading the source code - calling the .build() method invokes another private method known as the .createConfigurableModuleCls() method
 * which defines and returns an InternalModuleClass. That InternalModuleClass has a static method with a variable name [self.staticMethodKey]
 * that returns a DynamicModule which has registered our token and config values as a provider
 * ({ provide: self.options.optionsInjectionToken, useValue: this.omitExtras(options, self.extras)})
 */
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {}
