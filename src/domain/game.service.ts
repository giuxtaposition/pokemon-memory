import Deck from "./deck";

export default class GameService {
  protected deck: Deck;
  protected lastSelectedCardPosition: number | null;

  constructor() {
    this.deck = Deck.createDeck();
    this.lastSelectedCardPosition = null;
  }

  public static startGame(): GameService {
    return new GameService();
  }

  public getDeck(): Deck {
    return this.deck;
  }

  public selectCard(index: number) {
    this.deck.flipCard(index);

    if (this.lastSelectedCardPosition) {
      if (!this.deck.checkMatch(index, this.lastSelectedCardPosition)) {
        this.deck.flipCard(index);
        this.deck.flipCard(this.lastSelectedCardPosition);
      }
      this.lastSelectedCardPosition = null;
      return;
    }

    this.lastSelectedCardPosition = index;
  }
}
