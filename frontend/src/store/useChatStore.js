// store/useChatStore.js
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to get users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to get messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }

    try {
      console.log("Sending message to:", `http://localhost:5001/api/messages/send/${selectedUser._id}`);
      console.log("Message data:", messageData);
      
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      console.log("Server response:", res.data);
      
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Message send error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        request: error.request,
        config: error.config
      });
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data?.message || "Failed to send message");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from server. Check if server is running.");
        toast.error("Could not connect to server. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("Failed to send message. Please try again.");
      }
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
      const isMessageToSelectedUser = newMessage.receiverId === selectedUser._id;
      
      if (isMessageFromSelectedUser || isMessageToSelectedUser) {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }
    });

    return () => {
      socket.off("newMessage");
    };
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
