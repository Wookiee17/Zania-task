# Front End Application

# Overview

This project is a simple front-end application built with React. It loads a static JSON file containing information about various document types and displays them as cards in a grid layout. The application features drag-and-drop functionality to reorder the cards, and clicking on a card displays an image overlay.

# Features

Grid Display: Display 5 cards in a grid layout (3 in the first row, 2 in the second row).
Thumbnails: Assign different thumbnails to each document type.
Loading Spinner: Display a placeholder spinner for each image while loading.
Drag-and-Drop: Reorder cards via drag-and-drop functionality.
Image Overlay: Clicking on a card displays the image in an overlay, with ESC to close the overlay.
**Prerequisites**
Node.js (version >= 12.x)
npm (version >= 6.x)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/your-repo.git
cd your-repo
**Install the dependencies:**

bash
Copy code
npm install
Running the Application:
npm run dev
Development server start:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000.

# Project Structure

public/: Contains the static JSON file and public assets.
src/: Contains the React components and main application logic.
components/: Contains individual React components like Card, Grid, and Overlay.
App.js: Main entry point of the application.
index.js: Entry point for React.
**Implementation Details**

1. Loading Static JSON
   The JSON file (data.json) is placed in the public directory.
   It is loaded in App.js using a fetch request.
2. Displaying Cards
   The JSON data is mapped to Card components.
   Each card displays a thumbnail image and a title.
3. Placeholder Spinner
   A placeholder spinner is shown while each image is loading.
4. Drag-and-Drop Functionality
   Implemented using the react-dnd library.
   Cards can be reordered by dragging and dropping them within the grid.
5. Image Overlay
   Clicking on a card opens an overlay displaying the full image.
   The overlay can be closed by pressing the ESC key.
   Usage Instructions
   Reorder Cards: Click and drag any card to a new position within the grid.
   View Image: Click on any card to view the full image in an overlay.
   Close Overlay: Press the ESC key to close the image overlay.
   Customization
   Thumbnails: You can change the thumbnail images by updating the Card component.
   Data: To modify the displayed data, update the data.json file in the public directory.
   Thought Process
   The project follows a component-based architecture to ensure reusability and modularity. The react-dnd library was chosen for its simplicity and integration with React's component model. The goal was to keep the UI intuitive and responsive, using modern React features such as hooks and functional components.

# Conclusion

This project demonstrates the implementation of a simple yet functional front-end application using React. It showcases the ability to handle JSON data, display it in a user-friendly manner, and implement interactive features like drag-and-drop and overlays.

Feel free to explore the code and customize it to fit your needs. Happy coding!
