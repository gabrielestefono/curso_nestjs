import { AuthGuard } from '@nestjs/passport';
import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService){}
	
	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	public async signup(@Body() signUpDTO: SignUpDTO): Promise<User>
	{
		return this.usersService.signUp(signUpDTO);
	}

	@Post('signin')
	@HttpCode(HttpStatus.OK)
	public async signin(@Body() signInDTO: SignInDTO): Promise<{name: string, jwtToken: string, email: string}>
	{
		return this.usersService.signIn(signInDTO);
	}

	@Get()
	@UseGuards(AuthGuard('jwt'))
	public findAll(): Promise<User[]>
	{
	 	return this.usersService.findAll();
	}
}
