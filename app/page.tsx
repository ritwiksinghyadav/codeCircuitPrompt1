import Link from "next/link"
import { BookOpen, Plus, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Home() {
  // Sample deck data - in a real app, this would come from a database
  const decks = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description: "Core concepts of JavaScript programming",
      totalCards: 42,
      dueCards: 7,
      mastery: 68,
    },
    {
      id: "2",
      title: "React Hooks",
      description: "Understanding React hooks and their usage",
      totalCards: 24,
      dueCards: 12,
      mastery: 45,
    },
    {
      id: "3",
      title: "CSS Grid & Flexbox",
      description: "Modern CSS layout techniques",
      totalCards: 18,
      dueCards: 3,
      mastery: 82,
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
          <p className="text-muted-foreground mt-1">Manage your decks and track your learning progress</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/stats">
              <BarChart3 className="mr-2 h-4 w-4" />
              Statistics
            </Link>
          </Button>
          <Button asChild>
            <Link href="/decks/new">
              <Plus className="mr-2 h-4 w-4" />
              New Deck
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck) => (
          <Card key={deck.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{deck.title}</CardTitle>
              <CardDescription>{deck.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Mastery</span>
                  <span className="font-medium">{deck.mastery}%</span>
                </div>
                <Progress value={deck.mastery} className="h-2" />
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Total Cards</span>
                    <span className="font-medium">{deck.totalCards}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Due Today</span>
                    <span className="font-medium text-orange-500">{deck.dueCards}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" asChild>
                <Link href={`/decks/${deck.id}`}>Manage</Link>
              </Button>
              <Button asChild>
                <Link href={`/review/${deck.id}`}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Review
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
