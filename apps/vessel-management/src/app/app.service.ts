import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VesselEntity } from './vessel.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(VesselEntity)
    private readonly vesselRepository: Repository<VesselEntity>
  ) {}

  async getDataVessel(page: number, limit: number, vslCd: string) {
    const [vesselData, total] = await this.vesselRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: {
        vslCd: Like(`%${vslCd}%`),
      },
    });

    return { data: vesselData, total };
  }
}
