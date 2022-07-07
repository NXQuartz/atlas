/**
 * @file MikroOrm CLI configuration
 */

import 'dotenv/config';

export default {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  clientUrl: process.env.DATABASE_URL,
  type: 'postgresql',
};
