import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Zap, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16))] bg-white dark:bg-[#020817]">
      <main className="flex-1 w-full max-w-4xl px-4 py-8 md:px-6 md:py-12">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-16">
          <BookOpen className="mx-auto h-16 w-16 text-[#1877f2] dark:text-[#4599ff] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 dark:text-white">
            Master Anything with FlashLearn
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            The smart, simple, and effective way to study with flashcards. Boost your learning and retention with our spaced repetition system.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-[#1877f2] hover:bg-[#166fe0] text-white dark:bg-[#4599ff] dark:hover:bg-[#1877f2]">
              <Link href="/decks/new">Create New Deck</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#1877f2] text-[#1877f2] hover:bg-blue-50 dark:border-[#4599ff] dark:text-[#4599ff] dark:hover:bg-[#16213a]">
              <Link href="/decks">Browse Decks</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#16213a] rounded-lg shadow-sm border border-gray-200 dark:border-[#22304a]">
            <Zap className="h-10 w-10 text-[#42b72a] mb-3" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Efficient Learning</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Utilize our spaced repetition algorithm to study smarter, not harder.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#16213a] rounded-lg shadow-sm border border-gray-200 dark:border-[#22304a]">
            <BookOpen className="h-10 w-10 text-[#a259ff] mb-3" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Organize Your Decks</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Easily create, manage, and categorize your flashcard decks.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#16213a] rounded-lg shadow-sm border border-gray-200 dark:border-[#22304a]">
            <BarChart3 className="h-10 w-10 text-[#f7b928] mb-3" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Track Your Progress</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Monitor your learning statistics and see how far you've come.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 md:py-16 bg-[#e7f3ff] dark:bg-[#16213a] rounded-lg">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Ready to Start Learning?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Join FlashLearn today and take the first step towards mastering new subjects.
          </p>
          <Button asChild size="lg" className="bg-[#1877f2] hover:bg-[#166fe0] text-white dark:bg-[#4599ff] dark:hover:bg-[#1877f2]">
            <Link href="/decks">Get Started Now</Link>
          </Button>
        </section>
      </main>
    </div>
  )
}