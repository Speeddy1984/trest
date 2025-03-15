import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Настройка сессии
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { 
        maxAge: 3600000, // 1 hour
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );
  
  // Инициализация Passport
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}

bootstrap();

//// проверить 1.6. Настройка сессии в main.ts:
// добавлено:
// app.use(
//   session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: process.env.NODE_ENV === 'production' },
//   }),
// );