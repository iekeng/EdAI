## EdAI APIs
GET /api/countries: retrives all countries in db
GET /api/regions: retrieves all regions in db
GET /api/region/<id>: retriveves region with specific id
POST /api/region/<id>: adds new regin to db
GET /api/profiles: retrives all users from db
GET /api/profiles/<id>: retrieves specific user profile
POST /api/profile/<id>: adds a single user with <id> to db
GET /api/profile/<id>: retrives user's info from db
PUT /api/profile/edit/<id> updates user information
GET /api/curriculums: retrieves all curriculums from db
GET /api/curriculum/<id>: retrieves specific curriculum with <id>
GET /api/curriculum/<id>/subjects: retrieves subjects from a specific curriculum
GET /api/curriculum/<id>/subject/<id>: retrieves specific subject of a curriculum
GET /api/curriculum/<id>/subject/<id>/topics: retrieves all topics and topic content from a subject in a curriculum

## Form Routes
POST /post/country: Stores user country-data to db from form
POST /post/region: Stores user region-data to db from form
