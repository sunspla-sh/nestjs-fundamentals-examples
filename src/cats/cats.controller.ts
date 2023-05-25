import { Controller, Get, Inject } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Connection } from './connection';
import { HelloService } from 'src/hello/hello.service';

@Controller('cats')
export class CatsController {
  connection: Connection;
  mockCatsService: CatsService;
  config;
  constructor(
    @Inject('CONNECTION') connection: Connection,
    @Inject('MockCatsSErvice') mockCatsService: CatsService,
    @Inject('CONFIG') config,
    private catsService: CatsService,
    private helloService: HelloService,
  ) {
    this.connection = connection;
    this.mockCatsService = mockCatsService;
    this.config = config;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    this.helloService.sayHello('haha no cats');
    return this.catsService.findAll();
  }

  @Get('connection')
  makeConnectionString(): Connection {
    console.log(this.connection);
    return this.connection;
  }

  @Get('mock')
  async mock(): Promise<Cat[]> {
    return this.mockCatsService.findAll();
  }

  @Get('config')
  configure(): string {
    return this.config;
  }
}
