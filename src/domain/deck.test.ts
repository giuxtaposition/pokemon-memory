import Deck, { Card } from "./deck";

describe("Deck", () => {
  describe("createDeck", () => {
    it("should create a deck with 52 cards", () => {
      const deck = Deck.createDeck();
      expect(deck.getCards()).toHaveLength(52);
    });

    it("should create a deck with each card having a twin", () => {
      const deck = Deck.createDeck();
      const groupCardsById = deck.getCards().reduce(
        (result, card) => ({
          ...result,
          [card.id]: [...(result[card.id] || []), card],
        }),
        {} as { [key: string]: Card[] },
      );

      expect(
        Object.values(groupCardsById).every((group) => group.length === 2),
      ).toBeTruthy();
    });

    it("should create a deck with random placement of cards", () => {
      const deck = Deck.createDeck();
      const anotherDeck = Deck.createDeck();

      expect(deck.getCards()).not.toEqual(anotherDeck.getCards());
    });

    it("should create a deck with all cards covered", () => {
      const deck = Deck.createDeck();

      expect(deck.getCards().every((card) => !card.isFlipped)).toBeTruthy();
    });
  });

  describe("flipCard", () => {
    let deck: Deck;
    beforeEach(() => {
      deck = Deck.createDeck();
    });

    it("should cover card if covered and cover if uncovered", async () => {
      deck.flipCard(8);
      expect(deck.getCards()[8].isFlipped).toBeTruthy();

      deck.flipCard(8);
      expect(deck.getCards()[8].isFlipped).toBeFalsy();
    });
  });

  describe("checkMatch", () => {
    it("should return true if card id matches another card id", () => {
      const deck = Deck.createDeck();
      const firstCard = deck.getCards()[10];
      const secondCard = deck
        .getCards()
        .findIndex((card) => card.id === firstCard.id);
      expect(deck.checkMatch(10, secondCard)).toBeTruthy();
    });

    it("should return false if card id does not match another card id", () => {
      const deck = Deck.createDeck();
      const firstCard = deck.getCards()[10];
      const secondCard = deck
        .getCards()
        .findIndex((card) => card.id !== firstCard.id);
      expect(deck.checkMatch(10, secondCard)).toBeFalsy();
    });
  });
});
