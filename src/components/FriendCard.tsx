import { Friend, LifeEvent } from "@/lib/types"

interface FriendCardProps {
  friend: Friend;
  onChat?: () => void;
  onViewDetails?: () => void;
}

export function FriendCard({ friend, onChat, onViewDetails }: FriendCardProps) {
  const getLatestEvent = (): LifeEvent | undefined => {
    if (friend.lifeEvents.length === 0) return undefined;
    return friend.lifeEvents[friend.lifeEvents.length - 1];
  };

  const getLifeStageIcon = () => {
    switch (friend.lifeStage) {
      case 'child':
        return 'baby';
      case 'student':
        return 'school';
      case 'college':
        return 'graduation-cap';
      case 'adult':
        return 'briefcase';
      case 'married':
        return 'heart';
      case 'parent':
        return 'users';
      case 'elder':
        return 'star';
      default:
        return 'user';
    }
  };

  const getMoodIcon = () => {
    switch (friend.currentMood) {
      case 'happy':
        return 'smile';
      case 'sad':
        return 'frown';
      default:
        return 'meh';
    }
  };

  const latestEvent = getLatestEvent();

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <i className={`fas fa-${getLifeStageIcon()} text-xl text-primary`}></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{friend.name}</h3>
              <p className="text-sm text-muted-foreground">
                Age: {Math.floor(friend.age)} • {friend.lifeStage}
              </p>
            </div>
          </div>
          <div className="text-xl text-muted-foreground">
            <i className={`far fa-${getMoodIcon()}`}></i>
          </div>
        </div>

        {latestEvent && (
          <div className="bg-muted/50 rounded-md p-3 text-sm">
            <p className="font-medium">Latest Event:</p>
            <p className="text-muted-foreground">{latestEvent.title}</p>
          </div>
        )}

        <div className="space-y-2">
          {friend.occupation && (
            <p className="text-sm">
              <i className="fas fa-briefcase mr-2 text-muted-foreground"></i>
              {friend.occupation}
            </p>
          )}
          {friend.education && (
            <p className="text-sm">
              <i className="fas fa-graduation-cap mr-2 text-muted-foreground"></i>
              {friend.education}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {friend.interests.slice(0, 3).map((interest, index) => (
            <span 
              key={index}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {interest}
            </span>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={onViewDetails}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            View Details
          </button>
          <button
            onClick={onChat}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <i className="fas fa-comment-alt mr-2"></i>
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}
