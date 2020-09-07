import { getRepository, Repository, Like } from 'typeorm';
import { v4 } from 'uuid';

import IEvaluatorsRepository from '@modules/evaluators/repositories/IEvaluatorsRepository';

import ICreateEvaluatorDTO from '@modules/evaluators/dtos/ICreateOrUpdateEvaluatorDTO';

import Evaluator from '../entities/Evaluator';

class EvaluatorsRepository implements IEvaluatorsRepository {
  private ormRepository: Repository<Evaluator>;

  constructor() {
    this.ormRepository = getRepository(Evaluator);
  }

  public async findAllEvaluators(
    search: string,
    page: number,
  ): Promise<Evaluator[]> {
    const evaluators =
      search !== ''
        ? await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
            where: {
              name: Like(`%${search}%`),
            },
          })
        : await this.ormRepository.find({
            skip: (page - 1) * 10,
            take: 10,
          });

    return evaluators;
  }

  public async findById(id: string): Promise<Evaluator | undefined> {
    const findEvaluator = await this.ormRepository.findOne(id);

    return findEvaluator;
  }

  public async findByCpf(cpf: string): Promise<Evaluator | undefined> {
    const findEvaluator = await this.ormRepository.findOne({
      where: { cpf },
    });

    return findEvaluator;
  }

  public async create(evaluatorData: ICreateEvaluatorDTO): Promise<Evaluator> {
    const evaluator = this.ormRepository.create(evaluatorData);

    Object.assign(evaluator, { id: v4() });

    await this.ormRepository.save(evaluator);

    return evaluator;
  }

  public async save(evaluator: Evaluator): Promise<Evaluator> {
    return this.ormRepository.save(evaluator);
  }

  public async remove(evaluator: Evaluator): Promise<void> {
    await this.ormRepository.remove(evaluator);
  }
}

export default EvaluatorsRepository;
