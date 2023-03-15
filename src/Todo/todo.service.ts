import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "src/Entity/todo.entity";
import { Repository } from "typeorm";

@Injectable()
export class TodoService {
    constructor(
      @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
      private readonly jwtService: JwtService,
    ) {}
    async addTodo(todo, access) {
      var idTodo = ((Math.random()*10000000).toFixed(0)).toString();
      let token =  access.authorization
      let accessToken = token.split(' ')[1]

      let result = await this.jwtService.verify(accessToken)
      
      this.todoRepository.save({
        idTodo: idTodo,
        nameTodo: todo.nameTodo,
        levelTodo: todo.levelTodo,
        userId: result.userId,
        isCompleted: false,
      })
      return [todo, access, result]
      
    }
    async getTodoFromNameToDo(access, body) {
      let accessToken =  access.authorization
      accessToken = accessToken.split(' ')[1]
      let result = await this.jwtService.verify(accessToken)
      return this.todoRepository.find({
        where: {
          nameTodo: body.nameTodo,
          userId: result.userId
        }
      })
      
    }
    async getTodoFromIdTodo(access, body) {
      let accessToken =  access.authorization
      accessToken = accessToken.split(' ')[1]
      let result = await this.jwtService.verify(accessToken)
      return this.todoRepository.find({
        where: {
          idTodo: body.idTodo,
        }
      })
      
    }
    async getTodoFromUserId(access) {
      let accessToken =  access.authorization
      accessToken = accessToken.split(' ')[1]
      let result = await this.jwtService.verify(accessToken)
      console.log(result);
      
      return {
        data: await this.todoRepository.find({
          where: {
            userId: result.userId,
          }
        }),
        infor: result
      }
    }
    async getTodoFromIsComplated(access, body) {
      let accessToken =  access.authorization
      accessToken = accessToken.split(' ')[1]
      let result = await this.jwtService.verify(accessToken)
      return this.todoRepository.find({
        where: {
          isCompleted: body.isComplated, 
          userId: result.userId
        }
      })
      
    }
    async getTodoFromLevelTodo(access, body) {
      let accessToken =  access.authorization
      accessToken = accessToken.split(' ')[1]
      let result = await this.jwtService.verify(accessToken)
      return this.todoRepository.find({
        where:{ 
          userId: result.userId,
          levelTodo:  body.levelTodo
        }
        
      })
      
    }
    async updateTodo(todo,  access) {
      let accessToken =  access.authorization
      accessToken = accessToken.split(' ')[1]
      let result = await this.jwtService.verify(accessToken)
      return this.todoRepository.update(todo.todoId, {isCompleted: true})
    }
}