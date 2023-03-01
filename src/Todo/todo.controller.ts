import { Body, Controller, Get, Header, Headers, Post, Put, Req } from "@nestjs/common";
import { TodoJob } from "src/Dto/todo.dto";
import { TodoService } from "./todo.service";

@Controller('home')
export class TodoController {
  constructor(
    private readonly todoService: TodoService
  ){}
  @Post('addtodo')
  async addTodo(@Body() todo: TodoJob, @Req() req: Request, @Headers() access: string  ){
  return await this.todoService.addTodo(todo, req, access);
  }
  @Get('gettodofromidtodo')
  async getTodoFromIdTodo(@Headers() access: string, @Body() body: TodoJob){
    return this.todoService.getTodoFromIdTodo(access, body)
  }
  @Get('gettodofromuserid')
  async getTodoFromUserId(@Headers() access: string, @Body() body: TodoJob){
    return this.todoService.getTodoFromUserId(access, body)
  }
  @Get('gettodofromnametodo')
  async getTodoFromNameTodo(@Headers() access: string, @Body() body: TodoJob){
    return this.todoService.getTodoFromIdTodo(access, body)
  }
  @Get('gettodofromiscomplated')
  async getTodoFromIsComplated(@Headers() access: string, @Body() body: TodoJob){
    return this.todoService.getTodoFromIsComplated(access, body)
  }
  @Get('gettodofromleveltodo')
  async getTodoFromLevelTodo(@Headers() access: string, @Body() body: TodoJob){
    return this.todoService.getTodoFromLevelTodo(access, body)
  }
  @Put('updatetodo')
  async updateTodo(@Body() todo: TodoJob, @Headers() access: string){
    return this.todoService.updateTodo(todo, access)
  }
}