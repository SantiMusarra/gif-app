# GifApp
 This WebApp displays gifs from Giphy by using the [Giphy REST Api](https://developers.giphy.com/docs/api#quick-start-guide) . This WebApp let's you explore, search and mark as favorite the gifs that you like.
 
# Dependencies
This app requires bootstrap 4.x and bootstrap-icon 1.5.0 for a better looking and responsive UI.

# Project Structure
The app is divided among six component apart for the app component which is the main component of the app and where the other components are nested:

- The Header component allows you to nagivate through the app and it's where you can search for other gifs
- The Gifs container component which display the trending gifs that are automatically loaded upon reaching the bottom of the screen 
- The Search list component which display the gifs based on the search query
- The Favorite container component which display the gifs that you marked as favourite
- The Gif card component which display a preview of the gif in fixed dimensions
- The Gif detail component which display a detailed view of the gif selected

# Instruction 
 1. Before running 'ng build' make sure to run 'npm i' 
 2. For a local run use 'ng serve' and navigate to http://localhost:4200/. 


# Images
![App Screenshot](src/img/gifAppScreenshot1.png)

# Try it out!

[Click this link to try the app!](https://smghifii.web.app/)
