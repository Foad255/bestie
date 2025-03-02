import { Friend, LifeEvent, LifeStage } from './types';

const LIFE_STAGES: { [key in LifeStage]: { minAge: number; maxAge: number } } = {
  child: { minAge: 0, maxAge: 12 },
  student: { minAge: 13, maxAge: 18 },
  college: { minAge: 18, maxAge: 22 },
  adult: { minAge: 22, maxAge: 30 },
  married: { minAge: 25, maxAge: 60 },
  parent: { minAge: 26, maxAge: 60 },
  elder: { minAge: 60, maxAge: 80 }
};

const POSSIBLE_EVENTS = {
  education: [
    'Started school',
    'Graduated elementary',
    'Started high school',
    'Graduated high school',
    'Started college',
    'Graduated college'
  ],
  career: [
    'Got first job',
    'Career promotion',
    'Changed jobs',
    'Started own business',
    'Major achievement at work'
  ],
  relationship: [
    'Made a new friend',
    'Started dating',
    'Got engaged',
    'Got married',
    'Anniversary celebration'
  ],
  family: [
    'Family vacation',
    'Family reunion',
    'Became a parent',
    'Child\'s first day at school',
    'Family milestone'
  ],
  personal: [
    'New hobby',
    'Learned a new skill',
    'Personal achievement',
    'Life-changing experience',
    'Moving to a new place'
  ]
};

export function generateInitialFriend(name: string): Friend {
  const birthDate = new Date();
  birthDate.setFullYear(birthDate.getFullYear() - 5); // Start as a child

  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    age: 5,
    birthDate,
    lifeStage: 'child',
    personality: {
      openness: Math.random(),
      conscientiousness: Math.random(),
      extraversion: Math.random(),
      agreeableness: Math.random(),
      neuroticism: Math.random()
    },
    currentMood: 'happy',
    lifeEvents: [],
    relationships: [],
    interests: ['playing', 'learning', 'making friends'],
  };
}

export function generateLifeEvent(friend: Friend): LifeEvent {
  const eventTypes = Object.keys(POSSIBLE_EVENTS) as Array<keyof typeof POSSIBLE_EVENTS>;
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const events = POSSIBLE_EVENTS[eventType];
  const eventTitle = events[Math.floor(Math.random() * events.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: eventType,
    title: eventTitle,
    description: `${friend.name} ${eventTitle.toLowerCase()}.`,
    date: new Date(),
    impact: (Math.random() * 2) - 1 // Random number between -1 and 1
  };
}

export function updateFriendAge(friend: Friend): Friend {
  const newAge = friend.age + (Math.random() * 0.5); // Age increment (random fraction up to 0.5 years)
  const updatedFriend = { ...friend, age: newAge };

  // Update life stage based on age
  for (const [stage, range] of Object.entries(LIFE_STAGES)) {
    if (newAge >= range.minAge && newAge <= range.maxAge) {
      updatedFriend.lifeStage = stage as LifeStage;
      break;
    }
  }

  return updatedFriend;
}

export function simulateTimeStep(friend: Friend): Friend {
  const updatedFriend = updateFriendAge(friend);
  
  // Randomly generate new life events (20% chance per time step)
  if (Math.random() < 0.2) {
    const newEvent = generateLifeEvent(updatedFriend);
    updatedFriend.lifeEvents = [...updatedFriend.lifeEvents, newEvent];

    // Update interests based on life events
    if (newEvent.type === 'personal') {
      updatedFriend.interests = [...new Set([...updatedFriend.interests, newEvent.title])];
    }

    // Update mood based on event impact
    updatedFriend.currentMood = newEvent.impact > 0 ? 'happy' : 
                               newEvent.impact < 0 ? 'sad' : 
                               'neutral';
  }

  return updatedFriend;
}

export function getCompatibleFriends(friend: Friend, allFriends: Friend[]): Friend[] {
  return allFriends.filter(otherFriend => {
    if (otherFriend.id === friend.id) return false;
    
    // Calculate personality compatibility
    const personalityMatch = Object.keys(friend.personality).reduce((sum, trait) => {
      const traitKey = trait as keyof typeof friend.personality;
      return sum + Math.abs(friend.personality[traitKey] - otherFriend.personality[traitKey]);
    }, 0) / 5; // Average difference (0 = perfect match, 1 = complete opposite)

    // Calculate interest overlap
    const commonInterests = friend.interests.filter(interest => 
      otherFriend.interests.includes(interest)
    ).length;

    // Consider age difference
    const ageDiff = Math.abs(friend.age - otherFriend.age);
    
    // Return true if there's good compatibility
    return personalityMatch < 0.3 && commonInterests > 0 && ageDiff < 10;
  });
}
