import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      database: this.config.get<string>('DATABASE_NAME'),
      entities: ['dist/**/*.entity.ts'],
      host: this.config.get<string>('DATABASE_HOST'),
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsTableName: this.config.get<string>(
        'DATABASE_MIGRATION_TABLE_NAME',
      ),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      port: this.config.get<number>('DATABASE_PORT'),
      username: this.config.get<string>('DATABASE_USERNAME'),
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: false,
      // @ts-ignore
      type: this.config.get<string>('DATABASE_TYPE'),
    };
  }
}