export type Card = {
  id: string;
  isFlipped: boolean;
};

export default class Deck {
  private readonly numberOfCards: number = 52;
  protected cards: Card[];

  constructor() {
    this.cards = [];
    this.generateDeck();
    this.shuffleDeck();
  }

  public static createDeck(): Deck {
    return new Deck();
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public flipCard(index: number) {
    const card = this.cards[index];
    card.isFlipped = !card.isFlipped;
  }

  checkMatch(cardPosition: number, anotherCardPosition: number) {
    return this.cards[cardPosition].id === this.cards[anotherCardPosition].id;
  }

  private generateDeck(): void {
    let cards: Card[] = [];
    for (let i = 0; i < this.numberOfCards / 2; i++) {
      cards.push({
        id: i.toString(),
        isFlipped: false,
      });
      cards.push({
        id: i.toString(),
        isFlipped: false,
      });
    }
    this.cards = cards;
  }

  private shuffleDeck(): void {
    let cards = this.cards;
    let currentIndex = cards.length;

    while (currentIndex > 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex],
        cards[currentIndex],
      ];
    }

    this.cards = cards;
  }
}
