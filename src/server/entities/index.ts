import { AppSettings, AppSettingsSchema } from './app-settings.entity';
import { User, UserSchema } from './user.entity';
import { AuthUser, AuthUserSchema } from './auth-user.entity';
import { SMSRequests, SMSRequestsSchema } from './sms-requests.entity';
import { EmailRequests, EmailRequestsSchema } from './email-requests.entity';
import { TestData, TestDataSchema } from './test-data.entity';

export * from './test-data.entity';
export * from './app-settings.entity';
export * from './user.entity';
export * from './auth-user.entity';
export * from './sms-requests.entity';
export * from './email-requests.entity';

export const entities = [
  {
    name: TestData.name,
    schema: TestDataSchema,
  },
  {
    name: AppSettings.name,
    schema: AppSettingsSchema,
  },
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: AuthUser.name,
    schema: AuthUserSchema,
  },
  {
    name: SMSRequests.name,
    schema: SMSRequestsSchema,
  },
  {
    name: EmailRequests.name,
    schema: EmailRequestsSchema,
  },
];
