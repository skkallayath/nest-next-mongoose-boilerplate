import { CacheService } from '../cache';
import { ApiConfigService } from '../config';
import { AppSettingsService } from '../services/app-settings.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { EmailService } from '../services/email.service';
import { SmsService } from '../services/sms.service';
import { TestDataService } from '../services/test-data.service';

export const services = [
  ApiConfigService,
  CacheService,
  AppSettingsService,
  AuthService,
  UserService,
  EmailService,
  SmsService,
  TestDataService,
];
