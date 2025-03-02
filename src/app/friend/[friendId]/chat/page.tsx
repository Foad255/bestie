"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Friend } from "@/lib/types";
import { Chat } from "@/components/Chat";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const [friend, setFriend] = useState<Friend | null>(null);

  useEffect(() => {
    // In a real app, we would fetch the friend data from an API
    const storedFriend = localStorage.getItem("virtual-friend");
    if (storedFriend) {
      const parsedFriend = JSON.parse(storedFriend);
      // Convert string dates back to Date objects
      parsedFriend.birthDate = new Date(parsedFriend.birthDate);
      parsedFriend.lifeEvents = parsedFriend.lifeEvents.map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
      setFriend(parsedFriend);
    }
  }, [params.friendId]);

  if (!friend) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat with {friend.name}</h1>
          <p className="text-muted-foreground">
            Have a conversation and build your friendship
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Chat friend={friend} />
        </div>
        
        <div className="space-y-6">
          {/* Friend's current context */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Current Context</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Mood</p>
                <p className="flex items-center">
                  <i className={`far fa-${
                    friend.currentMood === 'happy' ? 'smile' :
                    friend.currentMood === 'sad' ? 'frown' :
                    'meh'
                  } mr-2`}></i>
                  {friend.currentMood}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Life Stage</p>
                <p>{friend.lifeStage}</p>
              </div>
              {friend.occupation && (
                <div>
                  <p className="text-sm text-muted-foreground">Current Occupation</p>
                  <p>{friend.occupation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Latest life event */}
          {friend.lifeEvents.length > 0 && (
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Latest Event</h3>
              <div>
                <p className="font-medium">
                  {friend.lifeEvents[friend.lifeEvents.length - 1].title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {friend.lifeEvents[friend.lifeEvents.length - 1].description}
                </p>
              </div>
            </div>
          )}

          {/* Interests */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Current Interests</h3>
            <div className="flex flex-wrap gap-2">
              {friend.interests.map((interest, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
