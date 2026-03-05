import { store } from "@/shared/redux/store";
import { io, Socket } from "socket.io-client";
import { addMessage, setError, setLoading } from "../slice/chatData-slice";

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket) return;

    this.socket = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
    });

    const { dispatch } = store;
    const { socket } = this;

    socket.on("chat:message", ({ message }) => {
      dispatch(addMessage({ from: "ai", message }));
    });

    socket.on("chat:error", () => {
      dispatch(setError(true));
    });

    socket.on("chat:isLoading", (status: boolean) =>
      dispatch(setLoading(status)),
    );
  }

  sendMessage(message: string) {
    this.socket?.emit("chat:message", { message });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const socketService = new SocketService();
