"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Friend, LifeEvent } from "@/lib/types";

function Timeline({ events }: { events: LifeEvent[] }) {
  return (
    <div className="space-y-8">
      {events.map((event, index) => (
        <div key={event.id} className="relative flex items-center">
          <div className="absolute left-0 h-full w-0.5 bg-border">
            {index === events.length - 1 && (
              <div className="absolute bottom-0 h-4 w-0.5 bg-background"></div>
            )}
          </div>
          <div className="absolute left-[-8px] h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
          <div className="ml-8 space-y-2">
            <div className="flex items-center space-x-3">
              <i className={`fas fa-${
                event.type === 'education' ? 'graduation-cap' :
                event.type === 'career' ? 'briefcase' :
                event.type === 'relationship' ? 'heart' :
                event.type === 'family' ? 'users' :
                'star'
              } text-primary`}></i>
              <h4 className="font-semibold">{event.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{event.description}</p>
            <p className="text-xs text-muted-foreground">
              {event.date.toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PersonalityChart({ personality }: { personality: Friend["personality"] }) {
  return (
    <div className="space-y-4">
      {Object.entries(personality).map(([trait, value]) => (
        <div key={trait}>
          <div className="flex justify-between text-sm mb-1">
            <span className="capitalize">{trait}</span>
            <span>{Math.round(value * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${value * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FriendDetail() {
  const params = useParams();
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{friend.name}</h1>
          <p className="text-muted-foreground">
            Age: {Math.floor(friend.age)} • {friend.lifeStage}
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <i className="fas fa-comment-alt mr-2"></i>
          Start Chat
        </button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Basic info */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Birth Date</p>
                <p>{friend.birthDate.toLocaleDateString()}</p>
              </div>
              {friend.occupation && (
                <div>
                  <p className="text-sm text-muted-foreground">Occupation</p>
                  <p>{friend.occupation}</p>
                </div>
              )}
              {friend.education && (
                <div>
                  <p className="text-sm text-muted-foreground">Education</p>
                  <p>{friend.education}</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Personality</h3>
            <PersonalityChart personality={friend.personality} />
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Interests</h3>
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

        {/* Center column - Timeline */}
        <div className="md:col-span-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Life Timeline</h3>
            <Timeline events={friend.lifeEvents} />
          </div>
        </div>
      </div>
    </div>
  );
}
