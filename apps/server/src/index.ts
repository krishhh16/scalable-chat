
import SocketService from './services/socket';
import http from 'http';

async function init() {

    const socketService = new SocketService();
    const httpServer = http.createServer();
    const PORT =  8000;

    socketService.io.attach(httpServer)

    httpServer.listen(PORT, () => {
        console.log(`HTTP Server started at port ${PORT}`)
    })
    
    socketService.initialListener();
}



init();
