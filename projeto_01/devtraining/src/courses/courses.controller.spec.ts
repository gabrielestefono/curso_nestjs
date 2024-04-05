import { CoursesController } from './courses.controller';

describe('Controller de Cursos - Testes unitários', () => {
  let controller: CoursesController;
  beforeEach(async () => {
    controller = new CoursesController();
  });

	it('Controller', ()=>{
    expect(controller).toBeDefined()
  })
});
