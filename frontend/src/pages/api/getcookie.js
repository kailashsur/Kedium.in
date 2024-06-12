
// pages/api/getCookie.js

export default function handler(req, res) {
    try {
      const { cookies: { UserAuth } } = req;
  
      if (!UserAuth) {
        return res.status(200).json({ error: 'Unauthorized' });
      }
  
      // Check if the UserAuth string is valid before attempting to parse
      const userAuthString = UserAuth.slice(2, -1) + "}";
      let parseData;
  
      try {
        parseData = JSON.parse(userAuthString);
      } catch (err) {
        return res.status(400).json({ error: 'Invalid UserAuth format' });
      }
  
      res.status(200).json({ message: 'Authenticated', UserAuth: parseData });
  
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  