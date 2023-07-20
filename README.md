# EdAI Technical README

## Introduction
Welcome to EdAI, an AI-supported education platform that brings together cutting-edge technologies to provide users with a seamless learning experience. Built using the Create React App framework for the frontend and powered by Flask, SQLAlchemy, and REST API for the backend, EdAI offers an array of features to enhance learning.

Users start by signing up and selecting their country, which triggers an internal API fetch for available curriculums in that country. The curated list of curriculums is then displayed for users to choose from. Upon clicking the sign-up button, users are redirected to the login page, where JWT authentication is implemented for secure access, including token generation, validation, and storage.

Once logged in, users are directed to the dashboard, where they can explore subjects based on their chosen curriculum. React Context management is carefully utilized to efficiently share information between components, allowing a seamless user experience. Users can delve into topics within each subject and access relevant content with just a click.

To enhance user support, an AI-powered chatbot is available in the bottom right corner, connecting to an external API to provide helpful responses to text queries. EdAI combines advanced technologies with user-friendly interfaces to create an accessible and engaging learning platform.

## Table of Contents
- Installation
- Usage
- Features
- Technologies Used
- API Integration
- Contributing
- Architecture
- Conclusion

## Installation
To set up and run the EdAI platform locally, follow these steps:

1. Clone the repository from GitHub:
   ```
   git clone https://github.com/your-username/edai.git
   ```

2. Navigate to the project directory:
   ```
   cd edai
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your web browser and access the application at http://localhost:3000.

## Usage
Upon accessing the EdAI platform, users can perform the following actions:

- Log in or sign up with their credentials to gain access to the platform.
- Select their country from the provided options. This triggers the fetching of available curriculums within the selected country.
- Choose the desired curriculum and school level to fetch the corresponding subjects for that curriculum and level.
- Click on a subject to study, which fetches the topics associated with that subject.
- Select a topic from the list to view the heading and content of that topic in the content display section.
- The header-nav menu displays the user's name and a progress bar indicating their progress.
- Utilize the chatbot window located in the bottom right corner to seek AI-powered assistance. Users can type their queries or press and hold the microphone button to speak their queries to the AI.

## Features
- User login/sign up functionality with authentication.
- Country selection to fetch available curriculums.
- Dropdown curriculum menu for curriculum selection.
- School level selection to fetch subjects.
- Display of subjects and topics based on user selections.
- Content display section for viewing topic heading and content.
- Header-nav menu displaying user information and progress bar.
- AI-supported chatbot window for user assistance.

## Technologies Used
### Frontend
- React.js: Front-end JavaScript library for building user interfaces.
- Create React App: Tool for creating React applications with pre-configured development environment.
- HTML/CSS: Markup and styling languages for structuring and presenting the web application.
- JavaScript: Programming language for implementing dynamic functionality.
- React Context: Manages communication between React components.
- Node.js: Manages npm JavaScript runtime environment.

### Backend
- Flask Web Framework: Backend framework for building web applications.
- SQLAlchemy: Object-relational mapping (ORM) library for database management.
- REST API: Used for communication between the frontend and backend.
- Flask Migrate: Provides database migration capabilities.
- OpenAI: Integration of AI-powered chatbot support.
- Flask Praetorian: Provides authentication for user profiles.
- Flask Cors: Enables Cross-Origin Resource Sharing (CORS) for API requests.

## API Integration
EdAI integrates with various APIs to fetch data and provide AI support. The following APIs are utilized:

**Internal API (Backend):**
- POST /chatbot: Sends a message to the chatbot.
- GET /regions: Retrieves all regions in the database.
- GET /region/{id}: Retrieves a region with a specific ID.
- POST /region/{id}: Adds a new region to the database.
- GET /countries: Retrieves all countries in the database.
- GET /country/{id}: Retrieves a specific country from the database.
- GET /profiles: Retrieves all user profiles from the database.
- GET /profile/{id}: Retrieves a specific user profile.
- POST /profile/{id}: Adds a single user to the database.
- GET /profile/{id}: Retrieves user's info from the database.
- PUT /profile/edit/{id}: Updates user information.
- GET /curriculums: Retrieves all curriculums from the database.
- GET /country/{id}/curriculums: Retrieves all curriculums for a specific country from the database.
- GET /country/{id}/curriculum/{d}: Retrieves a specific curriculum with ID from the database.
- GET /country/{id}/curriculum/{id}/subjects: Retrieves subjects from a specific curriculum.
- GET /curriculum/{id}/subject/{id}: Retrieves a specific subject of a curriculum.
- GET /country/{id}/curriculum/{id}/subject/{id}/topics: Retrieves all topics and topic content from a subject in a curriculum.

## Contributing
Contributions to EdAI are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make the necessary code changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.


## Architecture
Our platform consists of a frontend built with React.js and a backend built with Flask, together with SQLAlchemy. The frontend components communicate with each other through React Context, while REST APIs facilitate seamless communication between the frontend and backend.

## Conclusion
This API documentation provides an overview of the available endpoints, request/response formats and authentication requirements for the EdAI API. 
