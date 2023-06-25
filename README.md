# EdAI Technical README

## Introduction
EdAI is an AI-supported education platform built using the Create React App framework. The platform provides users with the ability to log in or sign up, with their login information being authenticated to grant access. Users can select their country, which triggers fetching the available curriculums within that country using an internal API to the backend. The curriculums are then displayed through a dropdown curriculum menu. Users can further select the desired curriculum and school level to fetch the corresponding subjects using an API to the backend. The subjects are displayed in the subjects section. Users can click on a subject to study and the topics for that subject are fetched using an internal API and displayed in a list in the topic list section. Users can then select a topic to view the heading and content of that topic in the content display section. The header-nav menu displays the user's name and a progress bar indicating their progress. Additionally, a chatbot window is available on the bottom right corner, providing AI-powered assistance. The chatbot can respond to text and audio queries, connected to an external API for fetching responses.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [API Integration](#api-integration)
6. [Contributing](#contributing)

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

1. Log in or sign up with their credentials to gain access to the platform.

2. Select their country from the provided options. This triggers the fetching of available curriculums within the selected country.

3. Choose the desired curriculum and school level to fetch the corresponding subjects for that curriculum and level.

4. Click on a subject to study, which fetches the topics associated with that subject.

5. Select a topic from the list to view the heading and content of that topic in the content display section.

6. The header-nav menu displays the user's name and a progress bar indicating their progress.

7. Utilize the chatbot window located in the bottom right corner to seek AI-powered assistance. Users can type their queries or press and hold the microphone button to speak their queries to the AI.

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
The EdAI platform is built using the following technologies and frameworks:

- React.js: Front-end JavaScript library for building user interfaces.
- Create React App: Tool for creating React applications with pre-configured development environment.
- HTML/CSS: Markup and styling languages for structuring and presenting the web application.
- JavaScript: Programming language for implementing dynamic functionality.
- API Integration: Integration with internal and external APIs for data retrieval and AI support

.

## API Integration
EdAI integrates with various APIs to fetch data and provide AI support. The following APIs are utilized:

1. Internal API (Backend):
   - `/api/edai/curriculum/school/subjects/topics/content`: Fetches content for selected topics from the database.
   - Other internal APIs for fetching curriculums, subjects, and topics based on user selections.

2. External API (AI):
   - Chatbot API: Sends user queries and retrieves AI-generated responses for text and audio-based questions.

## Contributing
Contributions to EdAI are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make the necessary code changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.
