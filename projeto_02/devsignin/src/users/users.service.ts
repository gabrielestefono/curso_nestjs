import { SignUpDTO } from './dto/signup.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { AuthService } from 'src/auth/auth.service';
import { SignInDTO } from './dto/signin.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel('User')
		private readonly usersModel: Model<User>,
		private readonly authService: AuthService,
	){}

	public async signUp(signUpDTO: SignUpDTO): Promise<User>
	{
		const user = new this.usersModel(signUpDTO);
		return await user.save();
	}

	public async signIn(signInDTO: SignInDTO): Promise<{name: string, jwtToken: string, email: string}>
	{
		const user = await this.findByEmail(signInDTO.email);
		const match = await this.checkPassword(signInDTO.password, user);
		if(!match){
			throw new NotFoundException("Invalid Credentials");
		}
		const jwtToken = await this.authService.createAccessToken(user.id);
		return {name: user.name, jwtToken: jwtToken, email: user.email};
	}

	private async findByEmail(email: string): Promise<User>
	{
		const user = await this.usersModel.findOne({email});
		if(!user){
			throw new NotFoundException('Email not found!');
		}
		return user;
	}

	private async checkPassword(password: string, user: User): Promise<boolean>
	{
		const match = await bcrypt.compare(password, user.password);
		if(!match){
			throw new NotFoundException("Password not found!");
		}
		return match;
	}

	public async findAll(): Promise<User[]>
	{
		return await this.usersModel.find();
	}
}
