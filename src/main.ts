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
    }),
  );
  
  // Инициализация Passport
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user);
  });
  passport.deserializeUser((user: any, done) => {
    console.log('Deserializing user:', user);
    done(null, user);
  });

  await app.listen(3000);
}

bootstrap();