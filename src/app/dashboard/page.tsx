"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Friend } from "@/lib/types";
import { FriendCard } from "@/components/FriendCard";
import { generateInitialFriend, simulateTimeStep } from "@/lib/simulation";

export default function Dashboard() {
  const router = useRouter();
  const [friend, setFriend] = useState<Friend | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch the friend data from an API
    // For now, we'll generate a new friend if one doesn't exist
    const initializeFriend = () => {
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
      } else {
        const newFriend = generateInitialFriend("Alex");
        localStorage.setItem("virtual-friend", JSON.stringify(newFriend));
        setFriend(newFriend);
      }
      setLoading(false);
    };

    initializeFriend();
  }, []);

  useEffect(() => {
    // Simulate friend's life progression every 10 seconds
    const simulationInterval = setInterval(() => {
      if (friend) {
        const updatedFriend = simulateTimeStep(friend);
        setFriend(updatedFriend);
        localStorage.setItem("virtual-friend", JSON.stringify(updatedFriend));
      }
    }, 10000);

    return () => clearInterval(simulationInterval);
  }, [friend]);

  const handleChat = () => {
    if (friend) {
      router.push(`/friend/${friend.id}/chat`);
    }
  };

  const handleViewDetails = () => {
    if (friend) {
      router.push(`/friend/${friend.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Virtual Friend</h1>
        <p className="text-muted-foreground">
          Watch as your friend grows and experiences life events in real-time.
        </p>
      </div>

      {friend ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FriendCard
            friend={friend}
            onChat={handleChat}
            onViewDetails={handleViewDetails}
          />
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Life Events</h3>
            <div className="space-y-4">
              {friend.lifeEvents.slice(-3).reverse().map((event) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div className="mt-1">
                    <i className={`fas fa-${
                      event.type === 'education' ? 'graduation-cap' :
                      event.type === 'career' ? 'briefcase' :
                      event.type === 'relationship' ? 'heart' :
                      event.type === 'family' ? 'users' :
                      'star'
                    } text-primary`}></i>
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Personality Traits</h3>
            <div className="space-y-4">
              {Object.entries(friend.personality).map(([trait, value]) => (
                <div key={trait}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{trait}</span>
                    <span>{Math.round(value * 100)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${value * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No friend found. Please refresh the page.</p>
        </div>
      )}
    </div>
  );
}
