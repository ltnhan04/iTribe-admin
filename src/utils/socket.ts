import { io, Socket } from "socket.io-client";

const socket: Socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
});
export const sendMessage = (message: { user: string; message: string }) => {
  socket.emit("sendMessage", message);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onNewMessage = (callback: (message: any) => void) => {
  socket.on("newMessage", callback);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const offNewMessage = (callback: (message: any) => void) => {
  socket.off("newMessage", callback);
};
export default socket;
