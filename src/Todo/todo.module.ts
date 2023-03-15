import { MailerModule } from "@nestjs-modules/mailer";
import { CacheModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "src/Entity/todo.entity";
import { User } from "src/Entity/user.entity";
import { SigninController } from "./signin/signin.controller";
import { SigninService } from "./signin/signin.service";
import { SignupController } from "./signup/signup.controller";
import { SignupService } from "./signup/signup.service";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
require("dotenv").config();
const config = process.env 
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: config.MYSQL_HOST,
            port: 3306,
            username: '',
            password: '',
            database: '',
            entities: [User, Todo],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Todo]),
        MailerModule.forRoot({
            transport: {
                host: '',
                port: 587,
                secure: false,
                auth: {
                    user: '',
                    pass: ''
                }
            }
        }),
        CacheModule.register(),
        JwtModule.register({
            secret: 'secretKey',
            signOptions:{
                expiresIn: '1h'
            }
        })
    ],
    controllers: [ SignupController, SigninController, TodoController],
    providers: [ SignupService, SigninService, TodoService],
})
export class TodoModule {};
