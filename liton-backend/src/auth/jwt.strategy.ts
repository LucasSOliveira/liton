// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private clientsService: ClientsService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'chave_secreta',
    });
  }

  async validate(payload: any) {
    const user = await this.clientsService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuário inválido ou não encontrado');
    }
    return { id: user.id, email: user.email, name: user.name };
  }
}

function cookieExtractor(req: any): string | null {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
}
