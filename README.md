Git Repository Layout and Version Control Approach
My Git repository for the ChatApp project is structured in two primary directories: client and server. This separation allows for clear distinction between frontend and backend responsibilities.
•	Client: This folder contains the Angular application. It is organized into various components (chat, groups, channels, login, etc.) that handle specific functionalities within the app.
o	The core structure:
	src/app: Contains all the components, services, and models for managing UI and user interactions.
	app-routing.module.ts: Defines the routes for navigating between pages like login, chat, and group management.
	public: Static assets.
	node_modules: Dependency files managed by npm.
	README.md: Contains project information and instructions for running the app.
•	Server: This folder contains the Node.js and Express backend, which provides the REST API and WebSocket connections.
o	The main structure:
	models: Contains Mongoose models for handling MongoDB documents (e.g., User, Group, Channel, Message).
	server.js: The main entry point for the Express app, responsible for connecting to MongoDB and managing the WebSocket.
	routes: All REST API routes for handling user registration, login, and other backend operations are defined here.
During development, I followed common Git practices, working primarily on feature branches such as the chat-function branch. I used frequent commits to track progress and ensure that each feature was fully developed and tested before merging it into the main branch.
________________________________________
Data Structures
Client-side (Angular)
•	User: The user model (user.model.ts) represents a user in the system.
o	Properties:
	username: Unique identifier for the user.
	password: User's password.
	roles: Array storing the roles like "User", "Group Admin"
	groups: Array of group names the user is part of.
•	Group: Represents a group (group.model.ts) that users can join.
o	Properties:
	name: Group name.
	adminUsername: The admin of the group.
	channels: Array of channels within the group.
	users: Array of users who are part of the group.
•	Channel: Represents a channel within a group where users can chat (channel.model.ts).
o	Properties:
	name: Name of the channel.
	messages: Array of messages exchanged in the channel.
Server-side (MongoDB)
•	User Schema (user.js):
o	Stores user credentials and basic information like username, password, and email.
•	Group Schema (group.js):
o	Represents a group in the database, with a reference to the admin user and an array of channels.
•	Channel Schema (channel.js):
o	Represents a chat channel in the database, with an array of messages.
•	Message Schema (message.js):
o	Represents individual messages sent within a channel, storing the content, sender, and timestamp.
________________________________________
REST API
The Angular front-end communicates with the Node.js backend via a REST API. Below are the key routes:
•	POST /register
o	Description: Registers a new user.
o	Parameters:
	username (string): User’s chosen username.
	password (string): User’s password.
o	Returns:
	201 Created: User registered successfully.
	500 Error: Error occurred during registration.
•	POST /login
o	Description: Logs in a user.
o	Parameters:
	username (string): User’s username.
	password (string): User’s password.
o	Returns:
	200 OK: Success, returns the user’s information.
	400 Invalid Credentials: If the username or password is incorrect.
•	GET /users
o	Description: Retrieves a list of users excluding the current logged-in user.
o	Parameters:
	username (string): The username of the currently logged-in user (passed as a query parameter).
o	Returns:
	200 OK: List of other users in the system.
	404 Not Found: If no users are found.
We implemented the messaging functionality using Socket.IO for real-time communication. However, there was an issue where users were not being properly stored in MongoDB during testing which meant that the users were unable to message each other. The idea for it is there but unfortunately, I was unable to get it to work
________________________________________
Testing Results
We performed manual testing using Postman for API routes like registration and login. During these tests:
•	The user registration and login functionality worked correctly. New users were successfully created, and login credentials were validated properly. So when we created a test user through postman we were able to see him as a existing user and to message him but we couldn’t login as the test user as it kept saying wrong credentials.
•	The messaging functionality, although partially working with the testuser, did not reflect messages in MongoDB, as expected. 
________________________________________
Branch and Completion Information
All the implementation for this phase, including user authentication, group/channel management, and chat functionalities, was completed in the chat-function branch. For the final code, please refer to this branch.

Angular Architecture
The Angular frontend is organized around the following components, services, models, and routes:
•	Components:
o	LoginComponent: Manages user login and registration.
o	ChatComponent: Handles the chat UI where users can view and send messages.
o	GroupsComponent: Manages group creation and user assignment to groups.
o	ChannelsComponent: Displays available channels for users to join or leave.
o	ProfileComponent: Displays the user’s profile information and allows account deletion.
o	SuperAdminComponent: Allows super admins to promote users to admin roles or remove users from the system. | Not focused on to much in this phase as I was more focused on getting the chat functionality 
•	Services:
o	AuthService: Manages user authentication, registration, and session handling. This service communicates with the backend to handle user login and registration.
o	ChatService: Manages the WebSocket connections and message sending/receiving functionality.
o	GroupChannelService: Handles operations related to groups and channels, including group creation, channel addition, and user assignments.
•	Models:
o	User: Represents a user with fields like username, password, roles, and groups.
o	Group: Represents a group with fields like name, adminUsername, channels, and users.
o	Channel: Represents a channel with fields like name and messages.
•	Routes:
o	/login: The login and registration page.
o	/chat: The chat interface (protected by AuthGuard).
o	/groups: The group management interface (protected by AuthGuard).
o	/channels: The available channels for the logged-in user (protected by AuthGuard).
________________________________________
Client-Server Interaction
The client-side Angular app communicates with the server-side Express app primarily through REST API calls for user authentication and group management, and via WebSocket for real-time chat messages.
Client-side Interaction:
•	When a user registers or logs in, the AuthService sends a POST request to the server’s /register or /login endpoints, respectively.
•	For chat functionality, the ChatService establishes a WebSocket connection with the backend using Socket.IO. The service listens for new messages and sends messages to the backend.
Server-side Changes:
•	On the server, the /register and /login routes handle user data. Users are saved and fetched from MongoDB using Mongoose.
•	For real-time messaging, the server listens to WebSocket events (sendMessage), and messages are supposed to be emitted to the correct recipient in real-time. However, due to the previously mentioned issue, these messages & users are not reflected in MongoDB as expected.
________________________________________
Final Notes on the Current State
The codebase for this phase has been finalized in the chat-function branch. The main functionalities, including user registration, login, group/channel management, and real-time messaging, have been implemented, but the issue with MongoDB storage for chat messages & users is still there. For the final version of the code, please refer to the chat-function branch in the repository.

