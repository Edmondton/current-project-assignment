# Assignment for Current

> This is a project based on express 4, babel 7, mongoose, PM2

# API Instructions (Hosted on Heroku, be patient on the first request, approx 60 seconds)
> Data store will be empty initially
### Submit a visit
```
POST /api/users/{userId}/visits
```
_Example_
```
curl https://current-assignment.herokuapp.com/api/users/a955cac6-fb81-4eb9-a3b5-b87d28b86796/visits 
--request POST 
--header "Content-Type: application/json" 
--data '{"merchant":{"merchantId":"fa9d770b-70a7-471c-9897-e94515fc11b3","merchantName":"Starbucks"},"user":{"userId":"e2d42a60-81c4-44b0-b968-6f4cbc52444f"}}'

Returns:
{
  visitId: XXX,
  timestamp: 1590441350768
}
```

### Retrieve a list of potential visits by userId and a search string
```
GET /api/users/{userId}/visits?searchString=X
```
_Example_
```
curl https://current-assignment.herokuapp.com/api/users/e2d42a60-81c4-44b0-b968-6f4cbc52444f/visits?searchString=STARBUCKS%231249

Returns:
[{
  visitId: XXX,
  timestamp: XXX,
  merchant: {
    merchantId: XXX,
    merchantName: XXX
  },
  user: {
    userId: XXX
  }
}]
```
  
### Retrieve a single visit by visitId
```
GET /api/visits/{visitId}
```
_Example_
```
curl https://current-assignment.herokuapp.com/api/visits/150d3880-a02a-11ea-8a3a-75826e3510fb

Returns:
{
  visitId: X,
  timestamp: Y,
  merchant: {
    merchantId: X,
    merchantName: Z
  },
  user: {
    userId: XXX
  }
}
```

# Instructions for Dev
    git clone <project>
    cd <project>
    yarn install
    cp .env.example .env (Update config values)
    yarn run dev

# Instructions for Production
    git clone <project>
    cd <project>
    yarn install
    cp .env.example .env (Update config values)
    yarn run build
    yarn run start
    OR
    Docker build / run with docker image

# Tests
* Written in Jest
* Data layer mocked out
```
yarn run test
```

 # License

 [MIT](https://opensource.org/licenses/MIT)
