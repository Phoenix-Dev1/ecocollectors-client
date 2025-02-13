# Screenshot

A smart recycling management platform that connects users with recyclers, allowing for efficient request handling, tracking, and real-time updates on recycling activities.

Project Live at: https://ecocollectors-client.vercel.app/

![eco-collectors](/assets/banner-eco.png)

---

## Features

- Real-Time Messaging: Instantly send and receive messages using Pusher for seamless live chat.
- User Authentication: Secure login via NextAuth.js, supporting GitHub & Google OAuth and email authentication.
- Presence Detection: Track active users in real-time with Pusher's presence channels.
- Secure Conversations: Ensures privacy with server-side authentication and protected API routes.
- Optimized Performance: Leverages Next.js for fast loading, server-side rendering, and API efficiency.

---

## Technologies used

- [React](https://react.dev/) - Front-End JavaScript library.
- [Google Maps API](https://developers.google.com/maps) - Enables interactive map features, geolocation, and place search functionality.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for responsive and modern UI design.
- [Node.js](https://nodejs.org/) - Back-End JavaScript runtime for handling server-side logic and API requests.
- [JWT](https://jwt.io/) - Secure token-based authentication for user sessions.
- [MySQL](https://www.mysql.com/) - Relational database for storing and managing user and request data.

---

## Build

1. Clone this repository

```bash
git clone https://github.com/Phoenix-Dev1/ecocollectors-client.git && cd eco-collectors
```

2. Install project dependencies

```bash
npm install
```

## Setup

3. Set up environment variables (Required)

- Create a .env file in the root directory.
- Add the necessary API keys and configuration.

- REACT_APP_GOOGLE_API_KEY =
- REACT_APP_GOOGLE_LIB = places

- REACT_APP_URL =

## Start the project

4. Build the project and start it -

```bash
npm start
```
