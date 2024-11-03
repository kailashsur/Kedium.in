
import { NextApiRequest, NextApiResponse } from 'next';
// pages/api/getCookie.js

export default function handler(req : NextApiRequest , res : NextApiResponse) {
    try {
      const { cookies: { refreshToken } } = req;
  
      
      if (!refreshToken) {
        return res.status(200).json({ error: 'Unauthorized' });
      }
  
      res.status(200).json({ message: 'Authenticated', refreshToken: refreshToken });
  
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  