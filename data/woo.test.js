import React from 'react';
import renderer from 'react-test-renderer';

import Woo from './woo';

const XMLHttpRequest = require('xhr2');

global.XMLHttpRequest = XMLHttpRequest;


it("Should throw errors on incomplete request.", (done) => {
    return Woo.customers.authenticate("rrrhys@gmail.com").then( data => {
        expect(data).toEqual(expect.objectContaining({result:false,user:null,errors:expect.anything()}));
        expect(data.errors).toEqual(expect.objectContaining({invalid_username: expect.anything()}));
        done();
    }).catch(data => {
        console.log(data);
        done.fail();
    });
});

it("Should be able to fetch a user with Woo.", (done) => {
    expect.assertions(1);
    Woo.customers.get("rrrhys@gmail.com").then(data => {
            expect(data.email).toEqual("rrrhys@gmail.com");
            done();
        }
     ).catch(data => {
         console.log(data);
        done.fail();
    });

});