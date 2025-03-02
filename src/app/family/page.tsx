"use client";

import { useEffect, useState } from "react";
import { Friend } from "@/lib/types";
import { FamilyTree } from "@/components/FamilyTree";
import { generateInitialFriend } from "@/lib/simulation";

export default function FamilyPage() {
  const [friend, setFriend] = useState<Friend | null>(null);
  const [allFriends, setAllFriends] = useState<Friend[]>([]);

  useEffect(() => {
    // In a real app, we would fetch all friends from an API
    const loadFriends = () => {
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

        // Generate some sample family members if none exist
        if (parsedFriend.relationships.length === 0) {
          const mother = generateInitialFriend("Sarah");
          mother.age = 35;
          mother.lifeStage = "parent";
          mother.occupation = "Teacher";

          const father = generateInitialFriend("John");
          father.age = 38;
          father.lifeStage = "parent";
          father.occupation = "Engineer";

          const sister = generateInitialFriend("Emma");
          sister.age = 12;
          sister.lifeStage = "student";

          // Add relationships
          parsedFriend.relationships = [
            { id: "1", type: "parent", friendId: mother.id },
            { id: "2", type: "parent", friendId: father.id },
            { id: "3", type: "sibling", friendId: sister.id }
          ];

          mother.relationships = [
            { id: "4", type: "child", friendId: parsedFriend.id },
            { id: "5", type: "spouse", friendId: father.id },
            { id: "6", type: "child", friendId: sister.id }
          ];

          father.relationships = [
            { id: "7", type: "child", friendId: parsedFriend.id },
            { id: "8", type: "spouse", friendId: mother.id },
            { id: "9", type: "child", friendId: sister.id }
          ];

          sister.relationships = [
            { id: "10", type: "parent", friendId: mother.id },
            { id: "11", type: "parent", friendId: father.id },
            { id: "12", type: "sibling", friendId: parsedFriend.id }
          ];

          setAllFriends([parsedFriend, mother, father, sister]);
          localStorage.setItem("virtual-friend", JSON.stringify(parsedFriend));
          localStorage.setItem("all-friends", JSON.stringify([parsedFriend, mother, father, sister]));
        } else {
          const storedAllFriends = localStorage.getItem("all-friends");
          if (storedAllFriends) {
            const parsedAllFriends = JSON.parse(storedAllFriends);
            // Convert dates for all friends
            parsedAllFriends.forEach((f: Friend) => {
              f.birthDate = new Date(f.birthDate);
              f.lifeEvents = f.lifeEvents.map(event => ({
                ...event,
                date: new Date(event.date)
              }));
            });
            setAllFriends(parsedAllFriends);
          }
        }
      }
    };

    loadFriends();
  }, []);

  if (!friend || allFriends.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Family Tree</h1>
        <p className="text-muted-foreground">
          Explore {friend.name}&apos;s family connections and relationships
        </p>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
        <FamilyTree friend={friend} allFriends={allFriends} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Family stats */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Family Statistics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Family Members</p>
              <p className="text-2xl font-bold">{allFriends.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Parents</p>
              <p className="text-2xl font-bold">
                {friend.relationships.filter(r => r.type === "parent").length}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Siblings</p>
              <p className="text-2xl font-bold">
                {friend.relationships.filter(r => r.type === "sibling").length}
              </p>
            </div>
          </div>
        </div>

        {/* Recent family events */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Family Events</h3>
          <div className="space-y-4">
            {friend.lifeEvents
              .filter(event => event.type === "family")
              .slice(-3)
              .reverse()
              .map(event => (
                <div key={event.id} className="flex items-start space-x-3">
                  <i className="fas fa-users text-primary mt-1"></i>
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

        {/* Family relationships */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Relationship Types</h3>
          <div className="space-y-4">
            {["parent", "sibling", "spouse", "child"].map(type => {
              const count = friend.relationships.filter(r => r.type === type).length;
              if (count === 0) return null;
              return (
                <div key={type} className="flex items-center justify-between">
                  <span className="capitalize">{type}s</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
