// components/ChatContainer.jsx
import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
  }, [selectedUser?._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return null;
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex ${isOwnMessage ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[75%]`}>
                <div className="flex-shrink-0">
                  {isOwnMessage ? (
                    authUser.profilePic ? (
                      <img
                        src={authUser.profilePic}
                        alt="profile pic"
                        className="size-8 rounded-full border border-base-300"
                      />
                    ) : (
                      <div className="avatar placeholder">
                        <div className="size-8 rounded-full bg-neutral text-neutral-content">
                          <span className="text-sm">
                            {authUser.fullName?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      </div>
                    )
                  ) : (
                    selectedUser.profilePic ? (
                      <img
                        src={selectedUser.profilePic}
                        alt="profile pic"
                        className="size-8 rounded-full border border-base-300"
                      />
                    ) : (
                      <div className="avatar placeholder">
                        <div className="size-8 rounded-full bg-neutral text-neutral-content">
                          <span className="text-sm">
                            {selectedUser.fullName?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"} gap-1`}>
                  <div className={`
                    px-3 py-2 rounded-2xl
                    ${isOwnMessage 
                      ? "bg-primary text-primary-content rounded-br-sm" 
                      : "bg-secondary text-secondary-content rounded-bl-sm"
                    }
                  `}>
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-[200px] rounded-lg mb-1"
                      />
                    )}
                    {message.text && <p className="text-sm">{message.text}</p>}
                  </div>
                  <span className="text-[10px] text-base-content/50">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
