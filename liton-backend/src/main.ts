import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as crypto from 'crypto';

if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = { randomUUID: crypto.randomUUID } as any;
}
const origins =
  process.env.FRONT_ALLOWED ||
  process.env.ORIGIN_PROD ||
  process.env.ORIGIN_DEV ||
  'http://localhost:5000';

const allowedOrigins = origins.split(',');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
}
void bootstrap();
