# Seesaw Simulation

This project is a simple seesaw simulation built using plain JavaScript, HTML and CSS.

<img width="1044" height="818" alt="seesaw" src="https://github.com/user-attachments/assets/80114c75-7679-4cb6-934d-69d0c6aa4064" />

## Thought Process & Design Decisions

While building this project, my main goal was to create a simple and understandable simulation rather than a fully realistic physics system.

- Each dropped object is stored as an item with:
  - its weight
  - its distance from the center

- I used a simplified torque logic:
  - torque = weight × distance

- The angle of the beam is calculated based on the difference between the left and right sides.

- For the visual part, I used CSS `transform: rotate()` to rotate the beam.

- All items are kept in an array and re-rendered every time a new item is added. This made the logic easier to manage.

## Trade-offs & Limitations

- The physics is simplified and not fully realistic.
- I scaled the angle using a divisor (like `/30`) to keep the movement visually stable.
- Distances are calculated in pixels, not real-world units.
- Items do not collide or stack; they are just placed visually.

## AI Assistance

I used AI tools during development for:
- improving code readability
- small UI and logic suggestions
- debugging and understanding some parts better

However, I understand how the code works and the main logic and structure were implemented by me.

## Features

- Click on the beam to drop random weights
- Real-time balance calculation using torque logic
- Dynamic beam rotation with smooth animation
- Activity log (newest entries appear on top)
- State persistence with LocalStorage (items, angle, logs, upcoming weight)
- Visual differentiation of items (size & color based on weight)
- Sound effect on interaction
- Reset simulation functionality


## Technologies

- HTML
- CSS
- JavaScript (Vanilla)
