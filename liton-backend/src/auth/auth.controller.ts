import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private clientsService: ClientsService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    const token = this.authService.login(user);

    (res as any).cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { message: 'Login successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    (res as any).clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return { message: 'Logout successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('create')
  async create(@Body() clientData: Partial<Client>): Promise<Client> {
    return await this.clientsService.create(clientData);
  }
}
