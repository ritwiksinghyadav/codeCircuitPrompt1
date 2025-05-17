"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import React from "react"

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

const deckTitles = {
  "1": "JavaScript Fundamentals",
  "2": "React Hooks",
  "3": "CSS Grid & Flexbox",
}

export default function DeckPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = React.use(params)
  const router = useRouter()
  const { toast } = useToast()

  const [cards, setCards] = useState<any[]>([])
  const [deckTitle, setDeckTitle] = useState("")
  const [isAddCardOpen, setIsAddCardOpen] = useState(false)
  const [isEditCardOpen, setIsEditCardOpen] = useState(false)
  const [currentCard, setCurrentCard] = useState<any>(null)
  const [newCardFront, setNewCardFront] = useState("")
  const [newCardBack, setNewCardBack] = useState("")

  // In a real app, we would load cards from a database
  useEffect(() => {
    if (deckId in sampleFlashcards) {
      setCards(sampleFlashcards[deckId as keyof typeof sampleFlashcards])
      setDeckTitle(deckTitles[deckId as keyof typeof deckTitles] || "Untitled Deck")
    }
  }, [deckId])

  const handleAddCard = () => {
    if (!newCardFront.trim() || !newCardBack.trim()) {
      toast({
        title: "Error",
        description: "Both front and back of the card are required.",
        variant: "destructive",
      })
      return
    }

    // In a real app, we would save to a database
    const newCard = {
      id: `new-${Date.now()}`,
      front: newCardFront,
      back: newCardBack,
    }

    setCards([...cards, newCard])
    setNewCardFront("")
    setNewCardBack("")
    setIsAddCardOpen(false)

    toast({
      title: "Card added",
      description: "Your new flashcard has been added to the deck.",
    })
  }

  const handleEditCard = () => {
    if (!newCardFront.trim() || !newCardBack.trim()) {
      toast({
        title: "Error",
        description: "Both front and back of the card are required.",
        variant: "destructive",
      })
      return
    }

    // In a real app, we would update in a database
    const updatedCards = cards.map((card) =>
      card.id === currentCard.id ? { ...card, front: newCardFront, back: newCardBack } : card,
    )

    setCards(updatedCards)
    setNewCardFront("")
    setNewCardBack("")
    setCurrentCard(null)
    setIsEditCardOpen(false)

    toast({
      title: "Card updated",
      description: "Your flashcard has been updated.",
    })
  }

  const handleDeleteCard = (cardId: string) => {
    // In a real app, we would delete from a database
    const updatedCards = cards.filter((card) => card.id !== cardId)
    setCards(updatedCards)

    toast({
      title: "Card deleted",
      description: "Your flashcard has been removed from the deck.",
    })
  }

  const openEditDialog = (card: any) => {
    setCurrentCard(card)
    setNewCardFront(card.front)
    setNewCardBack(card.back)
    setIsEditCardOpen(true)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{deckTitle}</h1>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <p className="text-muted-foreground">{cards.length} cards in this deck</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Flashcard</DialogTitle>
                <DialogDescription>
                  Create a new flashcard for your deck. Make sure both sides are filled out.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="front">Front (Question)</Label>
                  <Textarea
                    id="front"
                    value={newCardFront}
                    onChange={(e) => setNewCardFront(e.target.value)}
                    placeholder="Enter the question or prompt"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="back">Back (Answer)</Label>
                  <Textarea
                    id="back"
                    value={newCardBack}
                    onChange={(e) => setNewCardBack(e.target.value)}
                    placeholder="Enter the answer or explanation"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCardOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCard}>Add Card</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={() => router.push(`/review/${deckId}`)}>
            Review Deck
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Front</CardTitle>
              <CardDescription className="line-clamp-3">{card.front}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="text-sm font-medium mb-1">Back</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">{card.back}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="ghost" size="icon" onClick={() => openEditDialog(card)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteCard(card.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isEditCardOpen} onOpenChange={setIsEditCardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Flashcard</DialogTitle>
            <DialogDescription>Make changes to your flashcard.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-front">Front (Question)</Label>
              <Textarea id="edit-front" value={newCardFront} onChange={(e) => setNewCardFront(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-back">Back (Answer)</Label>
              <Textarea id="edit-back" value={newCardBack} onChange={(e) => setNewCardBack(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCardOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCard}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
