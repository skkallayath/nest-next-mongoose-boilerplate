import { Schema } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Types } from "mongoose";

@Schema()
export class BaseEntity {
    @Exclude()
    _id?: Types.ObjectId;

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;
}