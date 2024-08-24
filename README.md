# Boatzy

> Virtual Yatzy scoreboard

Live at https://boatzy.onrender.com

## How to use
### General
- Note that this isn't a standalone game, but a virtual scoreboard with handy helper tools for calculation and keeping track of turns
- Being familiar with basic [Yatzy rules](https://en.wikipedia.org/wiki/Yatzy) is still required
- Players also need 5 dice
- To be clear, user and player are referenced here separately, as the user might just be the scorekeeper and not the actual player whose turn it is
- Can be played on a phone or any larger device

### Preparation
1. User adds as many players as needed
2. Players can be then renamed or deleted by clicking on player name

### Gameplay
1. User then inputs the current player's thrown die combination by tapping on the dice on the bottom of the screen
2. The potential points for each row are then calculated by the application
3. User taps on row of player's choosing
4. Turn automatically changes -> Repeat until all cells are filled

### Additional features
- Player's turns can be skipped if player is not available at the moment
  - The application keeps track on how many turns each player is behind, and lets the player catch up on their next non-skipped turn
- Players can be added mid-game
  - New players are allowed to catch up to other players on their first turn


## Technical summary
### General
- [Vite](https://vitejs.dev/)/[React](https://react.dev/) application written in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### State
- Application global state is managed with [React Context API](https://react.dev/reference/react/useContext)
  - This could actually be an area to optimize in, as the state is quite complicated, and most of the state is rewritten on each user action

### Visuals
- Styles are created using [Material UI](https://mui.com/material-ui/)
- App is fully scaling down to a small smartphone screen
- Animations are created using [Framer Motion](https://www.framer.com/motion/)
- Confetti animation is created using [react-canvas-confetti](https://www.npmjs.com/package/react-canvas-confetti)

### Testing
- [E2E tests](https://katalon.com/resources-center/blog/end-to-end-e2e-testing) are implemented using [Playwright](https://playwright.dev/)
- E2E tests are separated into a separate project from client
  - This is to help understand that they are run completely separately from each other
- Personal note: This is the first I've used Playwright, and it made a great impression. The fully async/await pattern and concurrent test runs (without even mentioning the multi-platform tests!) make the whole test creating/test running process feel extra smooth
- (Screenshot)Snapshots are used for testing that the dice buttons are rendering correct images 

### Code formatting and linting
- [ESLint](https://eslint.org/) is used to enforce code quality automatically
- [Prettier](https://prettier.io/) is used to enforce formatting rules
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) is used for integrating Prettier into ESLint
  - This allows all code quality and formatting rules to be checked simply with `npm run lint`

### CI/CD
- [GitHub Actions](https://docs.github.com/en/actions) is used to automate build verification, tagging, publishing and deployment
- Verification job runs linter, builds the app, and runs the E2E tests
- Tagging job tags the commit with a new [semantic version](https://semver.org/)
- Publishing job creates a [Docker image](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/) of the application
- Deployment job triggers a [Render](https://render.com/) deployment and waits for it to complete
- Render doesn't actually use the Docker image for deployment, but it's just for potentially changing the hosting service down the line
