import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthGuard } from './app/auth/guard/auth.guard';
import { Reflector } from "@nestjs/core";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //logger:false
  });

  const config = new DocumentBuilder()
    .setTitle('Acceptance Criteria')
    .setDescription('RESTful API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // const reflector = app.get( Reflector );
  // app.useGlobalGuards(new AuthGuard(reflector));
  await app.listen(8080);
}
bootstrap();
