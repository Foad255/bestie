export type LifeStage = 'child' | 'student' | 'college' | 'adult' | 'married' | 'parent' | 'elder';

export type LifeEvent = {
  id: string;
  type: 'education' | 'career' | 'relationship' | 'family' | 'personal';
  title: string;
  description: string;
  date: Date;
  impact: number; // -1 to 1, representing negative to positive impact
};

export type Friend = {
  id: string;
  name: string;
  age: number;
  birthDate: Date;
  lifeStage: LifeStage;
  personality: {
    openness: number;      // 0-1
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  currentMood: string;
  lifeEvents: LifeEvent[];
  relationships: {
    id: string;
    type: 'parent' | 'child' | 'sibling' | 'spouse';
    friendId: string;
  }[];
  interests: string[];
  occupation?: string;
  education?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  friends: Friend[];
};
