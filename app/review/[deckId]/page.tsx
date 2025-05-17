"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, X } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Sample flashcard data - in a real app, this would come from a database
const sampleFlashcards = {
  "1": [
    {
      id: "101",
      front: "What is JavaScript?",
      back: "JavaScript is a programming language that enables interactive web pages and is an essential part of web applications.",
    },
    {
      id: "102",
      front: "What is a closure in JavaScript?",
      back: "A closure is a function that has access to its own scope, the scope of the outer function, and the global scope.",
    },
    {
      id: "103",
      front: "What is the difference between let and var?",
      back: "let is block-scoped while var is function-scoped. let was introduced in ES6 and helps prevent issues with hoisting.",
    },
    {
      id: "104",
      front: "What is the DOM?",
      back: "The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.",
    },
    {
      id: "105",
      front: "What is event bubbling?",
      back: "Event bubbling is a method of event propagation in the HTML DOM where an event first triggers on the innermost target element, and then triggers on ancestors of the target element in the same nesting hierarchy.",
    },
  ],
  "2": [
    {
      id: "201",
      front: "What is useState?",
      back: "useState is a React Hook that lets you add state to functional components.",
    },
    {
      id: "202",
      front: "What is useEffect?",
      back: "useEffect is a React Hook that lets you synchronize a component with an external system.",
    },
    {
      id: "203",
      front: "What is useContext?",
      back: "useContext is a React Hook that lets you read and subscribe to context from your component.",
    },
  ],
  "3": [
    {
      id: "301",
      front: "What is CSS Grid?",
      back: "CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns.",
    },
    {
      id: "302",
      front: "What is Flexbox?",
      back: "Flexbox is a one-dimensional layout method for laying out items in rows or columns. Items flex to fill additional space and shrink to fit into smaller spaces.",
    },
  ],
}

// SM2 algorithm implementation (simplified)
function calculateNextReview(quality: number, repetitions: number, easiness: number, interval: number) {
  // Quality is 0-5, where 0 is complete blackout and 5 is perfect recall
  // For this demo, we'll use 0 for "I don't know" and 5 for "I know it"
  quality = quality === 0 ? 0 : 5

  // Calculate new easiness factor
  let newEasiness = easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (newEasiness < 1.3) newEasiness = 1.3

  // Calculate new interval
  let newInterval
  let newRepetitions

  if (quality < 3) {
    // If quality is less than 3, reset repetitions
    newRepetitions = 0
    newInterval = 1
  } else {
    // If quality is 3 or greater, increment repetitions
    newRepetitions = repetitions + 1

    if (newRepetitions === 1) {
      newInterval = 1
    } else if (newRepetitions === 2) {
      newInterval = 6
    } else {
      newInterval = Math.round(interval * newEasiness)
    }
  }

  return {
    repetitions: newRepetitions,
    easiness: newEasiness,
    interval: newInterval,
    nextReview: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000),
  }
}

export default function ReviewPage({ params }: { params: Promise<{ deckId: string }> }) {
  const router = useRouter()
  const { deckId } = React.use(params)

  const [cards, setCards] = useState<any[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [progress, setProgress] = useState(0)
  const [reviewComplete, setReviewComplete] = useState(false)

  // In a real app, we would load cards due for review from a database
  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(sampleFlashcards, deckId)) {
      setCards(sampleFlashcards[deckId as keyof typeof sampleFlashcards] || [])
    }
  }, [deckId])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleResponse = (quality: number) => {
    // In a real app, we would update the card's review schedule in the database
    // using the SM2 algorithm
    const card = cards[currentCardIndex]
    const nextReview = calculateNextReview(quality, card.repetitions || 0, card.easiness || 2.5, card.interval || 1)

    console.log(`Card ${card.id} next review:`, nextReview)

    // Move to the next card
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
      setProgress(((currentCardIndex + 1) / cards.length) * 100)
    } else {
      setReviewComplete(true)
    }
  }

  if (cards.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">No cards found</h1>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    )
  }

  if (reviewComplete) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Review Complete!</h1>
        <p className="mb-6">You've reviewed all cards in this deck.</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
          <Button
            onClick={() => {
              setCurrentCardIndex(0)
              setIsFlipped(false)
              setProgress(0)
              setReviewComplete(false)
            }}
          >
            Review Again
          </Button>
        </div>
      </div>
    )
  }

  const currentCard = cards[currentCardIndex]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 flex flex-col min-h-screen">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Review Cards</h1>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>
            {currentCardIndex + 1} of {cards.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md perspective-1000" onClick={handleFlip}>
          <div
            className={`relative transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
          >
            <Card className={`absolute w-full backface-hidden cursor-pointer ${isFlipped ? "hidden" : ""}`}>
              <CardContent className="flex items-center justify-center p-6 min-h-[300px]">
                <div className="text-xl font-medium text-center">{currentCard.front}</div>
              </CardContent>
            </Card>

            <Card className={`absolute w-full backface-hidden rotate-y-180 ${!isFlipped ? "hidden" : ""}`}>
              <CardContent className="flex items-center justify-center p-6 min-h-[300px]">
                <div className="text-xl text-center">{currentCard.back}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="text-center mb-4 mt-auto">
        {!isFlipped ? (
          <Button onClick={handleFlip} size="lg">
            Reveal Answer
          </Button>
        ) : (
          <div className="flex justify-center gap-4">
            <Button variant="destructive" size="lg" onClick={() => handleResponse(0)}>
              <X className="mr-2 h-4 w-4" />I don't know
            </Button>
            <Button variant="default" size="lg" onClick={() => handleResponse(5)}>
              <Check className="mr-2 h-4 w-4" />I know it
            </Button>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-muted-foreground mb-2">Click on the card to flip it</div>
    </div>
  )
}
