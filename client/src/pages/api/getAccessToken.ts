import { NextApiRequest, NextApiResponse } from 'next';
// pages/api/getCookie.js

export default function handler(req : NextApiRequest , res : NextApiResponse) {
    try {
      const { cookies: { accessToken } } = req;
  
      
      if (!accessToken) {
        return res.status(200).json({ error: 'Unauthorized' });
      }
  
      res.status(200).json({ message: 'Authenticated', accessToken: accessToken });
  
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  