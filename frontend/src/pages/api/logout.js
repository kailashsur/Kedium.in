export default function handler(req, res) {
    try {
        // Clear the UserAuth cookie by setting its value to an empty string and expiry date to a date in the past
        res.setHeader('Set-Cookie', 'UserAuth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; HttpOnly');

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
