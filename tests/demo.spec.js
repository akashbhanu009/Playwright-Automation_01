import {test, expect} from '@playwright/test';

test('demo test', async({page}, testInfo)=>{
    console.log('Running test: ' + testInfo.title);
    expect(testInfo.title).toBe('demo test');
    console.log('Test passed: ' + testInfo.status);

    // await page.goto('https://sweetshop.netlify.app/');

    await page.goto('https://sweetshop.netlify.app/'); // to make the test fail
    testInfo.fail('Intentional failure for demonstration purposes');
    if(testInfo.status === 'failed'){
        await page.screenshot({path: `screenshots/${testInfo.title}.png`});
    }

});