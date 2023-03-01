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
    async addTodo(todo, req, access) {
      var idTodo = ((Math.random()*10000000).toFixed(0)).toString();
      let accessToken =  access.authorization
      accessToken = accessToken.split(' ')[1]
      
      // let accessToken=  acc
      
      let result = await this.jwtService.verify(accessToken)
      console.log(result.userId);
      
      this.todoRepository.save({
        idTodo: idTodo,
        nameTodo: todo.nameTodo,
        levelTodo: todo.levelTodo,
        userId: result.userId,
        isCompleted: false,
      })
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
    async getTodoFromUserId(access, body) {
      let accessToken =  access.authorization
      accessToken = accessToken.split(' ')[1]
      let result = await this.jwtService.verify(accessToken)
      return this.todoRepository.find({
        where: {
          userId: result.userId,
        }
      })
      
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
      return this.todoRepository.update(todo.idTodo, {isCompleted: true})
    }
}