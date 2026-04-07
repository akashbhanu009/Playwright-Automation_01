import { test as base } from '@playwright/test';

exports.customTest = base.extend({
    testDataForForm: async ({}, use) => {
        await use({
            fn: 'akash',
            ln: 'tiwari',
            email: 'akash@outlook.com',
            age: '42',
            sal: '500',
            dep: 'IT'
        });
    }
});



// export { expect };
// // export const customFixture = test;


    // const {base} = require('@playwright/test');

// exports.customtest = base.test.extend({
//         testDataForForm:  {
            
//                 fn: 'akash',
//                 ln: 'tiwari',
//                 email: 'tiwari@outlook.com'   
            
//         }
//     });
