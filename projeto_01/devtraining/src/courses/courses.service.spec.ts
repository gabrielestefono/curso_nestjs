import { UpdateCourseDTO } from './dto/update-course.dto';
import { CoursesService } from './courses.service';
import { randomUUID } from 'crypto';
import { CreateCourseDTO } from './dto/create-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectedOutputTags: any;
  let expectedOutputCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();

    id = randomUUID();

    created_at = new Date();

    expectedOutputTags = [{
      id,
      name: 'nestjs',
      created_at
    }];

    expectedOutputCourses = [{
      id,
      name: 'teste',
      description: 'teste description',
      created_at,
      tags: expectedOutputTags
    }];

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectedOutputCourses)),
    }

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectedOutputTags)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectedOutputTags)),
    }

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deve criar um curso', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDto: CreateCourseDTO = {
      name: 'teste',
      description: 'teste description',
      tags: ['nestjs'],
    }

    const newCourse = await service.create(createCourseDto);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectedOutputCourses).toStrictEqual(newCourse);
  });

  it('Deve Listar Todos os Cursos', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const courses = await service.findAll();

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectedOutputCourses).toStrictEqual(courses);
  });

  it('Deve Retornar um Curso por id', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const course = await service.findOne(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectedOutputCourses).toStrictEqual(course);
  });

  it('Deve Atualizar um Curso por id', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    // @ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDTO: UpdateCourseDTO = {
      name: 'teste',
      description: 'teste description',
      tags: ['nestjs'],
    }

    const updateCourse = await service.update(id, updateCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(mockCourseRepository.preload).toHaveBeenCalled();
    expect(expectedOutputCourses).toStrictEqual(updateCourse);
  });
});
