export default function handler(req, res) {
    if (req.method === 'POST') {
        console.log('Payment completed:', req.body);
        
        // Store payment status in a simple in-memory variable (resets if Vercel restarts)
        global.paymentStatus = req.body.status;
        
        res.status(200).json({ message: 'Payment status received' });
    } else if (req.method === 'GET') {
        // Retrieve payment status
        res.status(200).json({ status: global.paymentStatus || 'pending' });
    }
}
