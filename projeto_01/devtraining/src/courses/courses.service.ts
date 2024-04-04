import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {

	constructor(
		@InjectRepository(Course)
		private readonly courseRepository: Repository<Course>,
		@InjectRepository(Tag)
		private readonly TagRepository: Repository<Tag>
	){}

	async findAll(){
		return await this.courseRepository.find({
			relations: ['tags']
		});
	}

	async findOne(id: number){
		const course =  await this.courseRepository.findOne({
			where: { id },
			relations: ['tags']
		})
		if(!course){
			throw new NotFoundException(`Curso ID: ${id} não encontrado`);
		}
		return course;
	}

	async create(createCourseDto: CreateCourseDTO){
		const tags = await Promise.all(
			createCourseDto.tags.map(name => this.preloadTagByName(name)),
		);

		const course = this.courseRepository.create({
			...createCourseDto,
			tags
		});
		return await this.courseRepository.save(course);
	}

	async update(id: number, updateCourseDTO: UpdateCourseDTO){

		const tags = updateCourseDTO.tags && await Promise.all(
			updateCourseDTO.tags.map(name => this.preloadTagByName(name)),
		);

		const course = await this.courseRepository.preload({
			...updateCourseDTO,
			id,
			tags,
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

	private async preloadTagByName(nome: string): Promise<Tag>
	{
		const tag = await this.TagRepository.findOne({where: {nome}})
		if(tag != null){
			return tag;
		}
		return this.TagRepository.create({nome})
	}
}
