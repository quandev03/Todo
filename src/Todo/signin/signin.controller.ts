import { Body, Controller, Get, Inject, Post, Req, Res, Headers } from "@nestjs/common";
import { Loginterface } from "src/Dto/login.dto";
import { SigninService } from "./signin.service";

@Controller('signin')
export class SigninController {
  constructor(
    private readonly signinService: SigninService,

  ){}
    @Post()
    signin(@Body() data: Loginterface): any{
      return this.signinService.signin(data);
    }
    @Post('logout')
    async logout(@Headers() access: string){
      return this.signinService.logout(access);
    }
}
