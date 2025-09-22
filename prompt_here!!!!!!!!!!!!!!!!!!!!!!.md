I want to create a simple reaction game called "Light Catch" using HTML, CSS, and JavaScript (with canvas or p5.js).
Here are the requirements:

Game flow:

Before starting, the player can select the game duration (30 seconds or 60 seconds).
When the game starts, one circle (light spot) appears at a random position on the screen.
The player must click on the circle as fast as possible.
If the player clicks correctly, the circle disappears and a new one immediately appears in another random position.
If the player clicks outside the circle, nothing happens and the circle stays until the correct click.
Scoring & timer:

Show the current score at the top of the screen.
Show a countdown timer (30 or 60 seconds depending on the chosen duration).
When time runs out, stop the game and show the final score with a "Play Again" button.
UI & style:

Clean and simple design, centered canvas.
Circles should be clearly visible (bright colors).
Responsive so it works on desktop browsers.
Code structure:

Separate functions for drawing circles, handling clicks, updating score, and countdown.
Add comments for clarity.