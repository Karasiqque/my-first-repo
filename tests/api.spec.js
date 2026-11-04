import { test, expect } from '@playwright/test';
const baseurl = "https://restful-booker.herokuapp.com";
let bookingId;
let token;
const postData = {
  firstname: "Egor",
  lastname: "Karas",
  totalprice: 15022,
  depositpaid: true,
  bookingdates: {
    checkin: "2006-12-12",
    checkout: "2026-11-15"
  },
  additionalneeds: "Breakfast"
};
const newData = {
      firstname: "Egoor", 
      lastname: "Karas",
      totalprice: 1,     
      depositpaid: true,
      bookingdates: {
        checkin: "2006-12-12",
        checkout: "2026-11-15"
      },
      additionalneeds: "Breakfast"
    };

test.describe.serial('тест API', () => {
  test('должна появиться новая бронь', async ({ request }) => {
    const response = await request.post(`${baseurl}/booking`, { data: postData });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('bookingid');

    bookingId = body.bookingid;
    expect(body.booking).toMatchObject(postData);
  });

  test('должна вернуться информации о брони по id', async ({ request }) => {
    const response = await request.get(`${baseurl}/booking/${bookingId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject(postData);
  });

  test('должна обновиться информации внутри брони', async ({ request }) => {
    const auth = await request.post(`${baseurl}/auth`, {
      data: {
        username: "admin",
        password: "password123"
      }
    });
    const authBody = await auth.json();
    token = authBody.token;
    expect(token).toBeDefined();

    const response = await request.put(`${baseurl}/booking/${bookingId}`, {
      headers: {'Cookie': `token=${token}`},
      data: newData
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject(newData);
  });

  test('должна удалиться выбранная бронь', async ({ request }) => {
    const response = await request.delete(`${baseurl}/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${token}`
      }
    });
    expect(response.status()).toBe(201);

    const get = await request.get(`${baseurl}/booking/${bookingId}`);
    expect(get.status()).toBe(404);
  });
});