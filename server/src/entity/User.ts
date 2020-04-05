import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { Activity } from "./Activity";

@Entity({ name: "users" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    college: string;

    @OneToMany(type => Activity, activity => activity.creator, { nullable: true })
    activities: Activity[];

    @CreateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    updatedAt: Date;
}