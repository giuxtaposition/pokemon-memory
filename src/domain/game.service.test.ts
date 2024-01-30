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
      const firstCard = game.getDeck().getCards()[10];
      game.selectCard(10);
      const secondCard = game
        .getDeck()
        .getCards()
        .findIndex((card) => card.id === firstCard.id);
      game.selectCard(secondCard);

      expect(game.getDeck().getCards()[10].isFlipped).toBeTruthy();
      expect(game.getDeck().getCards()[secondCard].isFlipped).toBeTruthy();
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
  });
});
