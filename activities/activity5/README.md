# CST-391: JavaScript Web Application Development

- Activity 5: React Music App Introduction
- Author: **Victor Manuel Marrujo Verdugo**
- College of Humanities and Social Sciences, Grand Canyon University
- Professor Bobby Estey
- May 10th, 2026

---

# Part 1 – Introduction

In this activity, React was introduced as a front-end JavaScript library for building user interfaces using reusable components. Two separate applications were built: a mini app called `statechanger` to demonstrate React state and props, and a `music` app that displays album cards using React components, state, and the CSS FlexBox layout system.

The activity covered core React concepts including JSX syntax, functional components, component properties (props), the `useState` hook for managing state, event handlers, and the JavaScript `map` function for dynamically rendering lists of components. Bootstrap 5 was added via CDN to style the music app's album cards.

---

# Part 1 – React Music App Introduction

## Setting Up the Music App

After running `npx create-react-app music`, all default files in the `src` folder were deleted and replaced with custom files. The entry point `index.js` bootstraps the application by rendering the root `App` component into the `#root` div in `public/index.html`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.querySelector("#root"));
```

**JSX** is the syntax used inside React components. It looks like HTML but is actually JavaScript. One important rule in JSX is that every component must return a **single parent element** ,  the following is incorrect because it has two root elements:

```javascript
// INCORRECT — two parent elements
const App = () => {
  return <div>This is the app!</div>
         <p>Some more text</p>
}

// CORRECT — wrapped in a single parent div
const App = () => {
  return (
    <div>
      <h2>This is the app!</h2>
      <p>Some more text</p>
    </div>
  )
}
```

Also note that in JSX, `class` is a reserved JavaScript keyword, so `className` is used instead. Inline styles are defined as JavaScript objects with double curly braces:

```javascript
// HTML style attribute
<div class="card" style="width: 18rem;">

// JSX equivalent
<div className="card" style={{ width: '18rem' }}>
```

Bootstrap 5 was added to `public/index.html` via CDN so that Bootstrap classes like `card`, `btn`, and `card-body` render correctly:

```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
```

---

## Custom Components

Rather than copy-pasting the same card HTML three times, a reusable `Card` component was created in `Card.js`. This is a functional component, a single JavaScript function that returns JSX:

```javascript
import React from 'react';

const Card = (props) => {
  return (
    <div className='card' style={{ width: '18rem' }}>
      <img src={props.imgURL} className='card-img-top' alt={props.albumTitle} />
      <div className='card-body'>
        <h5 className='card-title'>{props.albumTitle}</h5>
        <p className='card-text'>{props.albumDescription}</p>
        <button href='#' className='btn btn-primary'>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
```

The `export default Card` at the bottom makes this component available for import in other files. The `props` parameter receives data passed in from the parent component.

In `App.js`, the Card component is imported and used with custom attributes that become React props:

```javascript
import Card from './Card';

<Card
  albumTitle="Abbey Road"
  albumDescription="Abbey Road is the eleventh studio album..."
  imgURL="https://upload.wikimedia.org/..."
  buttonText="OK"
/>
```

---

## Stopping Point #1 Screenshots

![Figure 1 — Initial app running with a single Bootstrap card](./images/figure1.png)

- **Figure 1** — Initial app running with a single Bootstrap card

![Figure 2 — App with three Card components rendered using prop](./images/figure2.png)

- **Figure 2** — App with three Card components rendered using props

---

# Part 2 – Mini App: State Changer Demo

A separate mini app called `statechanger` was created to demonstrate React state management using the `useState` hook.

## Counter Component

`Counter.js` demonstrates two independent uses of `useState`, one to track button clicks and one to track text input:

```javascript
import React, { useState } from 'react';
import './Counter.css';

const Counter = (props) => {
  // useState hook — tracks click count, initialized to 0
  const [clicks, setClicks] = useState(0);

  // useState hook — tracks message input, initialized to the title prop
  const [message, setMessage] = useState(props.title);

  // Increments click count when button is clicked
  const addOneClick = () => {
    setClicks(clicks + 1);
  };

  // Updates message state on every keystroke
  const handleNewMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className='one-box'>
      <h1>{props.title}</h1>
      <h2>clicks: {clicks}</h2>
      <h3>message: {message}</h3>
      <input
        type='text'
        value={message}
        onChange={handleNewMessage}
      />
      <button onClick={addOneClick}>Click Me</button>
    </div>
  );
};

export default Counter;
```

`Counter.css` styles each counter box:

```css
.one-box {
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  background-color: #eee;
}
```

Three independent `Counter` components are rendered in `App.js`, each with its own `title` prop and completely independent state:

```javascript
import React from 'react';
import Counter from './Counter';

const App = () => {
  return (
    <div>
      This is the first page of the app
      <Counter title="1st Counter" />
      <Counter title="2nd Counter" />
      <Counter title="3rd Counter" />
    </div>
  );
};

export default App;
```

## useState Explained

The `useState` hook is the primary way to manage state in a functional React component. It takes an initial value as its parameter and returns an array of two elements — the current state value and a function to update it. JavaScript array destructuring is used to assign convenient variable names:

```javascript
const [clicks, setClicks] = useState(0);
//     ^current  ^updater    ^initial value
```

Every time `setClicks` or `setMessage` is called, React re-renders the component and all its children with the new state values. This is how the UI stays in sync with data — UI updates in React are always the result of state changes.

## State vs. Props

**Props** are variables passed to a component from its parent. They are read-only and do not change once the component is rendered. **State** is managed inside the component itself and changes in response to user actions or API results. State values can be initialized from props, but they are independently mutable.

## Stopping Point #1 Screenshots

> *(Insert captioned screenshots here)*

- **Figure 3** — State Changer app with three Counter components, initial state
- **Figure 4** — Counter after clicking the button and typing a message

---

# Part 3 – State and Props in the Music Application

## Updated App.js with useState

The music app's `App.js` was updated to manage the album list as a **state variable** using `useState`. This sets up the wiring needed to later replace the hard-coded data with a live REST API call (Activity 6):

```javascript
import React, { useState } from 'react';
import Card from './Card';
import './App.css';

const App = () => {
  const [albumList, setAlbumList] = useState([
    {
      artistId: 0,
      artist: 'My Chemical Romance',
      title: 'The Black Parade',
      description:
        'The third studio album by My Chemical Romance, released October 23, 2006. A concept album centered on a dying man known as The Patient.',
      year: 2006,
      image: 'https://upload.wikimedia.org/wikipedia/en/6/67/The_Black_Parade_Album_Cover.png',
    },
    {
      artistId: 1,
      artist: 'The Beatles',
      title: 'Abbey Road',
      description:
        'Abbey Road is the eleventh studio album by the English rock band the Beatles, released on 26 September 1969.',
      year: 1969,
      image: 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg',
    },
    {
      artistId: 2,
      artist: 'Michael Jackson',
      title: 'Thriller',
      description:
        'Thriller is the sixth studio album by Michael Jackson, released November 30, 1982. It is the best-selling album of all time.',
      year: 1982,
      image: 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png',
    },
  ]);

  // renderedList uses the map function to transform each album into a Card component
  const renderedList = () => {
    return albumList.map((album) => {
      return (
        <Card
          key={album.artistId}
          albumTitle={album.title}
          albumDescription={album.description}
          buttonText='OK'
          imgURL={album.image}
        />
      );
    });
  };

  return (
    <div>
      <h1>Music I like</h1>
      <div className='container'>{renderedList()}</div>
    </div>
  );
};

export default App;
```

## The Map Function

The `map` function is a JavaScript array transformation function that returns a **new array** without modifying the original. In the music app, it transforms each album object in `albumList` into a `<Card />` JSX element. The browser console exercises from the activity illustrate the concept:

```javascript
// Define a function
function plus3(x) { return x + 3 }

// Create an array
let numbers = [1, 6, 10, 20]

// Apply map — returns a new array [4, 9, 13, 23]
numbers.map(plus3)

// Another example — map to boolean
function isEven(x) { return x % 2 === 0 }
numbers.map(isEven) // [false, true, true, true]

// Map to HTML elements
function renderParagraphs(x) { return "<li>" + x + "</li>" }
numbers.map(renderParagraphs) // ["<li>1</li>", "<li>6</li>", ...]
```

In `App.js`, the same principle applies — each `album` object in the array is transformed into a `<Card />` component with its props populated from the album data.

## CSS FlexBox Layout

`App.css` uses CSS FlexBox to display the cards side by side horizontally instead of stacked vertically:

```css
.container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin: 10px;
  padding: 5px;
}
```

The `flex-wrap: wrap` property ensures cards wrap to the next line on smaller screens, making the layout responsive.

## Stopping Point #2 Screenshots

> *(Insert captioned screenshots here)*

- **Figure 5** — Music app showing three album cards displayed horizontally with FlexBox
- **Figure 6** — Music app on a narrower screen showing cards wrapping to the next row

---

# Part 4 – Summary

**Stopping Point #1 — Custom Components:** React components allow UI elements to be defined once and reused multiple times with different data via props. The `Card` component encapsulates the Bootstrap card markup and receives its content through props passed from the parent `App` component. JSX requires `className` instead of `class`, self-closing image tags with `/>`, and inline styles defined as JavaScript objects.

**Stopping Point #2 — State and Props:** The `useState` hook allows functional components to manage dynamic data. Props are static values passed down from a parent, while state is mutable data managed within the component itself. The `map` function is the standard React pattern for rendering a list of components from an array of data — each element in the array becomes a component with its own props. CSS FlexBox via the `display: flex` and `flex-wrap: wrap` properties arranges the album cards in a responsive horizontal layout.