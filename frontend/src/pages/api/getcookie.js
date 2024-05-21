// UserAuth = "j:{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDA5YTdiYWU0NDA5NTRlMmI1YWRmYSIsImlhdCI6MTcxNTUwOTg4M30.2NZOcITcAQOtnuNCd5i7G5_ipvHecEQ1fq75jP1V4mc","username":"unqconsafsdfsa","fullname":"unqconsafsdfsa","email":"unqconsafsdfsa@gmail.com"}"
// pages/api/getCookie.js

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
  

// export default function handler(req, res) {
//     const { cookies: { UserAuth } } = req;

//     const data = UserAuth.slice(2, -1) + "}";
//     const parseData = JSON.parse(data);

//     if (!UserAuth) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     res.status(200).json({message : 'Authenticated', UserAuth : parseData  });
// }
