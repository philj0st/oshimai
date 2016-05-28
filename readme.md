#### installing
`git clone` and `npm install dev` then run with `npm start`

#### thoughts?
what is better? render on store changes or on requestAnimationFrame()? maybe on store's subscribe function?

position: [15,30] vs position: {x:15, y:30} vs victor.js

#### Roadmap
implement multiplayer with circles on canvas then replace renderer with pixi.js sprites and keep circles as hitboxes.

- circles on canvas
- revamp movement with rotation
- shoot sideways
- have multiple player logic
- local multiplayer
- WebRTC multiplayer
- pixi.js sprites

#### ideas for future implementations
- WebRTC (polyfill WebSockets)
- GamepadAPI
- WebWorkers
- victor.js *A JavaScript 2D vector maths library for Node.js and the browser.*
- Pixi.js *2D webGL renderer with canvas fallback*

#### used ES6/ES7 Features
- Spread Operator in Arrays and Objects
- Object Destructuring
- Object Literal Property Value Shorthand
- Modules (only import)
- Arrow Functions

#### Performance

##### Path2D objects
As we have seen in the last example, there can be a series of paths and drawing commands to draw objects onto your canvas. To simplify the code and to improve performance, the Path2D object, available in recent versions of browsers, **lets you cache or record these drawing commands**. You are able to play back your paths quickly.
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

##### Collision Performance
While some of these algorithms for collision detection are simple enough to calculate, it can be a waste of cycles to test *every* entity with every other entity. Usually games will split collision into two phases, broad and narrow.

Broad Phase

Broad phase should give you a list of entities that *could* be colliding. This can be implemented with a spacial data structure that will give you a rough idea of where the entity exists and what exist around it. Some examples of spacial data structures are Quad Trees, R-Trees or a Spacial Hashmap.

Narrow Phase

When you have a small list of entities to check you will want to use a narrow phase algorithm (like the ones listed above) to provide a certain answer as to whether there is a collision or not.
[MDN](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)

#### glossary
reducer - returns a new state given a state and an action
