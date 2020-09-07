import Avaliation from '../infra/typeorm/entities/Avaliation';

import ICreateAvaliationDTO from '../dtos/ICreateOrUpdateAvaliationDTO';

export default interface IAvaliationsRepository {
  findAllAvaliationsByEvaluatorId(evaluator_id: string): Promise<Avaliation[]>;
  findById(id: string): Promise<Avaliation | undefined>;
  create(data: ICreateAvaliationDTO): Promise<Avaliation>;
  save(avaliation: Avaliation): Promise<Avaliation>;
  remove(avaliation: Avaliation): Promise<void>;
}
