import { Server, Socket } from "socket.io";
import Redis from "ioredis"

const pub = new Redis({
     host: "redis-104014bc-ktmedia23-d677.d.aivencloud.com",
     port: 27736,
     username: "default",
     password: "AVNS_W7QzoW1X-xVjAed8PrC"
});
const sub = new Redis();
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
        sub.subscribe("MESSAGES")

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
                console.log('New Message: ', msg);

                await pub.publish('MESSAGES', JSON.stringify({msg}));

            })
        } )
        sub.on('message', (channel, message) => {
            if (channel === "MESSAGES") {
                io.emit('message', message);
            }
        })
    }
}

export default SocketService
