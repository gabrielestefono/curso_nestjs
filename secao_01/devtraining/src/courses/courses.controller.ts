import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
	constructor(private readonly courseService: CoursesService){}
	@Get()
	findAll(@Res() response){
		this.courseService
		return response.status(200).json({message: 'Lista de cursos'});
	}

	@Get(':id/:name')
	findOne(@Param('id') id: string, @Param('name') name: string){
		return `Curso com ID ${id} e nome ${name}`;
	}

	@Post()
	create(@Body() body){
		return body;
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() body){
		console.log(body);
		return `Curso com ID ${id} atualizado com sucesso!`;
	}

	@Put(':id')
	updateAll(@Param('id') id: string, @Body() body){
		console.log(body);
		return `Curso com ID ${id} atualizado com sucesso!`;
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	remove(@Param('id') id: string){
		return `Curso com ID ${id} deletado com sucesso!`;
	}
}
