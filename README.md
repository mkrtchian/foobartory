# Foobartory

Foobartory is a game of factory management. The goal is to buy 20 robots in the factory the fastest possible.

[A live version of the game is available on github pages](https://mkrtchian.github.io/foobartory/), it is redeployed at each PR that gets integrated.

It is responsive so it can also be played on mobile.

# Features

There are 4 locations where actions can be done:

- The foo mine where a robot ca mine foos (takes 1 second).
- The bar mine where a robot ca mine bars (takes 0.5 to 2 seconds).
- The assembling factory where a robot can build 1 foobar from 1 foo and 1 bar (takes 2 seconds).
- The shop where a robot can buy immediately another robot for 3 foobars and 6 foos.

For each robot, the game chooses randomly to move (any move will take 5 seconds) or to stay at the current location and do an action if possible. When deciding to move, it decides also randomly where to move.

The player can change the probability to move, and the relative weights of the 4 locations to influence how often they are chosen.

# Install and run locally

This app has been bootstrapped with `create-react-app` using the typescript template.

- To install you need Node.js, preferably 16+.
- Then you can install yarn if not already installed with `npm install -g yarn`.
- The installation is done by simply typing `yarn` in the cloned repository.

## Run the tests

To run the linter and the tests:

```bash
yarn lint
yarn type
yarn test
```

To run also integration tests, you need to set `INTEGRATION_TESTING` environment variable to true.

## Run the app

```bash
yarn start
```

This opens the default browser automatically to display the app.

# Code details

The code is separated in 2 parts: the domain using pure Typescript and the UI using React.

The UI has an instance of the domain, and calls methods on it, or subscribes to get updated.

The main game logic is run in the domain with `requestAnimationFrame`. On each frame the Strategy decides what to do next with all the freezed actors.

# Enhancements

The possible enhancements are listed in [the issues](https://github.com/mkrtchian/foobartory/issues).
