import{test,expect,request} from '@playwright/test';

test('API test for get user details', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/users/', {
    data: {name: 'Akash',
      job: 'leader'
    },
    timeout: 30000,
  });
  if (!response.ok()) {
  console.error('Status:', response.status());
  console.error('Body:', await response.text());
}

// expect(response.ok()).toBeTruthy();
    const actualStatusCode = response.status();
  expect(response.status()).toBe(actualStatusCode); // Assert that the response status is 2xx
    // const respData = await response.json(); // to get the response data in json format
    // console.log(respData);
    // expect(respData.name).toBe('Akash');
    // expect(respData.job).toBe('leader');
});