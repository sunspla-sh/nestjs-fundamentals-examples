import { Injectable } from '@nestjs/common';
import { HelloService } from './hello/hello.service';

@Injectable()
export class AppService {
  constructor(private helloService: HelloService) {}
  getHello(): string {
    this.helloService.sayHello('haha loser');
    return 'Hello World!';
  }
}
