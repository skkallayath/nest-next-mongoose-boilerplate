import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { IsStringObjectId, ObjectIdTransform } from '../utils/validators';

export class TestDataIdQueryDto {
  @ApiProperty({ type: String, required: false })
  @IsDefined()
  @Transform(ObjectIdTransform)
  @IsStringObjectId()
  testDataId: Types.ObjectId;
}

export class CreateTestDataDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;
}