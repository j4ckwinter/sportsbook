# Sportsbook Web Application
This web application utilizes a WebSocket service to retrieve and present simplified sportsbook data in the user interface. The application connects to the WebSocket service and subscribes to various topics to receive real-time updates for events and betting markets.

## WebSocket Topics

The WebSocket service provides three available topics for data retrieval:

1. **/topic/inplay**: This topic provides a list of IDs for sport events that are currently considered "live."

2. **/topic/event/[id]**: By subscribing to this topic with a specific event ID, the application can receive details and updates for the given event, including the associated betting market ID.

3. **/topic/market/[id]**: Subscribing to this topic with a specific betting market ID allows the application to receive details and updates for the given betting market.

## Getting Started

To run the sportsbook web application, follow these steps:

1. Clone the repository
2. Install dependencies:
   ```shell
   cd sportsbook
   npm install
   ```
3. Start the application:
   ```shell
   npm run start
   ```
4. Access the application:
Open a web browser and navigate to http://localhost:4200 to access the sportsbook web application.

## Technologies Used
Angular: A JavaScript framework used for building the web application.
WebSockets: Used to establish a real-time communication channel with the WebSocket service.
RxJS: Used for reactive programming and handling asynchronous operations.
