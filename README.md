# YATC - Yet Another Twitter Clone

![YATC Logo](https://raw.githubusercontent.com/Ericoptero/yatc/main/public/assets/logo.svg)

**YATC (Yet Another Twitter Clone)** is a Twitter-like social media platform built using **Next.js, tRPC, Tailwind, Prisma and Clerk**. This project aims to replicate the core functionality of Twitter, allowing users to post tweets, follow other users, like tweets, and engage in real-time discussions.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Demo

You can check out the live demo of YATC at [yatc-sigma.vercel.app](yatc-sigma.vercel.app).

## Features

YATC comes with the following key features:

[x] **User Authentication**: Users can create accounts, log in, and reset their passwords securely using Clerk.
[x] **Posting Tweets**: Registered users can post tweets with text and emojis.
[x] **Timeline**: Users can view tweets from the people they follow on their timeline.
[x] **Real-Time Updates**: New tweets and likes are updated in real-time using tRPC and React Query.
[x] **User Profiles**: Each user has a profile page displaying their tweets, followers, and following.
[x] **Responsive Design**: YATC is designed to work seamlessly on both desktop and mobile devices.
[-] **Following/Followers**: Users can follow and unfollow other users.
[-] **Like Tweets**: Users can like and unlike tweets.
[-] **Notifications**: Users receive notifications for new followers and likes.

## Getting Started

To run YATC locally or deploy it to your own server, follow the instructions below.

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Ericoptero/yatc.git
   ```

2. Navigate to the project directory:

   ```shell
   cd yatc
   ```

3. Install the project dependencies:

   ```shell
   npm install
   ```

### Usage

1. Configure Clerk, Upstash and Prisma database:

   - Create a `.env` file in the project root and add your enviroment variables using the `.env.example` on the repo:

   ```env
   DATABASE_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   ```

2. Start the development server:

   ```shell
   npm run dev
   ```

3. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

4. Congratulations! You can now interact with YATC locally!!

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance. Happy coding! 🚁
