# Battleship Game

This is a simple implementation of the classic game Battleship using JavaScript. The game allows two players to place their ships on a 10x10 grid and take turns attacking each other's grids. The game continues until all the ships of one player are sunk, and the other player wins.

## How to Play

1. Clone or download this repository to your local machine.
2. Open the `index.html` file in your web browser.
3. Each player's grid is represented by two grids on the page. The left grid is for Player 1, and the right grid is for Player 2 (computer-controlled).
4. Player 1 starts by placing their ships on the grid by clicking on the cells.
5. The ships can be placed either horizontally or vertically. Use the "Set Vertical" and "Set Horizontal" buttons to switch the ship orientation.
6. Click on the desired ship and then click on the grid cells to place the ship. If the placement is valid, the ship will be displayed on the grid.
7. After Player 1 finishes placing their ships, click the "Start Game" button to begin the game. The computer will randomly place its ships.
8. Take turns attacking each other's grids by clicking on the cells. If a ship is hit, the cell will turn red. If the shot misses, the cell will turn gray.
9. The game ends when all the ships of one player are sunk. The player with ships remaining wins.

## Files and Functionality

1. **Gameboard.js**: This file contains the factory function `Gameboard`, which represents a player's gameboard. It handles ship placement, attack tracking, and checks for game over conditions.

2. **Player.js**: This file contains the factory function `Player`, which represents a player. It extends the `Gameboard` factory and adds functionality for attacking the enemy and selecting random attack coordinates for the computer-controlled player.

3. **Ship.js**: This file contains the factory function `Ship`, which represents a ship. It stores information about the ship's name, length, locations, and if it has been hit or sunk.

4. **Game.js**: This file handles the game setup and gameplay logic. It listens for player clicks, controls the turns, and checks for the game's end conditions.

5. **Setup.js**: This file initializes the game grids, handles ship placement, and contains utility functions for handling grid cells.

## Dependencies

This implementation does not use any external libraries or frameworks. It runs directly in the browser using vanilla JavaScript.

## Acknowledgments

The implementation of the Battleship game logic and user interface is solely for educational purposes. It demonstrates concepts such as factory functions, event handling, and DOM manipulation using JavaScript.

## Credits

This Battleship game was created by Dock Adams. It is part of [The Odin Project](https://www.theodinproject.com/) curriculum, where you can find other interesting coding projects and resources.
