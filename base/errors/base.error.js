class BaseError extends Error {
 
    static type = {
        APP_NAME: "APP_NAME",
        INTERNAL: "INTERNAL",
        NETWORK: "NETWORK",
        UNKNOWN: "UNKNOWN",
    };

    constructor(options, overrides) {
        super();
        Object.assign(options, overrides);

        if (!BaseError.type.hasOwnProperty(options.type)) {
            throw new Error(`BaseError: ${options.type} is not a valid type.`);
        }

        if (!options.message) {
            throw new Error("BaseError: error message required.");
        }

        if (!options.statusCode) {
            throw new Error("BaseError: error code required.");
        }
        /*
        this.name = "ApplicationError";
        this.type = options.type;
        this.code = options.code;
        this.message = options.message;
        this.errors = options.errors;
        this.meta = options.meta;
        this.isOperational = options.isOperational;
        this.statusCode = options.statusCode;
        */

       this.status = options.statusCode,
       this.name = options.type; 
       this.message = options.message;
       this.details = options.errors;
       this.isOperational = options.isOperational;
       this.statusCode = options.statusCode;
    }
}  

module.exports = BaseError;

/*
    HTTP_STATUS: 400
    {
        "status": 400,
        "name": "BAD_REQUEST",
        "path": "https://example.net/validation-error",
        "message": "The request parameter failed to validate",
        details: [ 
            {
                "field": "username",
                "reason": "username cannot be less than 8 characters"
            },
            {
                "field": "password",
                "reason": "confirm password is not match"
            }
        ]
    } 
*/

/*
{
    {
        "status": 500,
        "name": "INTERNAL_SERVER_ERROR",
        "path": "https://ainghia.com/docs/api/500",
        "message": "A system error occurs, please contact administrator via email address: hoan.lam@kmail.com",
    }
}
 */

/*
HTTP_STATUS: 200
{
    "status": 200,
    "name": "SUCCESS",
    "content": {

        "page": 2,
        "limit": 10,
        "totalPages": 100,
        "totalItems": 995,
        "items": [
            "customerCode": "100001",
            "customerName": "Lam Thanh Bao Hoan",
            "birthday": "19900225",
            "gender": "male",
            "avatarUrl": "https://ainghia.com/profile/20221205100001",
            "address": [
                "home": "76, DT766, Dong Ha, Duc Linh, Binh Thuan",
                "company": "76, DT766, Dong Ha, Duc Linh, Binh Thuan",
                "others": "none"
            ],
            "phone": [
                "mobile": "0903154892",
                "telephone": "098133452"
            ]              
        ]
        
    }
}
*/


/*
HTTP_STATUS: 200
{
    "status": 200,
    "name": "SUCCESS",
    "content": {

        "user": {
            "username": "hoan.lam",
            "fullname": "Lam Thanh Bao Hoan",
            "gender": "male",
            "emailAddress": "hoan.lam@kmail.com",
            "avatarUrl": "https://google-gallery.com/",
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgyMTU4MjMxLCJleHAiOjE2ODQ3NTAyMzF9.mVkF6YLrWar7JiP2RJ4N6-ds11RrUpk0vEX2miMDMkE",
        "refreshToken": "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgyMTU4MjUwLCJleHAiOjE2ODQ3NTAyNTB9.0xgD9bqPh_X3z65q7zlbEX6xIpjTK7Q74NK-kEUymhM"
    
    }
}
*/