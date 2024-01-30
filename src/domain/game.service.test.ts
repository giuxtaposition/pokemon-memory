import { Card } from "./deck";
import GameService from "./game.service";

describe("GameService", () => {
  it("startGame should create a new game with a deck", () => {
    const game = GameService.startGame();

    expect(game.getDeck()).toBeDefined();
  });

  describe("selectCard", () => {
    it("selectCard should let user uncover a card", async () => {
      const game = GameService.startGame();
      game.selectCard(10);

      expect(game.getDeck().getCards()[2 * 5].isFlipped).toBeTruthy();
    });

    it("selectCard should let user uncover another card and if matches previous card it should leave them both uncovered", async () => {
      const game = GameService.startGame();
      const indexes = getAllIndexes(game.getDeck().getCards(), "1");
      game.selectCard(indexes[0]);
      game.selectCard(indexes[1]);

      expect(game.getDeck().getCards()[indexes[0]].isFlipped).toBeTruthy();
      expect(game.getDeck().getCards()[indexes[1]].isFlipped).toBeTruthy();
    });

    it("selectCard should let user uncover another card and if not matches previous card it should flip them both", async () => {
      const game = GameService.startGame();
      const firstCard = game.getDeck().getCards()[10];
      game.selectCard(10);
      const secondCard = game
        .getDeck()
        .getCards()
        .findIndex((card) => card.id !== firstCard.id);
      game.selectCard(secondCard);

      expect(game.getDeck().getCards()[10].isFlipped).toBeFalsy();
      expect(game.getDeck().getCards()[secondCard].isFlipped).toBeFalsy();
    });

    it("selectCard after two flips should let user select another two cards before flipping them again", () => {
      const game = GameService.startGame();
      const indexes = getAllIndexes(game.getDeck().getCards(), "1");
      game.selectCard(indexes[0]);
      game.selectCard(indexes[1]);

      expect(game.getDeck().getCards()[indexes[0]].isFlipped).toBeTruthy();
      expect(game.getDeck().getCards()[indexes[1]].isFlipped).toBeTruthy();

      const indexes2 = getAllIndexes(game.getDeck().getCards(), "2");
      game.selectCard(indexes2[0]);
      game.selectCard(indexes2[1]);

      expect(game.getDeck().getCards()[indexes2[0]].isFlipped).toBeTruthy();
      expect(game.getDeck().getCards()[indexes2[1]].isFlipped).toBeTruthy();
    });

    it("if all cards are flipped player should have won", async () => {
      const game = GameService.startGame();
      const cards = groupById(game.getDeck().getCards());

      for (const card of Object.values(cards)) {
        const indexes = getAllIndexes(game.getDeck().getCards(), card[0].id);
        game.selectCard(indexes[0]);
        game.selectCard(indexes[1]);
      }

      expect(game.getStatus()).toBe("WON");
    });
  });

  function groupById(cards: any[]): { [key: string]: Card[] } {
    return cards.reduce((groupedCards, card) => {
      if (!groupedCards[card.id]) {
        groupedCards[card.id] = [];
      }
      groupedCards[card.id].push(card);
      return groupedCards;
    }, {});
  }

  function getAllIndexes(array: Card[], id: string) {
    let indexes = [],
      i;
    for (i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        indexes.push(i);
      }
    }
    return indexes;
  }
});
