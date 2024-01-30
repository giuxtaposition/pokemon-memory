import Deck from "./deck";

export type GameStatus = "WON" | "IN_PROGRESS" | "LOST";

export default class GameService {
  protected deck: Deck;
  protected lastSelectedCardPosition: number | null;
  protected status: GameStatus;

  constructor() {
    this.deck = Deck.createDeck();
    this.lastSelectedCardPosition = null;
    this.status = "IN_PROGRESS";
  }

  public static startGame(): GameService {
    return new GameService();
  }

  public selectCard(index: number) {
    this.deck.flipCard(index);

    if (this.lastSelectedCardPosition !== null) {
      if (!this.deck.checkMatch(index, this.lastSelectedCardPosition)) {
        this.deck.flipCard(index);
        this.deck.flipCard(this.lastSelectedCardPosition);
      }
      this.lastSelectedCardPosition = null;
      this.updateStatus();
      return;
    }

    this.lastSelectedCardPosition = index;
  }

  public getDeck(): Deck {
    return this.deck;
  }

  public getStatus(): any {
    return this.status;
  }

  private updateStatus(): void {
    if (this.deck.getCards().every((card) => card.isFlipped)) {
      this.status = "WON";
    }
  }
}
