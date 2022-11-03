import * as crypto from 'crypto';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { EnvironmentEnum } from './enums/environment.enum';

@Injectable()
export class CommonService {
  static basicInit() {
    const environment: string =
      process.env.NODE_ENV! in EnvironmentEnum ? process.env.NODE_ENV! : EnvironmentEnum.production;

    dotenv.config({
      path: path.resolve(__dirname, '..', '..', '..', `.env.${environment}`),
    });
  }

  static generateRandomString(length: number = 64): string {
    if (typeof length !== 'number') {
      length = 64;
    } else {
      length = parseInt(length as any);
    }

    if (length <= 0) {
      length = 64;
    }

    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }

  static generateRandomNumber(length: number = 6): string {
    if (typeof length !== 'number') {
      length = 6;
    } else {
      length = parseInt(length as any);
    }

    if (length <= 0) {
      length = 6;
    }

    return Math.floor(Math.random() * 10 ** length)
      .toString()
      .padStart(length, '0');
  }

  static cleanPhone(phone: string): string {
    return String(phone).valueOf().trim().replace(/\D/g, '');
  }

  static delay(pause: number = 1000): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, pause);
    });
  }

  static prepareNumber(value: any): number | null {
    if (value === null || value === undefined || (typeof value === 'string' && !value.trim())) {
      return null;
    }

    value = Number(value).valueOf();

    return Object.is(value, NaN) ? null : value;
  }

  static prepareString(value: any): string | null {
    if (value === null || value === undefined || Object.is(value, NaN)) {
      return null;
    }

    return String(value).valueOf().trim();
  }
}
