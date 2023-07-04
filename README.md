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
_POST_ /chatbot: sends message to chatbot  
_GET_ /countries: retrives all countries in db  
_GET_ /regions: retrieves all regions in db  
_GET_ /region/{id}: retriveves region with specific id  
_POST_ /region/{id}: adds new regin to db  
_GET_ /profiles: retrives all users from db  
_GET_ /profile/{id}: retrieves specific user profile  
_POST_ /profiles/{id}: adds a single user with <id> to db  
_GET_ /profile/{id>} retrives user's info from db  
_PUT_ /profile/edit/{id} updates user information  
_GET_ /curriculums: retrieves all curriculums from db  
_GET_ /curriculum/{d}: retrieves specific curriculum with id
_GET_ /curriculum/{id}/subjects: retrieves subjects from a specific curriculum  
GET /curriculum/{id}/subject/{id}: retrieves specific subject of a curriculum  
GET /curriculum/{id}/subject/{id}/topics: retrieves all topics and topic content from a subject in a curriculum  

## Conclusion
This API documentation provides an overview of the available endpoints, request/response formats and authentication requirements for the EdAI API.
