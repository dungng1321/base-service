import { AuthServiceInterface } from '@components/auth/interface/auth.service.interface';
import { UserRepositoryInterface } from '@components/user/interface/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor() {}
}
