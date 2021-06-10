const server = require('./server');
const PORT = process.env.PORT || 9000;

server.listen(PORT, async () => console.log(`Server is live at localhost:  ${process.pid}`, `${PORT}`));




