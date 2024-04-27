import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * 异常返回拦截器，按照我们需要的格式进行返回
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    // 获取状态
    const status = exception.getStatus();

    // 获取响应对应的值
    const { message, error } = exception.getResponse() as any;


    // 根据不同的状态返回不同的信息
    switch (status) {
      // 请求参数有问题
      case 400:
        response.status(200).json({
          status: status,
          message: message[0],
        });
        break;
      // jwt鉴权失败
      case 401:
        response.status(200).json({
          status: status,
          message: '无权限访问该接口',
        });
        break;
      // 默认返回
      default:
        response.status(200).json({
          status: status,
          message: error
            ? error
            : Array.isArray(message)
              ? message[0]
              : message,
        });
    }
  }
}
