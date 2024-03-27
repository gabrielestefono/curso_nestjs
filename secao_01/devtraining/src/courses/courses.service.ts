import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CoursesService {
	private courses = [
		{
			id: 1,
			name: 'Curso de NestJS',
			description: 'Curso de NestJS com GraphQL',
			tags: ['NodeJS', 'GraphQL']
		},
		{
			id: 2,
			name: 'Curso de React',
			description: 'Curso de React com Redux',
			tags: ['React', 'Redux']
		},
		{
			id: 3,
			name: 'Curso de Angular',
			description: 'Curso de Angular com RxJS',
			tags: ['Angular', 'RxJS']
		}
	]

	findAll(){
		return this.courses;
	}

	findOne(id: number){
		const course =  this.courses.find(course => course.id === id);
		if(!course){
			throw new NotFoundException(`Curso ID: ${id} não encontrado`);
		}
		return course;
	}

	create(createCourseDto: any){
		this.courses.push(createCourseDto);
		return createCourseDto;
	}

	update(id: number, updateCourseDTO: any){
		const existingCourse = this.findOne(id);
		if(existingCourse as any){
			const index = this.courses.findIndex(course => course.id === id);
			this.courses[index] = {
				id,
				...updateCourseDTO
			};
			return this.courses[index];
		}
		return `Curso com ID ${id} não encontrado!`;
	}

	remove(id: number){
		const index = this.courses.findIndex(course => course.id === id);
		if(index >= 0){
			this.courses.splice(index, 1);
		}
	}
}
