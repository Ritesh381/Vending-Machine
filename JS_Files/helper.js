function sendData() {
    fetch('https://your-vercel-server.com/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: true })
    })
    .then(response => response.json())
    .then(data => alert("Data sent successfully!"))
    .catch(error => alert("Error sending data"));
}