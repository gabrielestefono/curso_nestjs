import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
	constructor(private readonly courseService: CoursesService){}
	@Get()
	findAll(){
		return this.courseService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number){
		return this.courseService.findOne(+id);
	}

	@Post()
	create(@Body() body){
		return this.courseService.create(body);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() body){
		return this.courseService.update(+id, body);
	}

	@Put(':id')
	updateAll(@Param('id') id: number, @Body() body){
		return this.courseService.update(+id, body);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	remove(@Param('id') id: number){
		this.courseService.remove(+id);
	}
}
