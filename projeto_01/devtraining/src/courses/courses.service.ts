import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {

	constructor(
		@InjectRepository(Course)
		private readonly courseRepository: Repository<Course>
	){}

	async findAll(){
		return await this.courseRepository.find();
	}

	async findOne(id: number){
		const course =  await this.courseRepository.findOne({
			where: { id }
		})
		if(!course){
			throw new NotFoundException(`Curso ID: ${id} não encontrado`);
		}
		return course;
	}

	async create(createCourseDto: any){
		const course: Course[] = this.courseRepository.create(createCourseDto)
		return await this.courseRepository.save(course);
	}

	async update(id: number, updateCourseDTO: any){
		const course = await this.courseRepository.preload({
			...updateCourseDTO,
			id,
		})
		if(!course){
			throw new NotFoundException(`Curso de ID ${id} não encontrado!`);
		}
		return this.courseRepository.save(course);
	}

	async remove(id: number){
		const course = await this.courseRepository.findOne({
			where: { id }
		})
		if(!course){
			throw new NotFoundException(`Curso de ID ${id} não encontrado!`);
		}
		return this.courseRepository.remove(course);
	}
}