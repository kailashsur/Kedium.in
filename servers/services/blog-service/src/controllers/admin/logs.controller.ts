import { Request, Response } from "express";
import path from "path";
import fs from 'fs'


export default function GetCombinedLogs(req : Request, res: Response){

    const logFilePath = path.join(__dirname, 'logs', '../../../../logs/combined.log')

    // Read the file
   
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Watch the log file for changes
  const logStream = fs.createReadStream(logFilePath, { encoding: 'utf8', flags: 'r' });

  logStream.on('data', (chunk) => {
    res.write(`data: ${chunk}\n\n`); // Send the log content as a stream of events
  });

  logStream.on('error', (err) => {
    res.write(`data: Error reading log file: ${err.message}\n\n`);
  });

  req.on('close', () => {
    logStream.close();
    res.end(); // Close the connection when the client closes the request
  });

}