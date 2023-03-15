import { Body, Controller, Get, Post, Put, Headers } from "@nestjs/common";
import { UserDto } from "src/Dto/user.dto";
import { SignupService } from "./signup.service";

@Controller('signup')
export class SignupController {
    constructor(
        private readonly signupService: SignupService,
    ) {}
    @Post()
    async signup(@Body() body: UserDto) {
        return this.signupService.signup(body);
    }
    @Post('verify')
    async verifyAccount(@Body() verifyCode: {
        username: string,
        codeVerifyBody: string
    }) {
        return this.signupService.verifyAccount(verifyCode);
    }
    @Post('getverify')
    async getCodeVerify(@Body() user : {
        mail: string,
        userName: string
    }){
        return this.signupService.forwaitGetVerify(user);
    }
    @Post('resetpassword')
    async resetPassword(@Body() user : {verifyCode:string}) {
        return this.signupService.resetPassword(user);
    }
    @Post('changepassword')
    async changePassword(@Body() password: string, @Headers() access: string){
        return this.signupService.changePassword(password, access);
    }

}