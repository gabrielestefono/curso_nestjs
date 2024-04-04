import { CreateCoursesTable1712244542866 } from 'src/migrations/1712244542866-CreateCoursesTable';
import { dataSourceOptions } from './database.module';
import { DataSource } from "typeorm";
import { CreateTagsTable1712246021569 } from 'src/migrations/1712246021569-CreateTagsTable';
import { CoursesTagsTable1712254189974 } from 'src/migrations/1712254189974-CoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1712254866768 } from 'src/migrations/1712254866768-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1712256065770 } from 'src/migrations/1712256065770-AddTagsIdToCoursesTagsTable';

export const dataSource = new DataSource({
	...dataSourceOptions,
	synchronize: false,
	migrations: [
		CreateCoursesTable1712244542866,
		CreateTagsTable1712246021569,
		CoursesTagsTable1712254189974,
		AddCoursesIdToCoursesTagsTable1712254866768,
		AddTagsIdToCoursesTagsTable1712256065770
	]
})

