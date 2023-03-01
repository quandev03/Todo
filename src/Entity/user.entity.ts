import { Column, Entity, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: string;

    @Column()
    userName: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    isActivated: boolean|null;

    @Column()
    codeVerify: string|null;
}