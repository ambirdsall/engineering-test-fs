## Zesty.ai engineering test challenge UI
I added the frontend, a typescript version of a `create-react-app` app, in the `ui/` subdirectory.
It is dockerized, so to run everything (database, apis, and ui), go to the repo's base directory and run
```sh
docker-compose up
```

### features
- Takes a longitude, latitude, and search radius from a form, and finds all properties in that range. Properties
are displayed in both a list and on an embedded google map.
- Hovering over either a map marker or a
property card (the data from the API was sparse enough that it seemed like the best UI) highlights
it and its corresponding pair.
- Hovering over a property image causes its overlay to be shown.
- Clicking on a map marker causes a custom tooltip with property data to be displayed. I opted not to
use the Maps API's built-in Info Windows but I didn't feel strongly about the choice.
- Clicking on a property card takes users to a new page at a shareable `/details/:propertyId` with a
  larger image (with the same "hover for overlay" behavior) and more detailed stats.

### regrets
The big one is no tests. I prefer to test as I go, but I found the addition of typescript added
enough time to the development process, while mechanically ensuring that one of the most common
genres of react bug (prop mishandling) would be caught at build time, that I opted out.

Along those lines, if I were to do this again, I would just use vanilla javascript instead of
typescript: static typing prevents bugs from hurried fixes and refactoring existing code, which more
than makes up for the hassle in the long run, but is less useful for a short-term, disposable coding
challenge. To make things worse, the hassles of typescript are frontloaded, when first setting up
possibly-untyped 3rd-party dependencies and when there are no existing components to use as cheat
sheets for component type signatures.

I also think it would have been nice to show the property stats in the tooltip, but it seemed
as though the effort/demonstration of my skills ratio wasn't great, and the project had already
taken me a bit longer than planned.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
