
import{test,expect} from '@playwright/test';

test('GET [all object] API test', async ({request}) => { 
    const response = await request.get('https://api.restful-api.dev/objects/7');
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Complete response body:', responseBody);

    expect(responseBody).toHaveProperty('id', '7');
    expect(responseBody).toHaveProperty('name', 'Apple MacBook Pro 16');

    const textResponse = await response.text(); // Consume the response body to prevent memory leaks
    expect(textResponse).toContain('Apple MacBook Pro 16');
});

test('POST [add object] API test', async ({request}) => {
    const payload = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        data: {
                year: 2006,
                price: 1000.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
    };
    const response = await request.post('https://api.restful-api.dev/objects', {
        data: payload
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('POST response body:', responseBody);
    expect(responseBody).toHaveProperty('name', payload.name);
});



test('update using PUT [update object] API test', async ({request}) => {

    const createPayload = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        data: {
                year: 2006,
                price: 1000.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
    };
    const createResponse = await request.post('https://api.restful-api.dev/objects', {
        data: createPayload
    });
    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    console.log('POST response body:', createBody);

    const updatePayload = {
        ...createPayload,
        data: {
            ...createPayload.data,
            color: 'Black'
        }
    };
    const updateResponse = await request.put(`https://api.restful-api.dev/objects/${createBody.id}`, {
        data: updatePayload
    });

    expect(updateResponse.status()).toBe(200);
    const responseBody = await updateResponse.json();
    console.log('PUT response body:', responseBody);
    expect(responseBody).toHaveProperty('id', createBody.id);
    expect(responseBody.data).toHaveProperty('color', updatePayload.data.color);
});



