import { Agent } from 'node:http';

import { connectTestDb, createAndSetupDb, runMigrations, tearDownDb } from '@tests/helpers/testDbSetup';
import axios from 'axios';

axios.defaults.httpAgent = new Agent({ keepAlive: false }); // axios setup to avoid socket hangup error

beforeAll(async () => {
  await createAndSetupDb();
  runMigrations();
  await connectTestDb();
}, 60000); // leave some time to build the containers

afterAll(async () => {
  await tearDownDb();
});
