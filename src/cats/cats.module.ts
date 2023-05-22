import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { connection } from './connection';

const mockCatsService = {
  cats: [{ name: 'tim', age: 2, breed: 'siamese' }],
  findAll() {
    return this.cats;
  },
};

const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? 'devValue' : 'prodValue';
  },
};

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useClass: CatsService,
      // useValue: mockCatsService,
    },
    {
      provide: 'MockCatsSErvice',
      useValue: mockCatsService,
    },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
    configFactory,
  ],
})
export class CatsModule {}
