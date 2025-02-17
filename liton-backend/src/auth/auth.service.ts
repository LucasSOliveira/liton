// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Client> {
    const user = await this.clientsService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const userData: any = { ...user };
      delete userData.password;

      return userData;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  login(user: Client) {
    const payload = { username: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
