import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import mongoose from 'mongoose';

@ValidatorConstraint({ name: 'IsStringObjectIdConstraint', async: false })
export class IsStringObjectIdConstraint
  implements ValidatorConstraintInterface
{
  validate(text: string): boolean {
    return !!text && mongoose.isValidObjectId(text);
  }

  defaultMessage() {
    return '$value is not a valid ObjectId';
  }
}

export const IsStringObjectId = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsStringObjectId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsStringObjectIdConstraint,
    });
  };
};
