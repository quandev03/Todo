import { Body, Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import { Loginterface } from "src/Dto/login.dto";
import { SigninService } from "./signin.service";

@Controller('signin')
export class SigninController {
  constructor(
    private readonly signinService: SigninService,

  ){}
    @Get()
    signin(@Body() login: Loginterface, @Req() req: Request): any{
      return this.signinService.signin(login, req);
    }
}
