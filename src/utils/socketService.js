import io from "socket.io-client";

let socket;

export const initializeSocket = () => {

  if (!socket) {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }
  
  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initializeSocket first.");
  }
  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.close();
  }
};
