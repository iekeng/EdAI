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
__POST__ /chatbot: sends message to chatbot  
__GET__ /countries: retrives all countries in db  
__GET__ /regions: retrieves all regions in db  
__GET__ /region/{id}: retriveves region with specific id  
__POST__ /region/{id}: adds new regin to db  
__GET__ /profiles: retrives all users from db  
__GET__ /profile/{id}: retrieves specific user profile  
__POST__ /profiles/{id}: adds a single user with <id> to db  
__GET__ /profile/{id>} retrives user's info from db  
__PUT__ /profile/edit/{id} updates user information  
__GET__ /curriculums: retrieves all curriculums from db  
__GET__ /curriculum/{d}: retrieves specific curriculum with id
__GET__ /curriculum/{id}/subjects: retrieves subjects from a specific curriculum  
__GET__ /curriculum/{id}/subject/{id}: retrieves specific subject of a curriculum  
__GET__ /curriculum/{id}/subject/{id}/topics: retrieves all topics and topic content from a subject in a curriculum  

## Conclusion
This API documentation provides an overview of the available endpoints, request/response formats and authentication requirements for the EdAI API.
