import { MailerService } from "@nestjs-modules/mailer";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { error } from "console";
import { nanoid } from "nanoid";
import { UserDto } from "src/Dto/user.dto";
import { User } from "src/Entity/user.entity";
import { Repository } from "typeorm";
const md5 = require("md5");
@Injectable()
export class SignupService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>, 
        private readonly mailerSecvive: MailerService,
				@Inject(CACHE_MANAGER) private readonly signincache: Cache,
				private readonly jwtService: JwtService,
        ) {}
        async signup(user: UserDto) {
          let password = md5(user.password);
        	let codeVerify= (Math.random()*10000).toFixed()
					let codeVerifyCofig = md5(codeVerify);
        	let userId = (Math.random()*10000000).toFixed()
					let checkIn = await this.userRepository.find({
						where: {
							userName: user.username
						}
					})
					let checkIn2 = await this.userRepository.find({
						where: {
							email : user.mail
						}
					})
					if(checkIn[0]===undefined&&checkIn2[0]===undefined){
						
						this.userRepository.save({
							userId: userId,
							userName: user.username,
							email: user.mail,
							password: password,
							isActivated: false,
							codeVerify: codeVerifyCofig,
						})
						this.mailerSecvive.sendMail({
							to: user.mail,
							subject: `Welcome to ${user.username}`,
							text: `Your code verify is ${codeVerify}`,
					})
					return {Notification: 'a message send to your email, please check your inbox and verify your account'}
					}else{
						return {Notification: 'email already exists'}
					}
				}
				async verifyAccount(verifyCode) {
					 let verifyCodeFrom = md5(verifyCode.codeVerifyBody);
					 let bd=  await this.userRepository.findOne({
						select: ['codeVerify', 'userId' ],
						where: {
							userName: verifyCode.username,
						}
					 })
					 if(bd.codeVerify===verifyCodeFrom){
						bd.isActivated = true;
						this.userRepository.update(bd.userId, {isActivated: bd.isActivated})
						this.userRepository.update(bd.userId, {codeVerify: ''})

						return {
							Notification: "verify success"
						}
					}else{
						return {
							Notification: "error"
						};
					}
					return bd
				}
				async forwaitGetVerify(user){
					let createCodeVerify= (Math.random()*10000).toFixed()
					let codeVerifyCofig = md5(createCodeVerify);
					let userId = await this.userRepository.findOne({
						select: ['userId'],
						where: {
							userName: user.userName,
						}
					})
					
					
					this.userRepository.update(userId.userId, {
						codeVerify: codeVerifyCofig,
					})

					return this.mailerSecvive.sendMail({
						to: user.mail,
						subject: `Welcome to ${user.userName}`,
						text: `Your code verify is ${createCodeVerify}`,
					})
				}
				async resetPassword(body) {
					let informationUSer = await this.userRepository.findOne({
						where: {
							codeVerify: md5(body.verifyCode)
						}
					})
					return this.jwtService.sign({
						userId: informationUSer.userId,
					})
				}
				async changePassword(body, access) {
					let accessToken =  access.authorization.split(' ')[1]
					let userId = this.jwtService.verify(accessToken).userId
					return this.userRepository.update(userId,{password: md5(body.password)})
				}
				


				
}