import { Server, Socket } from "socket.io";

class SocketService {
    private _io: Server;
    constructor() {
        console.log('Init Socket Service....')
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*"
            }
        });

    }

    get io() {
        return this._io
    }

    public initialListener() {
        const io = this._io;
        console.log('Init initialListener')
        io.on("connect", (s) => {
            console.log(`New Socket init ${s.id}`)

            s.on('event:message', async ({msg}: {msg: string}) => {
                console.log('New Message Rec', msg)
            })
        } )
    }
}

export default SocketService
