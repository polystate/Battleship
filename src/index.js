import "./styles.css";
import gameLoop from "./Loop.js";
import { initializeDOM, handleUserInput } from "./DOM.js";

initializeDOM();
handleUserInput();
gameLoop();
