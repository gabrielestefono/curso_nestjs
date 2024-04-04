import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
	private readonly courseService: CoursesService
	
	@Get()
	findAll(){
		return this.courseService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string){
		return this.courseService.findOne(id);
	}

	@Post()
	create(@Body() createCourseDTO: CreateCourseDTO){
		return this.courseService.create(createCourseDTO);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourseDTO){
		return this.courseService.update(id, updateCourseDTO);
	}

	@Put(':id')
	updateAll(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourseDTO){
		return this.courseService.update(id, updateCourseDTO);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	remove(@Param('id') id: string){
		this.courseService.remove(id);
	}
}
