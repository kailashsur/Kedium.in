import http from 'http';
import app from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

// Handle server errors

server.on('error', (error) => {
  console.error('Server error:', error);
});



// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  server.close(() => {
    process.exit(1); // Exit on uncaught exception
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  server.close(() => {
    process.exit(1); // Exit on unhandled rejection
  });
});



// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});