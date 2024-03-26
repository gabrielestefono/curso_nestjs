import { Body, Controller, Get, /*HttpCode,*/ Param, Post, Res } from '@nestjs/common';
import { response } from 'express';

@Controller('courses')
export class CoursesController {
	@Get()
	findAll(@Res() response){
		return response.status(200).json({message: 'Lista de cursos'});
	}

	@Get(':id/:name')
	findOne(@Param('id') id: string, @Param('name') name: string){
		return `Curso com ID ${id} e nome ${name}`;
	}

	// @HttpCode(204)
	@Post()
	create(@Body() body){
		return body;
	}
}
