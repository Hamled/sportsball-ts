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

## Design
One of the concerns that was brought up during discussion of the provided challenge description, was how tightly coupled the `addEntry` and `getScore` functions are. The first function is purely an input to some shared state, and the other is purely an output calculated from the same shared state.

This makes it difficult to achieve "proper" unit tests on each function separately, because the behavior of each function cannot be verified without some interaction from the other. While it was pointed out that this simply means the two functions together form a single unit and thus should be tested in that manner, I felt that would still result in a less than ideal environment for unit testing.

In an attempt to make things more ideal, I designed my implementation with one significant modification to the straight-forward approach. I separated the gameplay logic code from the state-tracking code that records the inputs and generates output based upon them.

Because the state being kept by program overall is a sequence of values, I felt that a natural way to implement the gameplay logic would be a [reducer function](https://en.wikipedia.org/wiki/Reduction_Operator). Generally speaking, reducers are written as pure functions so they operate only on their parameters as input and only have their return value as output. I have found that this is the ideal circumstance for unit testing, and because the gameplay logic is the most complex part of the program it would be good to have a clear and comprehensive set of unit tests for it.

Having extracted the gameplay logic into a separate unit that is tested independently the state-tracking code that lives in `addEntry` and `getScore` is greatly simplified, as are the tests. Most of the testing that I did for this code was to use fake, very simple implementations of the reducer function which didn't implement any gameplay logic.

As such, testing the results of the fake reducers when they were run by the state-tracker was as closer as I could come to ideal unit tests for those functions. I also wrote some tests using a mock reducer to more explicitly verify the stateful code was interacting with the reducer properly, by calling it in the manner that a reducer should be used.

Having now created two separate units, I also needed to write some integration tests to verify that the combination of the stateful code and the stateless reducer function resulted in correctly scoring a sequence of player turns representing a game.

For this I wrote up a test game as a set of nine innings, and I'm happy to say that all of the code worked to pass those tests without any modification. In fact, a couple of tests failed at first and after reviewing my own test cases more thoroughly (scoring each inning on paper instead of in my head this time), I discovered that the failed tests were due to my own mistakes in calculating the number of runs a team had.

That being said, writing some tests which pass the first time isn't generally what TDD is about (at least for unit tests), so I welcome any suggestions on how I could improve my integration testing process.

## Installation
### Prerequisites
You need to have a recent version of [Node.js](https://nodejs.org) and [NPM](https://npmjs.com).

1. Clone the repository and `cd` into that cloned directory.
1. `npm install` to install dependencies.
1. `npm test` to run the test suite.
