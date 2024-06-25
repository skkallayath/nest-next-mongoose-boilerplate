import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { CrudListOptions, CrudModelService } from '../crud';
import { TestData } from '../entities';

@Injectable()
export class TestDataService {
  private testDataModelService: CrudModelService<TestData>;
  constructor(
    @InjectModel(TestData.name)
    applicationModel: Model<TestData>,
  ) {
    this.testDataModelService = new CrudModelService(applicationModel);
  }

  async getList(
    filters: FilterQuery<TestData>,
    options?: CrudListOptions,
  ): Promise<TestData[]> {
    return await this.testDataModelService.getList(filters, options);
  }

  async findById(id: Types.ObjectId) {
    return this.testDataModelService.findById(id);
  }

  async getCount(filters: FilterQuery<TestData>): Promise<number> {
    return this.testDataModelService.getCount(filters);
  }

  public async create(testData: TestData): Promise<TestData> {
    return this.testDataModelService.create(testData);
  }

  public async updateById(
    id: Types.ObjectId,
    data: Partial<TestData>,
  ): Promise<TestData> {
    const testData = await this.testDataModelService.findById(id);

    if (!testData) {
      throw new NotFoundException('Application not found');
    }

    await this.testDataModelService.updateOne({ _id: id }, { $set: data });

    return {
      ...testData,
      ...data,
    };
  }

  public async updateOne(
    filters: FilterQuery<TestData>,
    update: UpdateQuery<TestData>,
    options?: QueryOptions,
  ) {
    return this.testDataModelService.updateOne(filters, update, options);
  }

  public async deleteById(id: Types.ObjectId): Promise<TestData> {
    const testData = await this.testDataModelService.findById(id);

    if (!testData) {
      throw new NotFoundException('Application not found');
    }
    await this.testDataModelService.deleteOne({ _id: id });

    return testData;
  }

  public async createOrUpdate(application: TestData): Promise<TestData> {
    const existing = await this.testDataModelService.findOne({
      name: application.name,
    });
    if (!existing) {
      return this.testDataModelService.create(application);
    }
    return this.updateById(existing._id, application);
  }

  public async deleteMany(filters: FilterQuery<TestData>) {
    await this.testDataModelService.deleteMany(filters);
  }
}
