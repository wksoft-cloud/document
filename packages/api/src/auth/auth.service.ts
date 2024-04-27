import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {
  }


  // 创建后台管理员信息
  public async createAdminUser() {
    try {
      return await this.prisma.admin.upsert({
        where: { username: 'yizhanshi666' },
        update: {},
        create: {
          username: 'yizhanshi666',
          password: 'yizhanshi666',
        },
      });
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: JSON.stringify(e),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 获取后台管理员信息
  public async findAdminUser({ username }: { username: string }) {
    try {
      return await this.prisma.admin.findFirstOrThrow({
        where: { username },
      });
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: JSON.stringify(e),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 获取用户信息
  public async findUser({ username }: { username: string }) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { username },
      });
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: JSON.stringify(e),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 创建用户
  public async createUser({ username, password }: { username: string, password: string }) {
    try {
      return await this.prisma.user.upsert({
        where: { username: username },
        update: {},
        create: {
          username: username,
          password: password,
          endTime: new Date(),
        },
      });
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: '账户名已存在，请更换',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 通过 id 生成jwt
  public async createToken(id: number, time: string) {
    return this.jwt.sign({ id }, { expiresIn: time });
  }

}
