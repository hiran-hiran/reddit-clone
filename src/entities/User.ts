import { IsEmail, Length, Min } from 'class-validator';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { classToPlain, Exclude } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
	constructor(user: Partial<User>) {
		super();
		Object.assign(this, user);
	}

	@Exclude()
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@IsEmail()
	@Column({ unique: true })
	email: string;

	@Index()
	@Length(3, 255, { message: 'ユーザーネームは3文字以上必要です' })
	@Column({ unique: true })
	username: string;

	@Exclude()
	@Column()
	@Length(6, 255, { message: 'パスワードは6文字以上必要です' })
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 6);
	}

	toJSON() {
		return classToPlain(this);
	}
}