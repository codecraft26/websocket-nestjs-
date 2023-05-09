import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

 





  async validateUser(username: string, password: string) {
    // Grab the user and validate its password.
    const user = await this.usersService.findUser(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async verifyJwtToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  async generateJwt(user: any) {
    const payload = { ...user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}