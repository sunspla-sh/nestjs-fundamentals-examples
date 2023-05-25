import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from './config/config.module';
import { HelloModule } from './hello/hello.module';

/**
 * By extending the ConfigurableModuleClass, our ConfigModule now has both a register method and a registerAsync
 * method by default, which allows consumers to asynchronously configure the module, for example,
 * by supplying async factories.
 * ...
 * We can set a different method name instead of .register() with the .setClassName(string) method of the ConfigurableModuleBuilder
 */
@Module({
  imports: [
    CatsModule,
    HelloModule,
    ConfigModule.register({ folder: './config' }),
    /**
     * or alternatively:
     * ConfigModule.registerAsync({
     *  useFactory: () => {
     *    return {
     *      folder: './config
     *    }
     *  },
     *  inject: [... any extra dependencies here...]
     * })
     */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
