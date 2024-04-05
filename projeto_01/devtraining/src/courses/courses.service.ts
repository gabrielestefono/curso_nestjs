import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { Course } from './entities/courses.entity';

@Injectable()
export class CoursesService {

	@InjectRepository(Course)
	private readonly courseRepository: Repository<Course>
	
	@InjectRepository(Tag)
	private readonly tagRepository: Repository<Tag>
	
	async findAll(){
		return await this.courseRepository.find({
			relations: ['tags']
		});
	}

	async findOne(id: string){
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

	async update(id: string, updateCourseDTO: UpdateCourseDTO){

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

	async remove(id: string){
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
		const tag = await this.tagRepository.findOne({where: {nome}})
		if(tag != null){
			return tag;
		}
		return this.tagRepository.create({nome})
	}
}
