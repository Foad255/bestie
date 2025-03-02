"use client";

import { Friend } from "@/lib/types";

interface FamilyMember {
  id: string;
  name: string;
  type: "parent" | "child" | "sibling" | "spouse";
  friend: Friend;
}

interface FamilyTreeProps {
  friend: Friend;
  allFriends: Friend[];
}

function FamilyNode({ member, onSelect }: { 
  member: FamilyMember; 
  onSelect: (friend: Friend) => void;
}) {
  const getRelationIcon = () => {
    switch (member.type) {
      case "parent":
        return "user-tie";
      case "child":
        return "child";
      case "sibling":
        return "users";
      case "spouse":
        return "heart";
      default:
        return "user";
    }
  };

  return (
    <div 
      className="flex flex-col items-center space-y-2 p-4 rounded-lg border bg-card hover:bg-accent cursor-pointer transition-colors"
      onClick={() => onSelect(member.friend)}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <i className={`fas fa-${getRelationIcon()} text-xl text-primary`}></i>
      </div>
      <div className="text-center">
        <p className="font-medium">{member.name}</p>
        <p className="text-sm text-muted-foreground capitalize">{member.type}</p>
      </div>
    </div>
  );
}

function FamilyLevel({ 
  title, 
  members, 
  onSelect 
}: { 
  title: string; 
  members: FamilyMember[]; 
  onSelect: (friend: Friend) => void;
}) {
  if (members.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {members.map(member => (
          <FamilyNode 
            key={member.id} 
            member={member} 
            onSelect={onSelect} 
          />
        ))}
      </div>
    </div>
  );
}

export function FamilyTree({ friend, allFriends }: FamilyTreeProps) {
  const getFamilyMembers = (): {
    parents: FamilyMember[];
    siblings: FamilyMember[];
    spouse: FamilyMember[];
    children: FamilyMember[];
  } => {
    const family = {
      parents: [] as FamilyMember[],
      siblings: [] as FamilyMember[],
      spouse: [] as FamilyMember[],
      children: [] as FamilyMember[],
    };

    friend.relationships.forEach(relation => {
      const relatedFriend = allFriends.find(f => f.id === relation.friendId);
      if (!relatedFriend) return;

      const member: FamilyMember = {
        id: relation.id,
        name: relatedFriend.name,
        type: relation.type,
        friend: relatedFriend,
      };

      switch (relation.type) {
        case "parent":
          family.parents.push(member);
          break;
        case "sibling":
          family.siblings.push(member);
          break;
        case "spouse":
          family.spouse.push(member);
          break;
        case "child":
          family.children.push(member);
          break;
      }
    });

    return family;
  };

  const handleSelect = (selectedFriend: Friend) => {
    // In a real app, this would navigate to the friend's profile
    console.log("Selected friend:", selectedFriend);
  };

  const family = getFamilyMembers();

  return (
    <div className="space-y-8">
      {/* Main friend */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center space-y-2 p-6 rounded-lg border-2 border-primary bg-card">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <i className="fas fa-user text-2xl text-primary"></i>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold">{friend.name}</p>
            <p className="text-sm text-muted-foreground">
              Age: {Math.floor(friend.age)} • {friend.lifeStage}
            </p>
          </div>
        </div>
      </div>

      {/* Connecting lines */}
      <div className="h-8 w-px bg-border mx-auto"></div>

      {/* Family levels */}
      <div className="space-y-12">
        <FamilyLevel 
          title="Parents" 
          members={family.parents}
          onSelect={handleSelect}
        />
        <FamilyLevel 
          title="Siblings" 
          members={family.siblings}
          onSelect={handleSelect}
        />
        <FamilyLevel 
          title="Spouse" 
          members={family.spouse}
          onSelect={handleSelect}
        />
        <FamilyLevel 
          title="Children" 
          members={family.children}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
