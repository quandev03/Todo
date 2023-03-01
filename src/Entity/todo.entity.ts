import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  idTodo: string;

  @Column()
  userId: string;

  @Column()
  nameTodo: string;
  
  @Column()
  levelTodo: string;

  @Column()
  isCompleted: boolean;
}