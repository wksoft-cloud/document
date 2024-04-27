import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MainModule } from './main.module';

const bootstrap = async () => {

  const app = await NestFactory.create(MainModule);

  // 跨域请求
  app.enableCors();

  // 接收数据自动验证
  app.useGlobalPipes(
    new ValidationPipe({
      // 白名单模式，只保留有用的数据
      whitelist: true,
      // 验证到第一个错误的时候，不会继续往下验证
      stopAtFirstError: true,
    }),
  );

  // 版本控制
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
  });


  // openApi 文档
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('用于展示生成的接口文档')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 监听端口
  await app.listen(8000);
};

bootstrap().then();
