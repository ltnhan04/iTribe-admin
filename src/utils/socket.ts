import { io, Socket } from "socket.io-client";

// Lấy URL của API từ biến môi trường
const socket: Socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
});
export const sendMessage = (message: { user: string, message: string }) => {
    socket.emit("sendMessage", message);
  };
  
  export const onNewMessage = (callback: (message: any) => void) => {
    socket.on("newMessage", callback);
  };
  
  export const offNewMessage = (callback: (message: any) => void) => {
    socket.off("newMessage", callback);
  };
export default socket;
