import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  Login,
  LoginResponse,
  Register,
  RegisterResponse,
} from './interfaces/auth.interface';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);
  greet(): string {
    return 'Hello World!';
  }

  async login(email, password): Promise<LoginResponse> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.password) {
      this.logger.warn(`Unauthorized attempt for non-existent email: ${email}`);
      throw new UnauthorizedException(
        'You account is passwordless. Use your OAuth provider to log in',
      );
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      this.logger.warn(`Unauthorized login attempt for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password.');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      success: true,
      message: 'Logged in Successfully',
      access_token: await this.jwtService.signAsync(payload),
      // Note: Handle token distribution later.
    };
  }

  async register(
    firstname,
    lastname,
    email,
    password,
  ): Promise<RegisterResponse> {
    const hashedPassword: string = await argon2.hash(password);
    const exitingUser = await this.userService.getUserByEmail(email);

    if (exitingUser) {
      throw new ConflictException('Email already exists');
    }
    try {
      await this.prisma.user.create({
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hashedPassword,
        },
      });
      return {
        success: true,
        message: 'Registered successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
    // TODO: send a email verfication.
  }
}
