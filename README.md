# WeTalk

WeTalk is a real-time web chat application built with Node.js, Express, and Socket.IO. It allows users to join chat rooms, send instant messages, and see live user activity as people join and leave rooms.

## Features

- Real-time messaging with Socket.IO
- Multiple subject-based chat rooms
- User login and registration interface
- Live room member list
- Welcome and departure notifications
- Responsive front-end built with HTML, CSS, and JavaScript
- Firebase-ready deployment configuration

## Tech Stack

- Node.js
- Express.js
- Socket.IO
- HTML5
- CSS3
- JavaScript
- Firebase

## Project Structure

```text
IWP-Project/
├── Public/                 # Front-end assets and pages
│   ├── index.html          # Login/registration page
│   ├── chat.html           # Chat interface
│   ├── styles.css          # Styling
│   └── js/                 # Client-side scripts
├── server.js               # Server and Socket.IO logic
├── package.json            # Project scripts and dependencies
├── .firebaserc             # Firebase project configuration
├── firebase.json           # Firebase hosting configuration
├── database.rules.json     # Realtime Database rules
├── README.md               # Project documentation
├── .gitignore              # Git ignore rules
└── package-lock.json       # Dependency lockfile
```

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/Antaun/IWP-Project.git
cd IWP-Project
npm install
```

### Run the Application

```bash
npm start
```

Then open your browser and visit:

```text
http://localhost:3000
```

## How It Works

- Users enter a username and select a chat room.
- The server stores the current user in the room and broadcasts a welcome message.
- Messages are sent instantly to all users in the same room.
- User join and leave events are displayed to everyone in the room.

## Usage

1. Open the app in a browser.
2. Register or log in with a username.
3. Choose one of the available rooms.
4. Start chatting in real time with other users in the same room.

## Deployment

This project includes Firebase configuration files for easy deployment to Firebase Hosting and Realtime Database.

```bash
firebase deploy
```

## License

This project is licensed under the ISC License.

## Author

Antaun Bobby
