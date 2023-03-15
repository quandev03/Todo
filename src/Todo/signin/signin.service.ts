import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Loginterface } from "src/Dto/login.dto";
import { User } from "src/Entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class SigninService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ){}
  async signin(data: Loginterface,): Promise<{}> {{
    const md5 = require('md5');
    let password = md5(data.password)
    let database = await this.userRepository.findOne({
      select: ["userName", "password", "isActivated", "userId"],
      where: {
        userName: data.username,
      }
    })
    if(database.password===password && database.isActivated==true){
      let accessToken = await this.jwtService.sign({
        userId: database.userId,
        userName: database.userName,
      },)
      return { accessToken : accessToken}
    }else if(database.password===password && database.isActivated==false){
      return {Notification: "your account is not activated"}
    }else{
      return {Notification: "your password is not correct"}
    }
    
  }
  }
  async logout(access){
    return this.jwtService.decode(access.authorization.split(' ')[1])
  }
}