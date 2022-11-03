import { Injectable } from '@nestjs/common';
import { QueryOptions, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseService {
  constructor(private readonly db: Sequelize) {}

  makeTransaction(): Promise<Transaction> {
    return this.db.transaction();
  }

  async checkConnection(): Promise<boolean> {
    try {
      await this.db.authenticate();
    } catch (error) {
      console.error(`Connection to DB can't be established:`, error);
      return false;
    }

    return true;
  }

  async query(queryText: string, options?: QueryOptions): Promise<any> {
    const result: any = await this.db.query(queryText, options);
    return result?.rows || result;
  }
}
