"use client";

import { useState, useEffect, useRef } from "react";
import { Friend } from "@/lib/types";

interface Message {
  id: string;
  sender: "user" | "friend";
  text: string;
  timestamp: Date;
}

interface ChatProps {
  friend: Friend;
}

export function Chat({ friend }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate friend's response based on personality and current mood
  const generateFriendResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple response generation based on friend's personality and mood
    let response = "";
    const { personality, currentMood, lifeStage } = friend;

    // Base response on personality traits
    if (personality.extraversion > 0.7) {
      response = "I'm so excited to chat with you! ";
    } else if (personality.extraversion < 0.3) {
      response = "Thanks for reaching out. ";
    }

    // Add mood-based response
    if (currentMood === "happy") {
      response += "I'm having a great day! ";
    } else if (currentMood === "sad") {
      response += "I've been feeling a bit down lately. ";
    }

    // Add life stage context
    switch (lifeStage) {
      case "child":
        response += "Want to play a game?";
        break;
      case "student":
        response += "School has been keeping me busy!";
        break;
      case "college":
        response += "University life is so exciting!";
        break;
      case "adult":
        response += "Life has been quite interesting lately.";
        break;
      case "married":
        response += "Family life brings so much joy.";
        break;
      case "parent":
        response += "The kids keep me on my toes!";
        break;
      case "elder":
        response += "I have so many stories to share.";
        break;
    }

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: "friend",
      text: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: "user",
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText("");
    generateFriendResponse(inputText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Chat header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <i className="fas fa-user text-primary"></i>
          </div>
          <div>
            <h3 className="font-semibold">{friend.name}</h3>
            <p className="text-sm text-muted-foreground">
              {friend.currentMood} • {friend.lifeStage}
            </p>
          </div>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 min-h-[40px] max-h-[120px] px-3 py-2 rounded-md border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ resize: "none" }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
