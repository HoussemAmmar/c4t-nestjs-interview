import { plainToClass } from 'class-transformer';
import { validateSync, IsDefined } from 'class-validator';

class EnvironmentVariables {
  @IsDefined()
  MONGO_URL;

  @IsDefined()
  DEFAULT_PORT;

  @IsDefined()
  JWT_ACCESS_TOKEN_SECRET;

  @IsDefined()
  JWT_ACCESS_TOKEN_EXPIRATION_TIME;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipNullProperties: false,
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
