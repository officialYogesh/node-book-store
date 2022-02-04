# Book Store

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- Node/npm
- redis
- mongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/officialYogesh/node-book-store.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start Redis server locally on your machine
4. Start MongoDB server locally on your machine

### Usage

1. Start Node Server
   ```sh
   npm start
   ```
2. You can send Http GET request to below api:
   ```sh
   http://localhost:3000/books?limit=3&page=1
   ```

### Note

- Default ports and url are used for both MongoDB and Redis

### Results

- Cache missed requests took around 250ms to complete
- Cached requests took around 5ms to complete
