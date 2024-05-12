import {
  Controller,
  Inject
} from '@nestjs/common';
import { AuthServiceInterface } from './interface/auth.service.interface';

@Controller('')
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
  ) {}

  
}
