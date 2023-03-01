import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TodoModule } from './Todo/todo.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(TodoModule);
  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 10000000000}
    })
  )
  await app.listen(3000);
}
bootstrap();
