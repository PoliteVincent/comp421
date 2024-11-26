import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import {
  Login,
  LoginResponse,
  Register,
  RegisterResponse,
} from './interfaces/auth.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { GoogleGuard } from './guards/google.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john.doe@example.com' },
        password: { type: 'string', example: 'SecurePassword123' },
      },
      required: ['email', 'password'],
    },
  })
  async login(@Body() LoginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = LoginDto;
    return this.authService.login(email, password);
  }

  @Public()
  @Post('register')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstname: { type: 'string', example: 'John' },
        lastname: { type: 'string', example: 'Doe' },
        email: { type: 'string', example: 'john.doe@example.com' },
        password: { type: 'string', example: 'SecurePassword123' },
      },
      required: ['firstname', 'lastname', 'email', 'password'],
    },
  })
  async register(@Body() RegisterDto: RegisterDto): Promise<RegisterResponse> {
    const { firstname, lastname, email, password } = RegisterDto;
    return this.authService.register(firstname, lastname, email, password);
  }

  // Note: Demo how guard can be used:
  // @UseGuards(AuthGuard) # No need to use this line since Guard is applied gloablly
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @Get('greet')
  greet(): string {
    return this.authService.greet();
  }

  //Oauth below:
  @Public()
  @UseGuards(GoogleGuard)
  @Get('google')
  async googleLogin() {
    return;
  }

  @Public()
  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleLoginCallback() {}
}
