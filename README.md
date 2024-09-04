Branching:

•	main: The primary production-ready branch which was used for the initial setup of the project. This branch contains all the stable features for user authentication, super admin, group admin, and general users. Code was merged into this branch after thorough testing.
•	user-creation-test: This branch was used to implement and test user creation and role management features (i.e., super admin, group admin functionality). Once features were validated, the branch was merged into main.
•	test: This branch was used for experimenting with Phase 2 features (i.e., additional functionality and styling) and is currently isolated from the main development branches.

Commit Frequency:

•	Frequent commits were made to user-creation-test for feature implementations such as user creation, group and channel management, and permission handling.
•	The branch was merged into main only after completing each major feature or milestone.

Server and Frontend:

•	The backend (Node.js server) and frontend (Angular client) were developed with updates to both components. 
•	Not much was done on the backend yet.

Client-Side (Angular):

•	User Model (user.model.ts):
o	Represents a user entity with properties like id, username, email, password, roles, and groups.

Group Model (group.model.ts):

•	Represents a group, with properties such as name, adminUsername, channels, and users.
Server-Side (Node.js):

•	User Structure:

o	The user model is managed via local storage or, in Phase 2, will likely be persisted in a database.
Angular Architecture

Components:

•	LoginComponent: Handles user authentication (login and register).
•	GroupsComponent: Allows admins to create groups, users to request to join groups, and super admins to manage all groups.
•	ProfileComponent: Manages user-related actions like viewing user details and deleting the account. (This feature is just for testing hasn’t worked yet)

Services:

•	AuthService: Manages authentication, registration, session storage (localStorage), and role management (promoting users to Group Admin or Super Admin).
•	GroupChannelService: Manages groups and channels (creation, user assignment, joining channels, etc.).

Models:

•	User Model: Represents the structure of a user.
•	Group Model: Represents the structure of a group.

Routes:

•	Routes include paths for logging in, viewing groups, managing channels, and user profile actions.
Node.js Server Architecture

Modules and Functions:

•	express: Used to handle server-side routes.
•	body-parser: Parses incoming request bodies.
•	cors: Enables cross-origin requests.

Files:

•	server.js: The main file that defines the API endpoints (routes) for handling user authentication, group and channel management, and user-related actions.
Global Variables:
•	Users, groups, and channels are stored globally in memory for now. In Phase 2, these will be moved to a database like MongoDB.
Server-Side Routes

User Routes:

•	POST /login: Authenticates the user based on username and password.
o	Parameters: username, password.
•	POST /register: Allows super admins to register new users to groups.
o	Parameters: username, password, role.
•	POST /create-group: Allows group admins to create new groups and channels and add user.
o	Parameters: groupName, adminUsername.
•	POST/ add-channel: Adds a channel to a specific group.
o	Parameters: groupName, channelName.
•	POST /assign-user-to-group: Assigns a user to a group.
o	Parameters: groupName, username.
•	GET /get-user-groups: Retrieves all groups the user is assigned to.
o	Parameters: username.

Client-Server Interaction

When a user performs an action, such as joining a group or channel, the following interaction occurs:

Client-Side (Angular):
   
o	The Angular component (e.g., GroupsComponent) calls a function in a service (GroupChannelService) which triggers an HTTP request to the server.

Data Update:
   
o	Upon receiving a success response, the Angular service updates the relevant state (e.g., updating the list of groups the user is part of).
o	The UI is re-rendered to reflect the changes (e.g., new groups or channels are displayed).

What I Have So Far

Completed Functionality:

•	User Creation and Authentication: Users can log in, register, and log out.
•	Super Admin and Group Admin Features: manage groups/channels.
•	Group and Channel Management: Group admins can create groups and channels, assign users, and manage group memberships.
•	User Requests: Users can request to join groups, and admins can see those requests.

Phase 2 Goals:
•	Messaging System: Implement messaging functionality for users in channels.
•	Data Persistence: Migrate from localStorage to a database like MongoDB to persist data.
•	Improved UI: Refine the UI for user experience, especially for messaging and user-group interactions.
•	Notifications: Add notifications for group admins when users request to join a group.
•	Role-Based Access Control: Ensure strict access control for different types of users (super admin, group admin, user).
