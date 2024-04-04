import { CreateCoursesTable1712244542866 } from 'src/migrations/1712244542866-CreateCoursesTable';
import { dataSourceOptions } from './database.module';
import { DataSource } from "typeorm";
import { CreateTagsTable1712246021569 } from 'src/migrations/1712246021569-CreateTagsTable';

export const dataSource = new DataSource({
	...dataSourceOptions,
	synchronize: false,
	migrations: [
		CreateCoursesTable1712244542866,
		CreateTagsTable1712246021569
	]
})

