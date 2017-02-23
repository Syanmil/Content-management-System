# Content-management-System
Content Management System (SPA)

### Routes

#### Users
| Routes              | HTTP | Description   |
|---------------------|------|---------------|
| /api/users          | GET  | GET all users |
| /api/users/register | POST | register      |
| /api/users/login    | POST | login         |

#### Data
| Routes           | HTTP   | Description      |
|------------------|--------|------------------|
| /api/data        | GET    | GET all data    |
| /api/data        | POST   | create new data  |
| /api/data/:id    | PUT    | edit data        |
| /api/data/:id    | DELETE | delete data      |
| /api/data/:id    | GET    | get details data |
| /api/data/search | GET    | Search data      |

#### Data Date
| Routes               | HTTP   | Description          |
|----------------------|--------|----------------------|
| /api/dataDate        | GET    | GET all dataDate        |
| /api/dataDate        | POST   | create new dataDate  |
| /api/dataDate/:id    | PUT    | edit dataDate        |
| /api/dataDate/:id    | DELETE | delete dataDate      |
| /api/dataDate/:id    | GET    | get details dataDate |
| /api/dataDate/search | GET    | Search  dataDate     |

### Schema
data -->
  -letter: String
  -frequency: Number

dataDate -->
  -date: String
  -point: Number
