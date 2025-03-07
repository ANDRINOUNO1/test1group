import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../helpers/role';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;
 
    @Column()
    password!: string;

    @Column({ nullable: true })
    title?: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role!: Role;
}

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    phoneNumber!: string;

    @Column()
    address!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;
}
