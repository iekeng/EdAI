# API Documentation - EdAI

## Overview

The EdAI API provides access to the EdAI web app server. This documentation will guide you through the various endpoints and request/response formats supported by the API.

## Base URL

The base URL for all API requests is `https://edai.com/api`

## Error Handling

Error response include a JSON payload with the following structures:  
* `{"error": "Resource not specified"}`
* `{"error": "Resource not found"}`

## Endpoints
POST /chatbot: sends message to chatbot  
GET /countries: retrives all countries in db  
GET /regions: retrieves all regions in db  
GET /region/<id>: retriveves region with specific id  
POST /region/<id>: adds new regin to db  
GET /profiles: retrives all users from db  
GET /profile/<id>: retrieves specific user profile  
POST /profiles/<id>: adds a single user with <id> to db  
GET /profile/<id>: retrives user's info from db  
PUT /profile/edit/<id> updates user information  
GET /curriculums: retrieves all curriculums from db  
GET /curriculum/<id>: retrieves specific curriculum with <id>  
GET /curriculum/<id>/subjects: retrieves subjects from a specific curriculum  
GET /curriculum/<id>/subject/<id>: retrieves specific subject of a curriculum  
GET /curriculum/<id>/subject/<id>/topics: retrieves all topics and topic content from a subject in a curriculum  

## Conclusion
This API documentation provides an overview of the available endpoints, request/response formats and authentication requirements for the EdAI API.
