# Reddit example app with Next.js, TypeScript and Redux

This example shows the top list of Reddit posts and allows the user to see the posts details.
For a better experience, pagination is included.

Live example: https://next-redux-reddit-example.now.sh/

## Requirements
* Node.js 10.13 or later
* MacOS, Windows and Linux are supported

## How to use

### Set up project
Install project dependencies:
```bash
npm install
```

### Running in development environment
```bash
npm run dev
```
Access the application in http://localhost:3000

### Running in production
First build the production assets
```bash
npm run build
```

Then you can either run a production server locally
```bash
npm start
```

Or you can deploy the production assets, in this case we use Vercel's Now
```bash
now deploy
```

## Architecture and design decisions

### Frameworks, tools and libraries
* Next.js: This is the base building block of the project, Next.js provides the initial scaffolding, a framerwork to develop and build a React application with conventions over configuration. It provides Production ready features, Server-side rendering support, routing, asset bundling, transpiling, hot code reloading and much more. It certainly provides a great development experience.

* TypeScript: It was chosen for static type checking over Flow due to it's better support it has with my editor of choice (more on this later). It provides a lot of useful documentation of library APIs and type error checking. Using any type checking tool for JavaScript is a must due to the highly dynamic nature of the language which makes it pretty error prune and unreliable.

* Redux: This is one of the most popular choices for state management in React, together with Apollo GraphQL in my opinion. Redux has the advantage of working without a GraphQL server it places and provides a lot of tools that are accepted by the industry. It is used to handle API calls, store state and persist it to the browser's storage. It provides a high flexibility leveraging a huge number of plugins and middlewares, some of which I'm going to address later.

* Prettier: This is my first project using Prettier and I have to say this provides an excellent development experience. As a software engineer, I value organized and consistent code. It makes code easier to read and understand, but often times having different developer with totally different coding styles which are opinionated and subjective makes this very hard to achieve, justify and keep enforcing. Here comes Prettier, an auto-formatter which uses convention over configuration and it is pretty easy to setup. It formats all the source code on each save and achieves the goal of having a beautiful codebase without worrying about formatting code manually and coding style discusions.

* ESLint: For some time now, one of the most popular JavaScript linters. It provides great support with it's recommeded rules, React support and TypeScript support. This is another invaluable code for detecting errors together with a type checking tool.

* Visual Studio Code: This is my editor of choice, it is pretty lightweight, it is a pretty popular choice among the community and it has excellent built-in support for TypeScript. I don't need much more than that as a development environment, I prefer it being lean and module rather than heavily and bloated such as WebStorm, IntelliJ and other similar IDEs. I configured VSCode to run ESLint together with Prettier in each file save and when the editor loses focus, so I can keep my files linted and formatted properly all the time. I provided my VSCode configuration in this repo.

* Redux Toolkit: This is the first project that I use this library extensively, I used some of the tools it provides in the past but this time I decided to embrace the use of Slices to abstract how I build reducers and actions, following standard Redux practices. It proved to be a very good choice, allowing to remove a lot of boilerplate which is one of the biggest negative points of Redux in my opinion. As the app gets larger, Redux requires more boilerplate to work. This library helps overcome that issue and I'm pretty happy with my experience so far.

* Redux Persist: Another library that I use for the first time, it works as intended. It wraps the redux store and reducers allowing to serialize, persist and rehidrate the data very easily.

* Material-UI: The pretty part of the project, this library of Material-UI React components provides the beauty of the project UI. I'm pretty happy with the development experience, documentation and flexibility of the library. 

* Moment.js: I've been using this library for a long time now, absolutely vital for managing dates in JavaScript. The built-in date support in JavaScript is awful and Moment provides a super easy to use yet powerful API.

* React-infinite-scroller: A simple React component to manage the complex feature of implementing an infinite scroll pagination. It works fine although I encountered some bugs and the experience wasn't very smooth. But I think it is one of the best solutions available for this feature.

* Axios: I used this HTTP client library for a while, it uses Promises and provides a good API which is more feature rich than the native fetch API. It works properly for my basic networking needs.

* Jest & Enzyme: Jest is the JavaScript testing framework built by Facebook to be used together with React due to its snapshot testing support. To complement it, I use Enzyme by Airbnb for rendering components and using its flexible selectors to query and manipulate the virtual DOM.

### Design decisitions
I wanted to take the opportunity of this challenge to use some new framework, libraries and tools that I haven't used before in order to have a great developer experience, an excellent product with a good-looking UI, make it robust and scalable. Also, I want to follow the best practices stablished and proven by the industry. By prefering convention over configuration, I want to focus as much as possible in developing and testing the Application code and not that much time and effort spent in scaffolding and building the architecture.

I chose Material-UI because I think it is one of the best looking UI frameworks, it works great in mobile because it was implement in Android first, and provides a lot of tools ready to use in the front-end. 
The app uses the Drawer layout, providing a drawer to the left and a content detail view to the right, together with an app bar on the top. On mobile devices, the drawer is collapsed into a menu icon on the app bar which expands the drawer as a floating element from the left of the screen.

The reddit post detail displays the post information, media content (pictures and videos) and a link to the source. On the drawer, there is a list of reddit posts implementing infinite scroll pagination, when the user reaches the bottom of the list a loading icon is rendered and another page is requested. This is the same as Reddit's pagination. There are cross buttons with a tooltip on each list item which are meant to dismiss each post and "Dismiss All" button at the bottom of the list to hide all the posts. As dismissing all the posts renders the app unsuable as there are no more posts available, this button changes color and copy to enable the user to show all the posts back, returning to the initial state. This was made for better user experience and easier testing, because these changes are persisted to the browser's local storage and the only way to regain access to the app's functionality is to clear this storage, which is not trivial for users.

For managing state, I heavily relied on Redux-toolkit's Slices feature, which generates standard redux actions from reducers definitions. Also it provides direct state manipulation by including the Immer library for immutable state. Apart from that, it provides utils to easily configure the Redux store and it includes Redux thunk for async operation, together with an util for creating async thunk action creators pretty easliy. It provides TypeScript definitions which greatly increases the developer experience.
