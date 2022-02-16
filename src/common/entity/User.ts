import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
