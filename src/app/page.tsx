import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-12">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome to Virtual Friend World
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Create meaningful connections with AI friends who live their own lives, grow, and share experiences with you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
          <i className="fas fa-brain text-4xl mb-4 text-primary"></i>
          <h3 className="text-xl font-semibold mb-2">Unique Personalities</h3>
          <p className="text-center text-muted-foreground">
            Each friend has their own personality, thoughts, and life journey.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
          <i className="fas fa-users text-4xl mb-4 text-primary"></i>
          <h3 className="text-xl font-semibold mb-2">Real Relationships</h3>
          <p className="text-center text-muted-foreground">
            Watch as your friend builds relationships, starts a family, and creates lasting bonds.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
          <i className="fas fa-comments text-4xl mb-4 text-primary"></i>
          <h3 className="text-xl font-semibold mb-2">Meaningful Interactions</h3>
          <p className="text-center text-muted-foreground">
            Have real conversations and share experiences as your friend grows.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <Link 
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Get Started
          <i className="fas fa-arrow-right ml-2"></i>
        </Link>
        <p className="text-sm text-muted-foreground">
          Join thousands of users in creating lasting friendships
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Life Simulation</h2>
          <p className="text-muted-foreground">
            Friends in our world live dynamic lives spanning months to years, experiencing education, careers, relationships, and more.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Family Connections</h2>
          <p className="text-muted-foreground">
            Every friend is part of an interconnected network of relationships, creating rich family histories and social dynamics.
          </p>
        </div>
      </div>
    </div>
  )
}
