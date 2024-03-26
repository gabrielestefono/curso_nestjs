import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
	@Get()
	findAll(){
		return 'Listagem de Cursos';
	}

	@Get(':id/:name')
	findOne(@Param('id') id: string, @Param('name') name: string){
		return `Curso com ID ${id} e nome ${name}`;
	}
}
