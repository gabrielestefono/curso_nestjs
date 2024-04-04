import { CreateCoursesTable1712244542866 } from 'src/migrations/1712244542866-CreateCoursesTable';
import { dataSourceOptions } from './database.module';
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
	...dataSourceOptions,
	synchronize: false,
	migrations: [
		CreateCoursesTable1712244542866
	]
})

