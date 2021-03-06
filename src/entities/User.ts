import { IsEmail, Length } from 'class-validator';
import {
	Entity as TOEntity ,
	Column,
	Index,
	BeforeInsert,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcrypt';
import {  Exclude } from 'class-transformer';

import Entity from "./Entity"
import Post from './Post';
import Vote from './Vote';

@TOEntity('users')
export default class User extends Entity {
	constructor(user: Partial<User>) {
		super();
		Object.assign(this, user);
	}

	@Index()
  @IsEmail(undefined, { message: '有効なEmailを入力してください' })
	@Length(1, 255, { message: 'Emailが空です' })
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
  
  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[];

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 6);
	}

}
