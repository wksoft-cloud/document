import { SetMetadata } from '@nestjs/common';

// 不需要验证 jwt 可以直接调用接口
export const AllowAnon = () => SetMetadata('isPublic', true);
