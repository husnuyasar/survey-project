import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';

require('dotenv').config();
/**
 * No need
 */
class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'dev';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    console.log(__dirname + '\..\entities\*.ts')
    console.log(this.getValue('DB_HOST'))
    console.log(parseInt(this.getValue('DB_PORT')))
    console.log(this.getValue('DB_USERNAME'))
    console.log("------------------------------")
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      logging: true,
      
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // synchronize: false, 
      
      
      //ssl: this.isProduction(),
    };
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE'
  ]);

export { configService };