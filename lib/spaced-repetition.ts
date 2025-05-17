// SM-2 Spaced Repetition Algorithm
// Based on the SuperMemo SM-2 algorithm: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2

export interface CardReviewData {
  repetitions: number // number of successful reviews in a row
  easiness: number // easiness factor (1.3 - 2.5)
  interval: number // interval in days
  nextReview: Date // next review date
}

export interface Card {
  id: string
  front: string
  back: string
  reviewData?: CardReviewData
}

// Quality is 0-5, where:
// 0 = complete blackout
// 1 = incorrect response; the correct one remembered
// 2 = incorrect response; where the correct one seemed easy to recall
// 3 = correct response recalled with serious difficulty
// 4 = correct response after a hesitation
// 5 = perfect response
export function calculateNextReview(quality: number, repetitions = 0, easiness = 2.5, interval = 1): CardReviewData {
  // Ensure quality is between 0 and 5
  quality = Math.max(0, Math.min(5, quality))

  // Calculate new easiness factor
  let newEasiness = easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (newEasiness < 1.3) newEasiness = 1.3

  // Calculate new interval and repetitions
  let newInterval: number
  let newRepetitions: number

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

  // Calculate next review date
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + newInterval)

  return {
    repetitions: newRepetitions,
    easiness: newEasiness,
    interval: newInterval,
    nextReview,
  }
}

// Get cards due for review today
export function getDueCards(cards: Card[]): Card[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return cards.filter((card) => {
    if (!card.reviewData?.nextReview) return true // New cards are always due

    const nextReview = new Date(card.reviewData.nextReview)
    nextReview.setHours(0, 0, 0, 0)

    return nextReview <= today
  })
}

// Calculate retention rate (percentage of correct responses)
export function calculateRetentionRate(correctResponses: number, totalResponses: number): number {
  if (totalResponses === 0) return 0
  return Math.round((correctResponses / totalResponses) * 100)
}
