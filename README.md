
# Node.js Monitor App Backend

This repository contains the backend implementation of a Node.js monitor app. This backend is responsible for managing data, handling requests from the frontend, and monitoring file system changes.

## Features

- **Express.js Server**: Utilizes Express.js for handling HTTP requests and routing.
- **File System Monitoring**: Monitors file system changes using Chokidar.
- **RESTful API**: Provides RESTful endpoints for interacting with the backend.
- **Data Storage**: Stores data using node-storage for persistence.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed on your local machine.
- A code editor like Visual Studio Code.

### Installation

Certainly! Here's the updated installation section for the README:

### Installation

1. Install Node.js on your local machine if you haven't already.
2. Open a terminal.
3. Navigate to the project directory.
4. Install dependencies:

    ```bash
    npm install
    ```

5. Set up environment variables:

    - Create a `.env` file in the root directory.
    - Define the necessary environment variables, such as `PORT`, `DIRECTORY`, and `REFRESH_EVERY`.

### Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The server will be running at `http://localhost:<PORT>`. You can now make requests to the API endpoints.

### Endpoints

- **GET /getFiles**: Retrieves files from the server.
- **GET /getFilesRefresh**: Retrieves refreshed files from the server.
- **GET /getHistory**: Retrieves file change history.
- **POST /removeFile**: Removes a file from the server.
- **POST /restoreFile**: Restores a previously removed file.
- **POST /getTutorial**: Retrieves tutorial information.
- **GET /getAvailableLogs**: Retrieves available logs.
- **POST /logAnalyze**: Analyzes logs.


## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- Express.js
- Chokidar
- Node.js
- And other open-source libraries and tools.

---

Feel free to customize this README to fit your project's specific details and requirements!
