import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import escapeStringRegexp from 'escape-string-regexp';
import { FilterQuery } from 'mongoose';
import { JwtAuthGuard } from '../auth';
import { TestData } from '../entities';
import { TestDataService } from '../services/test-data.service';
import {
  ApiResponse,
  getPaginatedCounts,
  getPagination,
  PaginatedApiResponse,
  ParamsIdRequest,
  SearchWithPaginationRequestViewModel,
} from '../utils';
import { CreateTestDataDto } from '../view-models';

@Controller('api/test-data')
export class TestDataController {
  @Inject() private testDataService: TestDataService;

  @Get()
  public async getList(
    @Query() query: SearchWithPaginationRequestViewModel,
  ): Promise<PaginatedApiResponse<TestData>> {
    const filters: FilterQuery<TestData> = {};
    if (query.query) {
      filters.$or = [
        {
          name: {
            $regex: escapeStringRegexp(query.query),
            $options: 'si',
          },
        },
      ];
    }

    const pagination = getPagination(query);

    const [count, list] = await Promise.all([
      this.testDataService.getCount(filters),
      this.testDataService.getList(filters, { pagination }),
    ]);

    return {
      status: HttpStatus.OK,
      data: list,
      ...getPaginatedCounts(count, pagination),
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(
    @Body() data: CreateTestDataDto,
  ): Promise<ApiResponse<TestData>> {
    const testData = await this.testDataService.create(data);
    return { data: testData, status: HttpStatus.OK };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public async update(
    @Param() params: ParamsIdRequest,
    @Body() data: CreateTestDataDto,
  ): Promise<ApiResponse<TestData>> {
    const testData = await this.testDataService.updateById(params.id, data);
    return { data: testData, status: HttpStatus.OK };
  }

  @Get(':id')
  public async read(
    @Param() params: ParamsIdRequest,
  ): Promise<ApiResponse<TestData>> {
    const testData = await this.testDataService.findById(params.id);
    return { data: testData, status: HttpStatus.OK };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(
    @Param() params: ParamsIdRequest,
  ): Promise<ApiResponse<TestData>> {
    const testData = await this.testDataService.deleteById(params.id);

    return { data: testData, status: HttpStatus.OK };
  }
}
