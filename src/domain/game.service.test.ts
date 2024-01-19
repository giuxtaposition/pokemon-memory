import GameService from "./game.service";

describe("GameService", () => {
  it("startGame should create a new game with a deck", () => {
    const game = GameService.startGame();

    expect(game.getDeck()).toBeDefined();
  });
});
