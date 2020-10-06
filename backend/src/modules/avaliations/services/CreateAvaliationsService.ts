import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAvaliationsRepository from '@modules/avaliations/repositories/IAvaliationsRepository';
import IEvaluatorsRepository from '@modules/evaluators/repositories/IEvaluatorsRepository';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';

import ICreateAvaliations from '../dtos/ICreateAvaliationsRequest';

import Avaliation from '../infra/typeorm/entities/Avaliation';

@injectable()
class CreateAvaliationService {
  constructor(
    @inject('AvaliationsRepository')
    private avaliationsRepository: IAvaliationsRepository,

    @inject('EvaluatorsRepository')
    private evaluatorsRepository: IEvaluatorsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    evaluator_id,
    projects,
  }: ICreateAvaliations): Promise<Avaliation[]> {
    const checkEvaluatorExists = await this.evaluatorsRepository.findById(
      evaluator_id,
    );

    if (!checkEvaluatorExists) {
      throw new AppError('Informed evaluator does not exists.');
    }

    const avaliations: Avaliation[] = [];

    for (let index = 0; index < projects.length; index += 1) {
      const checkProjectExists = await this.projectsRepository.findById(
        projects[index].project_id,
      );

      if (!checkProjectExists) {
        throw new AppError('Informed project does not exists.');
      }

      const avaliation = await this.avaliationsRepository.create({
        evaluator_id,
        project_id: projects[index].project_id,
        status: 'to_evaluate',
      });

      avaliations.push(avaliation);
    }

    return avaliations;
  }
}

export default CreateAvaliationService;