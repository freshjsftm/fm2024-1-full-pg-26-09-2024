const request = require('supertest');
const yup = require('yup');
const db = require('../models');
const app = require('../app');
const appRequest = request(app);

const userResponseShema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  birthday: yup.date().required(),
  isMale: yup.boolean().required(),
  avatar: yup.string().nullable(),
});

const bodyResponsePostSchema = yup.object({ data: userResponseShema });

const getUserDataSuccess = () => ({
  firstName: 'Brad',
  lastName: 'Rotitt',
  email: `rotitt_${Date.now()}@gmail.com`,
  password: 'pitt_1123',
  birthday: '1973-12-18',
  isMale: true,
});

const getUserDataError = () => ({
  firstName: true,
  lastName: 'Rotitt',
  email: `rotitt_${Date.now()}@gmail.com`,
  password: 'pitt_1123',
  birthday: '1973-12-18',
  isMale: true,
});

const user = getUserDataSuccess();

afterAll(() => {
  return db.sequelize.close();
});

describe('register', () => {
  test('user success register 201', async () => {
    const response = await appRequest.post('/users').send(user);
    expect(response.statusCode).toBe(201);
    expect(response.body.data.hasOwnProperty('password')).toBe(false);
    expect(bodyResponsePostSchema.isValidSync(response.body)).toBe(true);
  });
  test('user repeat email 409', async () => {
    const response = await appRequest.post('/users').send(user);
    expect(response.statusCode).toBe(409);
  });
  test('user empty data 400', async () => {
    const response = await appRequest.post('/users').send({});
    expect(response.statusCode).toBe(400);
  });
  test('user failed any field 400', async () => {
    const response = await appRequest.post('/users').send(getUserDataError());
    expect(response.statusCode).toBe(400);
  });
});


