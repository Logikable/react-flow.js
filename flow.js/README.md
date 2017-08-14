# Flow.js: Flow Editor using ReactJS

## Introduction to Technologies

If you are an aspiring web developer or one that has not done web development in the last 10 years, this part of the README is for you. It will be covering the technologies that are relevant to this project, specifically HTML, Javascript, Node.js, Babel, ReactJS, Webpack, and React-dnd.

### HTML5

**HTML** is the building block of modern web development. It stands for Hypertext Markup Language, and is very similar to XML or LaTeX. Most plain text not surrounded by angle brackets will be displayed directly to the user, and the content within angle brackets (or **tags**) determines the formatting of the displayed text. There is an exception to this rule which involves the `<script>` tag. Any text within an opening and closing script tag will be parsed as Javascript, which is the primary scripting languages for websites.

Since the introduction of HTML5, many new tags have been added to further allow the developer to position parts of the website, such as the `<header>` or `<footer>` tags.

#### HTML DOM

When a web page is loaded, the browser creates a Document Object Model (or **DOM**) of the page. Each tag is treated as a separate object, and a tree of these objects can be built. This allows Javascript to create dynamic HTML. In the DOM world, objects are called **elements**. Elements may have **attributes** attached to them. For example, `<a href="google.com" />` has the attribute `href` set to `google.com`. The DOM also allows Javascript to modify these attributes.

### Javascript

**Javascript** is the primary scripting language used by web developers. By default, all web browsers have a Javascript engine that parses, compiles, and executes the code within a web page as it is loaded. As a result, it was mostly used as a client-side language in the past. However, recently it has seen use in backend systems, most noteably Node.js. Its syntax is most similar to that of Python.

In Javascript, all objects are **dictionaries**. What this means is that classes, arrays, and other non-primitive data is represented as a dictionary. For those unaware, dictionaries are a set of key-value pairs, where values attached to an object can be both gotten and setted using its key.

#### ECMAScript

To standardize Javascript, a specification called **ECMAScript** (or ES) was introduced. Most developers reading this are probably most familiar with ES5, which was released in 2009. In 2015, ES6/ES2015 was released and came with significant new syntax which we will hopefully cover later. Google Chrome does not support ES6, which makes compilers that compile ES6 code into ES5 code (also known as transpilers) a necessary part of the stack. An example that we will see in this guide is Babel.

### Node.js

**Node.js** is a backend environment that allows scripts to be executed server-side before transmitting data to the client-side. Its biggest selling point is its Node.js Package Manager (or **npm**), which allows users to upload and download Javascript plugins and the necessary dependencies very easily. By default it has a web server built in, making it easy for new web developers to get started with npm.

### Babel and transpilers

**Transpilers** compile code from one language into another. **Babel** is the transpiler that we chose to use with this project, as it automates transpiling between Javascript syntaxes automatically.

### ReactJS

**ReactJS** is an npm library that aims to make creating interactive UIs smoother. It's being developed by Facebook and is used by hundreds of thousands of websites. It encourages the developer to split the website into reusable modular **components**. These components are then placed in a tree, much like the HTML DOM puts its elements into a tree. In fact, React creates a virtual DOM in Javascript that is modified every time an update occurs, and only updates the actual DOM when all rendering updates have completed.

#### JSX

In order to simplify the process for native HTML elements to be passed around in Javascript, React has introduced a subset of Javascript known as **JSX**. JSX is very similar to HTML with a few exceptions: all names are camelCase instead of underscored, and instead of the `class` attribute we have `className`.

JSX is used primarily in building objects to be returned in the `render()` function of a component. Syntactical specification examples can be found in the source code.

Sometimes, the developer may want dynamically generated data in the DOM. JSX supports this, and will execute any code between two braces `{}` as Javascript. Of course, it is possible to infinitely layer JSX within Javascript within JSX, but there are few cases where this is actually necessary. 

### Webpack

**Webpack** is a module bundler that kills two birds with one stone. As expected by its description, Webpack automatically combines all of your modules and dependencies into the minimum possible number of static assets. This is especially useful for a modular system like ReactJS because React's affinity towards having a large number of small files causes extra strain on the web server to have to receive multiple requests to load a page.

The second use for webpack is its automatic reloading web server. `webpack-dev-server` is a Node.js based web server that, among other features, automatically detects code changes, compiles, and refreshes the web page.

### React-dnd

**React-dnd** is a set of higher-order React components that streamlines the creation of drag and drop components. It is so integral to this project that it deserves its own section.

In addition to being able to facilitate drag and drop actions, React-dnd gives the developer options to filter by draggable elements, cancel drops, and obtain constantly updated data about the dragged component. It allows the drag component to communicate directly with the drop component, regardless of where they live in the DOM.

There is plenty of other functionality that will be covered later in this tutorial or can be found on the React-dnd website. For example, developers may set their own drag preview, render components in a custom dragging layer, or even change the HTML5 dnd backend to a touch based backend. React-dnd is versatile and should suit every developer's needs.

## Setting up your environment

Flow.js can be set up on Windows as easily as it can be set up on Linux.

### Installing npm

#### Windows

Download node.js from the [official website](https://nodejs.org/en/). Run the installer and follow the prompts to install `npm package manager`.

Once installation is complete, restart your computer. Verify Node.js and npm are installed properly by opening a command prompt and running `node -v` and `npm -v`.

#### Linux (CentOS)

Add the yum respository to your system:
```
yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_6.x | sudo -E bash -
```
Install node.js and npm using `yum install npm`. Verify your installation by running `node -v` and `npm -v`.

### Installing Flow.js

Clone this repository with the command `git clone https://github.com/Logikable/learning-react.git`. Navigate to the flow.js folder and run `npm install` to install all of the dependencies.
You're good to go! Simply run `npm start` to start the web server.

## Library tutorials

This section of the guide will provide in-depth tutorials on the libraries and React components used in this project. The technologies used include: ReactJS, React-contextmenu, React-dnd, React-keydown, React-lightweight-tooltip, and React-popup. Sample code snippets demonstrating the library can be found at the bottom of each section.

### Javascript/ES6

Although Javascript is not a library, this section has been included to ease any new or returning web developers into the modern web dev syntax. This section will focus on the changes from ES5 (2009) to ES6 (2015) that are relevant to this project.

#### Semicolons

Semicolons are no longer necessary. Javascript is now like Python

#### Constants/block-scoped variables

Instead of `var` being the only way to define a new variable, we now have `const` and `let`. `const` is equivalent to the keyword `final` in Java, making a variable immutable. `let` makes a variable only accessible in its current scope, and should generally be used instead of `var`.
```
var x = 0
const PI = 3.14
let g = 9.8
```

#### Arrow/lambda functions

Traditionally (such as in C or Java <1.7), functions had to be defined using a certain syntax:

```
return_type function_name(type_1 var_1, type_2 var_2...) {
	// code
	return variable
}
```
or in Javascript, using the syntax:
```
function function_name(var_1, var_2...) {
	// code
	return variable
}
```
Since Javascript is an event driven language, it makes sense to have callback functions. To ease the process of creating a function and passing it through as a variable, Javascript has introduced **arrow/lambda functions**. They are unique in that arrow functions do not have a name, and also do not require a return statement. If and only if the body of the function is a single expression (e.g. `v + 1`), that is the value that is returned.
```
(var_1, var_2) => {
	// code
	return variable
}
```
or even
```
(var_1, var_2) => var_1 + var_2
```

#### Object matching

It is common in ReactJS to only need a portion of a dictionary object's data. Traditionally, it would be verbose as a new object would have to be created, and each one of the required key-value pairs would have to be manually set. ES6 has introduced a shorthand notation to do everything in a single line.

In old Javascript, the code would be:
```
var tmp = some_function()
var a = tmp.a
var b = tmp.b
var c = tmp.c
```
In ES6, we can now do:
```
var { a, b, c } = some_function()
```

#### Import/Export

Previously, to include packages in Node.js meant using the `require()` function and having an `exports` variable in the package. Now, we use `import` and `export` statements:
```
// exports.js
export function sum (x, y) { return x + y }
export var PI = 3.14
// imports.js
import { sum, PI } from "exports"
```

#### Classes

**Classes** are a staple of any object-oriented programming (OOP) language. They are defined very similarly to Java/Python classes. However, since ES6 needs to be able to be transpiled into ES5, and ES5 has no equivalent, they are transpiled as functions.
```
class Shape {
	constructor (id, x, y) {
		this.id = id
		this.move(x, y)
	}
	move (x, y) {
		this.x = x
		this.y = y
	}
}
```
Since classes are just functions, the `this` keyword works a little different from how it does in other languages with native class support. While getting/setting instance variables is still very much the same (`this.id = id`), functions themselves are now just another variable as a part of the very large object that is your class. As a result, they must also be accessed using the `this` keyword.

### ReactJS

The coding style of a React app is very different from that of a conventional web page. Instead of having scripts scattered amongst a large array of HTML elements, each component (usually) is in a separate file, each file is primarily Javascript and JSX, and components must be imported from other files to be used. Each component is a class that extends React.Component, and must have a `render()` function that tells React what to render in the space occupied by that component.

A simple example of React code can be found in the [flow.js](https://github.com/Logikable/learning-react/blob/master/flow.js/src/app/flow.js) file in the source code.

Each component may contain data, and that data is usually stored in one of two of React's special structures: either it is a **prop**, or it is a **state**. Props are data passed down from the parent component, and are static in the context of the child component. Props are set by the attributes of the child component when initialized by the parent. States are data that represent, well, the component's state. It is highly recommended that only data that would require a rerender be stored in a components state. All other data should be stored as an attribute of the component.

To get/set a component's props, simply use the variable `this.props` in a method of the component. As mentioned in the [object matching](#object-matching)
```

```
It is possible to assert that a proptype is of a valid type during runtime. React has a PropTypes module that has a number of objects that each correspond to a different Javascript type, allowing developers to require props of a certain name and type to be passed. It is even possible to dictate the shape of a dictionary prop. 

Suppose we have a `Parent` component and a `Child` component, and we want to pass the data `green: true`. To pass data from the parent to the child using props, we type `<Child green={True} />`. On the child component side, we can require that the `Child` component has a `green` attribute by writing
```
Child.propTypes = {
	green: PropType.bool.isRequired
}
```
Every update to the DOM follows a simple lifecycle in React. When the page is initially loaded, the `componentWillMount()`, `render()`, and `componentDidMount()` functions will be called in that order. Each time the state is set or a prop is updated, `componentWillUpdate()`, `render()`, and `componentDidUpdate()` are called, also in that order. [This image](https://cdn-images-1.medium.com/max/1600/0*VoYsN6eq7I_wjVV5.png) will help visualize that lifecycle. 

As a result of the significant differences between conventional Javascript and React's script, it is recommended that Babel is used to first transpile React to ES6, then ES6 to ES5. A guide for how to set up these transpilations can be found above.

### React-contextmenu

**React-contextmenu** allows the developer to easily create custom right click menus and options. The three main components are the `ContextMenuTrigger`, `ContextMenu`, and the `MenuItem`. As the name suggests, the `ContextMenuTrigger` can be placed and will detect right click activity in that region. Once the click event is triggered, React-contextmenu will look for a `ContextMenu` component with the same ID as the trigger and display it positioned appropriately. The displayed contents are determined by the `MenuItem` child components.

A menu divider can be added by including a `MenuItem` component with the divider prop: `<MenuItem divider />`.

By default, React-contextmenu will also display the menu on a held click. This can be disabled by giving the `ContextMenuTrigger` component the prop `holdToDisplay={-1}`.

All attributes passed to the `ContextMenuTrigger` component will be bundled under one (`trigger`) and forwarded to the `ContextMenu` component.

### React-dnd

The fundamental idea behind React-dnd are two higher-order classes that wrap your draggable and target components, `DragSource` and `DropTarget` respectively. Each class takes a few callback functions and options as the first set of parameters, then your wrapped component as the second set of parameters. In the most basic drag lifecycle, two functions are called: `beginDrag()` and `drop()`, both of which are examples of the callback functions passed as parameters; `beginDrag` from `DragSource`, and `drop` from `DropTarget`.

React-dnd requires every drag source to have an item type. This allows the drop target to both filter out unwanted drag sources as well as identify which item is being dropped. This information is passed to both classes during initialization as parameters.

It is also possible for your drag sources and drop targets to relay information about the location, distance travelled, item type, etc. to its child component. This is done through a collect function, which simply returns a dictionary that the developer can configure to have any data. The collect function is also passed as a parameter to both classes. Using the state monitoring feature, this can also be used to pass data from the drag source to the drop target.

### React-keydown

**React-keydown** is a React adapter to the HTML key down event. It simply passes the event to the developer through a prop.

### React-lightweight-tooltip

**React-lightweight-tooltip** enables developers to create custom tooltips when the user hovers over a component. To use React-tooltip, add the `data-tip` attribute to the elemt

### React-popup

### npm

## Flow.js 