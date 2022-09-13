# Summary Stats API

API to return summary stats for employees

## Dependencies

- node v16.17

## Design

- The API is structured to be a RESTful HTTP API
- The App has 3 controllers:
  - Authentication Controller: To authenticate and issue jwt token
    - `POST /api/v1/login`
  - Employee Controller: To create and delete an employee via simple REST endpoints
    - `POST /api/v1/employees`
    - `DELETE /api/v1/employees/:id`
  - SummaryController: To calculate stats summary for given criteria
    - Has a single GET API which takes `filter` and `groupBy` criteria
    - `GET/api/v1/stats-summary`: Get summary for all employees
    - `GET /api/v1/stats-summary?onContract=true` Get summary for onContract employees
    - `GET /api/v1/stats-summary?groupBy=department&groupBy=subDepartment`: Get summary grouped by department and subDepartment

### Stats Summary Response

- The stats summary response structure is as below
- This structure allows for accomodating different types of filtering and grouping criteria

```
{
    "summaryStats": [
        {
            "group": {
                "department": "Engineering",
                "subDepartment": "Data"
            },
            "stats": {
                "mean": 90000,
                "max": 90000,
                "min": 90000
            }
        },
        {
            "group": {
                "department": "Engineering",
                "subDepartment": "Platform"
            },
            "stats": {
                "mean": 10000,
                "max": 10000,
                "min": 10000
            }
        }
    ]
}

```

### Stats Calculation

- Stats calculation module is encapsulated in `stats` folder
- There are separate classes to calculate min, max and mean
- Stats calculation is invoked by summary controller for each employee group

### Filtering and Grouping

- Filtering and grouping is done via Summary controller
- `EmployeeService.filter` method takes `FilterCriteria` to filter employees
- Grouping of stats is encapsulated in `EmployeeGrouper` class
- EmployeeGrouper takes `GroupCriteria` to group employees by department or sub-department
- `EmployeeGrouper.group` does the grouping and returns result as an array of:

```
[
 {
  group: {
    department: `Engineering`,
    subDepartment: `Platform`
  },
  stats: { max: 145000, mean: 145000, min: 145000 },
  }
 },
 ....
]
```

### In-Memory Database

- Have added an `in-memory-store` as a simple array based in memory store

## Sample Requests

- Postman collection [SummaryStats](summary-stats.postman_collection.json) is present in root directory. Please import it in Postman APP (retry again if import fails once).
- [Swagger docs](summary-stats-swagger.yml) with sample request/responses and errors
- Invoke `login` request as the first step.
- Login sets `jwtToken` as postman variable, which is then used for authorizing further requests

## Assumptions

- API assumes to group by `department` and nest group by `subDepartment`
- Request params dont support specifying grouping and nesting criteria as of now, but can be enhanced

## Schema Validation

- All requests payload are validated using `joi` schema validator
- Schemas are validated via middleware and `HTTP 400` status is returned for invalid requests

## Pending Improvments

- Improve query request schema for GET summary endpoint to make more generic
  - can change `onContract:true` to `filter: {onContract: true}`
- Improve test coverage
- Refactor summary controller handler to make it smaller
- Refactor EmployeeGrouper

## Environment and configs

- Config files are present in `configs` folder
- Default NODE_ENV is `dev`
- Sensitive ENV variables are kept as empty. Please set the values before running the app
  - JWT_SECRET
  - AUTH_USER
  - AUTH_PASSWORD (min 8 chars)
- `dev.env` is default config for dev mode
- `test.env` is loaded by jest tests

## Test

- uses jest for testing

```
npm run test
npm run test:unit
npm run:test:unit:watch
```

## Run

- uses nodemon for watching files in dev mode
- NODE_ENV environment defaults to `dev`
- Set values for AUTH_USER, AUTH_PASSWORD, JWT_SECRET in configs/dev.env

```
npm run dev
```

- build and run

```
npm run start
```

- compile and build the project using below command
- generates the compiled js files in `build` folder

```
npm run build
```

## Docker compose

- Set values for AUTH_USER, AUTH_PASSWORD, JWT_SECRET in docker.env
- docker.env is loaded by docker-compose
- run following commands

```
  docker compose build
  docker compose up
```

## Git Hooks

- uses husky for git commits

```
npm run prepare
```

## Lint and format

```
npm run lint:fix
npm run prettier:format
```
