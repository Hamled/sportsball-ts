# Sportsball TDD Practice
My Typescript solution to a coding challenge for practicing Test Driven Development. This challenge was provided by the [Seattle Software Crafters meetup group](https://www.meetup.com/seattle-software-craftsmanship).

## Description
The challenge is to develop a simulation program for an abstract version of baseball.

There are two methods defined in the problem statement:
* `addEntry(score) => void` - this function accepts a number representing the outcome of a particular player's time at bat. The number can be 0 meaning they were struck out (or otherwise put out); a 1, 2, or 3 meaning they ended their run for that turn on one of the bases; or a 4 meaning they hit a home run.
* `getScore() => string` - this function returns a string representing the current score for both the home and away teams. It should have the format `Home: ## Away: ##`.

As an abstract version of baseball, several of the key rules of that game are specified:
* The first player at bat is from the away team.
* Each successive player is on the same team, unless a total of three outs have been recorded. In that case, the team at bat switches, the bases are cleared, and the number of outs is reset to zero.
* Multiple players cannot be on the same base simultaneously. If a player's recorded hit has them land on a particular base, any players already on that base (or previous bases) are advanced to successive bases as necessary to "make room" for the additional player.
* If a player's recorded hit is a home run, or they are advanced beyond third base due to the prior rule, a point is scored for their team.

Some aspects of the real game of baseball are not considered:
* Base advancement is only through "forced plays" when runners on previous bases (or from home plate) are advancing. Stolen bases and pickoffs do not occur.
* All aspects of batting and pitching are reduced to the outcome number, e.g. a walk is considered the same as a single base hit.
* The game does not have a specified end point. Innings are not tracked, and the program accepts additional recorded at bat results after nine innings' worth of turns. Likewise, tie scores are also not considered in whether the game ends.

## Installation
### Prerequisites
You need to have a recent version of [Node.js](https://nodejs.org) and [NPM](https://npmjs.com).

1. Clone the repository and `cd` into that cloned directory.
1. `npm install` to install dependencies.
1. `npm test` to run the test suite.
