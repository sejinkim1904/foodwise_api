# Foodwise API

## Make requests to the app on Heroku
https://foodwise-api.herokuapp.com/api/v1/

## About the Project
- Foodwise API was built for a coding challenge for Suite Studios
- The requirements were to build a simple API that does something cool
- My girlfriend and I always have a hard time choosing what to eat so I built an API that takes a request with zip code, radius, and a category to return a random restaurant within the provided parameters
- Foodwise only finds restaurants that are open at the time of the request


## Local Setup
  ### Instructions:
1. Clone the GitHub repository
2. Go to the directory with the new repo  
3. Run `npm install`
4. Create a `.env` file in the root directory set environment variables for:
  - `YELP_BASE_URL=''https://api.yelp.com/v3/businesses''`
  - `YELP_API_KEY`: Create an API key on [Yelp API](https://www.yelp.com/developers/documentation/v3/authentication)
5. To run the server: `npm start` or `npm run start:dev` to run with `nodemon`
  - Server runs on `localhost:1337`
  ### Run tests:
1. Run `npm test`
2. To run a single test file: `npm test -- <file_name>`
3. To generate coverage report: `open coverage/lcov-report/index.html`


## Endpoints

#### 1) healthcheck

***Request:***
`GET /api/v1/healthcheck/ping`

***Example Response:***
```
{
    "message": "pong"
}
```

#### 2) Get a random restaurant

***Request:***
```
GET /api/v1/restaurants/random
params: {
  zip_code(required): number,
  radius(optional):  number,
  categories(optional): string
}
```

***Example Response:***
```
{
    "name": "Drunken Monkeys Neighborhood Tavern",
    "url": "https://www.yelp.com/biz/drunken-monkeys-neighborhood-tavern-denver?adjust_creative=Gw2G3s-8y_nwhyQj-esq8Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Gw2G3s-8y_nwhyQj-esq8Q",
    "rating": 4,
    "distance": 1.96,
    "location": {
        "address1": "7667 Washington St",
        "address2": null,
        "address3": "",
        "city": "Denver",
        "zip_code": "80229",
        "country": "US",
        "state": "CO"
    },
    "phone": "(720) 381-6003"
}
```
