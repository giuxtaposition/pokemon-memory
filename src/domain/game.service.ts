import Deck from "./deck";

export default class GameService {
  deck: Deck;

  constructor() {
    this.deck = Deck.createDeck();
  }

  public static startGame(): GameService {
    return new GameService();
  }

  public getDeck(): Deck {
    return this.deck;
  }
}
