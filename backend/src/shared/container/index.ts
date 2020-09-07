import { container } from 'tsyringe';

import './providers/index';
import '@modules/admins/providers/index';

import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository';
import AdminsRepository from '@modules/admins/infra/typeorm/repositories/AdminsRepository';

import IAdminTokensRepository from '@modules/admins/repositories/IAdminTokensRepository';
import AdminTokensRepository from '@modules/admins/infra/typeorm/repositories/AdminTokensRepository';

import IEvaluatorsRepository from '@modules/evaluators/repositories/IEvaluatorsRepository';
import EvaluatorsRepository from '@modules/evaluators/infra/typeorm/repositories/EvaluatorsRepository';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import QuestionsRepository from '@modules/questions/infra/typeorm/repositories/QuestionsRepository';

container.registerSingleton<IAdminsRepository>(
  'AdminsRepository',
  AdminsRepository,
);

container.registerSingleton<IAdminTokensRepository>(
  'AdminTokensRepository',
  AdminTokensRepository,
);

container.registerSingleton<IEvaluatorsRepository>(
  'EvaluatorsRepository',
  EvaluatorsRepository,
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IQuestionsRepository>(
  'QuestionsRepository',
  QuestionsRepository,
);