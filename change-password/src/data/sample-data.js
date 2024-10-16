/******************************
 * Hardcoded Data for scenario *
 *******************************/

// Let's pretend this is a database and that
// these passwords are appropriately encrypted
// in a real application

const sampleUsers = [{
        "id": "584ec41e-b2d9-11ed-afa1-0242ac120002",
        "name": "Safe User",
        "email": "safe@example.com",
        "password": "pw",
        "lastLogin": "2017-09-22T21:01:13.184Z"
    },
    {
        "id": "62e60392-b2d9-11ed-afa1-0242ac120002",
        "name": "Unsafe User",
        "email": "test@example.com",
        "password": "pw",
        "lastLogin": "2016-01-01T08:51:33.912Z"
    }
];

//These are the hardcoded breaches that we will 
//pretend came from an API
const sampleBreaches = [{
        "id": "69ed1306-b2d9-11ed-afa1-0242ac120002",
        "name": "Bolt",
        "domain": "bolt.cd",
        "breachDate": "2017-03-01",
        "addedDate": "2017-11-24T08:15:24Z"
    },
    {
        "id": "714e52fe-b2d9-11ed-afa1-0242ac120002",
        "name": "Elance",
        "domain": "elance.com",
        "breachDate": "2009-01-01",
        "addedDate": "2017-02-18T02:54:48Z"
    },
    {
        "id": "76cebcc8-b2d9-11ed-afa1-0242ac120002",
        "name": "Zomato",
        "domain": "zomato.com",
        "breachDate": "2017-05-17",
        "addedDate": "2017-09-04T21:06:46Z"
    }
]

export {
  sampleUsers,
  sampleBreaches,
}