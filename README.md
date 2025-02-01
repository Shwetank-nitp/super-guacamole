# Sage

Sage is an innovative AI SaaS platform that empowers users to generate creative AI images, compose music, and interact with an intelligent chatbot—all in one place. Built with Next.js, TypeScript, and MongoDB, Sage harnesses the power of cutting-edge AI models to deliver a seamless and interactive creative experience.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Obtaining Dependencies](#obtaining-dependencies)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

Sage brings together multiple AI capabilities in a single platform:

- **AI Image Generation:** Create stunning visuals with state-of-the-art AI.
- **AI Music Composition:** Compose unique soundtracks with AI-generated music.
- **AI Chatbot:** Engage with an intelligent chatbot for creative brainstorming and more.

Designed with a modern tech stack and scalable architecture, Sage is perfect for creators, developers, and businesses looking to integrate advanced AI functionalities into their workflows.

## Features

- **Multi-Modal AI Generation:** Generate images, music, and engage in conversation using a unified platform.
- **User-Friendly Interface:** Clean, intuitive design powered by Next.js and TailwindCSS (optional for styling).
- **Real-Time Interactions:** Enjoy responsive and dynamic AI interactions.
- **Secure Authentication:** Robust user management using Clerk.
- **Scalable Data Management:** Powered by MongoDB for efficient data storage and retrieval.
- **Free AI API Integration:** Seamlessly integrate with Hugging Face’s inference API using free tokens.

## Tech Stack

- **Frontend & Backend:** [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Authentication:** [Clerk](https://clerk.dev/)
- **AI Integration:** [Hugging Face Inference API](https://huggingface.co/) (access via Huggiface Inference Token)

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- npm or yarn
- A MongoDB database (local or cloud-based, e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Steps to Set Up

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/sage.git
   cd sage
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   MONGODB_URI=your_mongodb_connection_string
   HUGGINGFACE_API_TOKEN=your_huggingface_inference_token
   ```

   Replace the placeholder values with your actual keys and connection strings.

4. **Run the Development Server:**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Obtaining Dependencies

### Clerk

1. **Sign Up:**
   - Visit [Clerk.dev](https://clerk.dev/) and sign up for a free account.
2. **Obtain API Keys:**
   - After signing up, navigate to your dashboard to locate your Publishable Key and Secret Key.
3. **Integrate:**
   - Add these keys to your `.env.local` file as shown in the [Setup & Installation](#setup--installation) section.

### Hugging Face Inference Token (Huggiface Inference Token)

1. **Create an Account:**
   - Visit [Hugging Face](https://huggingface.co/) and create a free account.
2. **Generate an Inference Token:**
   - Navigate to your account settings or profile page.
   - Under the _Access Tokens_ section, generate a new token.
3. **Integrate:**
   - Add the token to your `.env.local` file using the variable name `HUGGINGFACE_API_TOKEN`.

## Usage

- **Generate AI Images:** Navigate to the images section and input your prompts to generate visuals.
- **Compose AI Music:** Use the music generator to create custom tracks.
- **Chat with AI:** Engage with the chatbot for creative ideas, troubleshooting, or casual conversation.

Detailed usage instructions and examples can be found in the [Documentation](docs/README.md) (if applicable).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
