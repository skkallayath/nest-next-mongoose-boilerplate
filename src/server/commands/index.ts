import { LoadAppSettingsCommand } from './app-settings.command';
import { CreateSuperUserCommand } from './superuser.command';
import { TestSendMailCommand } from './test-send-mail.command';

export const commands = [
  LoadAppSettingsCommand,
  CreateSuperUserCommand,
  TestSendMailCommand,
];
