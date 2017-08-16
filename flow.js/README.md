# Flow.js: Flow Editor using ReactJS

## Table of Contents

1. [Introduction to Technologies](#1-introduction-to-technologies)
   * [HTML5](#html5)
     * [HTML DOM](#html-dom)
   * [Javascript](#javascript)
   * [ECMAScript](#ecmascript)
   * [Node.js](#nodejs)
   * [Babel and transpilers](#babel-and-transpilers)
   * [ReactJS](#reactjs)
     * [JSX](#jsx)
   * [Webpack](#webpack)
   * [React-dnd](#react-dnd)
2. [Setting up your environment](#2-setting-up-your-environment)
   * [Installing npm](#installing-npm)
     * [Windows](#windows)
     * [Linux (CentOS)](#linux-centos)
   * [Installing flow.js](#installing-flowjs)
3. [Library/Technology tutorials](#3-librarytechnology-tutorials)
   * [Javascript/ES6](#javascriptes6)
     * [Semicolons](#semicolons)
     * [Object matching](#object-matching)
     * [Constants/block-scoped variables](#constantsblock-scoped-variables)
     * [Arrow/lambda functions](#arrowlambda-functions)
     * [Import/Export](#importexport)
     * [Classes](#classes)
   * [npm](#npm)
   * [ReactJS](#reactjs-tutorial)
     * [Props](#props)
     * [States](#states)
     * [Other specifications](#other-specifications)
   * [React-contextmenu](#react-contextmenu)
   * [React-dnd](#react-dnd)
   * [React-keydown](#react-keydown)
   * [React-popup](#react-popup)
   * [React-tooltip](#react-tooltip)
4. [Flow.js](#flowjs)

## 1. Introduction to Technologies

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

JSX is used primarily in building objects to be returned in the `render()` function of a component. React permits exactly one JSX element to be returned, and all others to be children. Often this means wrapping every other element in a `<div>` tag. It is also common to wrap the entire JSX block in parentheses `()`. Other syntactical specification examples can be found in the source code. 

Sometimes, the developer may want dynamically generated data in the DOM. JSX supports this, and will execute any code between two braces `{}` as Javascript. Of course, it is possible to infinitely layer JSX within Javascript within JSX, but there are few cases where this is actually necessary. 

### Webpack

**Webpack** is a module bundler that kills two birds with one stone. As expected by its description, Webpack automatically combines all of your modules and dependencies into the minimum possible number of static assets. This is especially useful for a modular system like ReactJS because React's affinity towards having a large number of small files causes extra strain on the web server to have to receive multiple requests to load a page.

The second use for webpack is its automatic reloading web server. `webpack-dev-server` is a Node.js based web server that, among other features, automatically detects code changes, compiles, and refreshes the web page.

### React-dnd

**React-dnd** is a set of higher-order React components that streamlines the creation of drag and drop components. It is so integral to this project that it deserves its own section.

In addition to being able to facilitate drag and drop actions, React-dnd gives the developer options to filter by draggable elements, cancel drops, and obtain constantly updated data about the dragged component. It allows the drag component to communicate directly with the drop component, regardless of where they live in the DOM.

There is plenty of other functionality that will be covered later in this tutorial or can be found on the React-dnd website. For example, developers may set their own drag preview, render components in a custom dragging layer, or even change the HTML5 dnd backend to a touch based backend. React-dnd is versatile and should suit every developer's needs.

## 2. Setting up your environment

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

## 3. Library/Technology tutorials

This section of the guide will provide in-depth tutorials on the technologies and React components used in this project. Specifically, this section will cover recent changes to Javascript and contains an introduction to npm. The components mentioned are ReactJS, React-contextmenu, React-dnd, React-keydown, React-lightweight-tooltip, and React-popup. Sample code snippets demonstrating the library can be found at the bottom of each section.

### Javascript/ES6

Although Javascript is not a library, this section has been included to ease any new or returning web developers into the modern web dev syntax. This section will focus on the changes from ES5 (2009) to ES6 (2015) that are relevant to this project.

#### Semicolons

Semicolons are no longer necessary. Javascript is now like Python.

#### Object matching

It is common in ReactJS to only need a portion of a dictionary object's data. Traditionally, it would be verbose as a new object would have to be created, and each one of the required key-value pairs would have to be manually set. ES6 has introduced a shorthand notation to do everything in a single line known as **object matching**.

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

#### Import/Export

Previously, to include packages in Node.js meant using the `require()` function and having an `exports` variable in the package. Now, we use `import` and `export` statements:
```
// exports.js
export function sum (x, y) { return x + y }
export var PI = 3.14
// imports.js
import { sum, PI } from "exports"
```
It is also possible to label an export the default export. By doing so, it is no longer necessary to use [object matching](#object-matching) to specify which variables to import.
```
// exports.js
export default var PI = 3.14
// imports.js
import PI from "exports"
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

### npm

npm, as is the case with all good package managers, is fast and simple to use. npm splits package installations into two types: regular dependencies and dev-dependencies. Regular dependencies are necessary to the project and will be bundled  if you so choose to release your project publicly on npm, while dev-dependencies are only necessary to your development environment. For example, babel is a dev-dependency since all transpilations occur during development, while React is a regular dependency since it is needed during runtime.

npm stores all the information about which dependencies are necessary for your project in the `package.json` file. `package.json` also contains the project name, version, main file, and any scripts you may need. Scripts can be executed using `npm script_name`. For example, this project has the script `build`, which simply runs webpack and sets up automatic reloading.

To download new packages, run `npm install package_name`. All dependencies will be automatically installed. If you want to automatically add the package to your dependencies list, add the `--save` flag. The `--save-dev` command will add the dependency to dev-dependencies instead.

### ReactJS Tutorial

The coding style of a React app is very different from that of a conventional web page. Instead of having scripts scattered amongst a large array of HTML elements, each component (usually) is in a separate file, each file is primarily Javascript and JSX, and components must be imported from other files to be used. Each component is a class that extends React.Component, and must have a `render()` function that tells React what to render in the space occupied by that component.

Each component may contain data, and that data is usually stored in one of two of React's special structures: either it is a **prop**, or it is a **state**. Props are data passed down from the parent component, and are static in the context of the child component. Props are set by the attributes of the child component when initialized by the parent. States are data that represent, well, the component's state. It is highly recommended that only data that would require a rerender be stored in a components state. All other data should be stored as an attribute of the component.

#### Props

To get/set a component's props, simply use the variable `this.props` in a method of the component. As mentioned in the [object matching](#object-matching) section, object matching is handy here as it is common that only a certain selection of props are necessary in each function. For example, if only the `x`, `y`, and `id` props are needed, then the following is sufficient:
```
var { x, y, id } = this.props
```
It is possible to assert that a proptype is of a valid type during runtime. React has a PropTypes module that has a number of objects that each correspond to a different Javascript type, allowing developers to require props of a certain name and type to be passed. It is even possible to dictate the shape of a dictionary prop. However, this is all unnecessary if you are working on a smaller project and can manually keep track of which props are being passed. It is merely optional to ensure the presence of props.

Suppose we have a `Parent` component and a `Child` component, and we want to pass the data `green: true`. To pass data from the parent to the child using props, we type `<Child green={True} />`. On the child component side, we can require that the `Child` component has a `green` attribute by writing
```
Child.propTypes = {
    green: PropType.bool.isRequired
}
```

#### States

States can be retrieved by accessing the `this.state` instance variable, and is a dictionary containing the state data. It can be updated using the `this.setState(newState)` method, which will internally mark the component as dirty, meaning it requires rerendering. This means that every call to `this.setState()` will rerender the entire component and children, so it should be used only when necessary.

Suppose we have a component whose state has a list of `ids` and tracks the next available ID as `nextId`. To add a new id, we might do:
```
this.setState({
    ids: this.state.ids.concat([this.state.nextId]),
    nextId: this.state.nextId + 1
})
```
This means that we are creating an entirely new array with the `nextId` appended onto it, and replacing the `ids` variable. It is possible to tell React to append an item to the list, but it is somewhat difficult and should only be used when efficiency is a concern.

#### Other specifications

Every update to the DOM follows a simple lifecycle in React. When the page is initially loaded, the `componentWillMount()`, `render()`, and `componentDidMount()` functions will be called in that order. Each time the state is set or a prop is updated, `componentWillUpdate()`, `render()`, and `componentDidUpdate()` are called, also in that order. [This image](https://cdn-images-1.medium.com/max/1600/0*VoYsN6eq7I_wjVV5.png) will help visualize that lifecycle. 

Usually components are exported at the end of a file, as it is likely that that component was created for a purpose and needs to be used elsewhere.

As a result of the significant differences between conventional Javascript and React's script, it is recommended that Babel is used to first transpile React to ES6, then ES6 to ES5. A guide for how to set up these transpilations can be found above.

#### Sample code

A simple example of React code can be found in the [flow.js](https://github.com/Logikable/learning-react/blob/master/flow.js/src/app/flow.js) file in the source code. For your convenience, it is also shown here:
```
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Popup from 'react-popup';
import EditorDragLayer from './dragLayer';
import Editor from './editor';
import Toolbar from './toolbar';

require('../css/popup.css')

class Flow extends Component {
    render() {
        return (
            <div style={{
                width: '550px',
                height: '500px'
            }}>
                <Popup />
                <Toolbar />
                <Editor />
                <EditorDragLayer /> 
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Flow);
```
Much of the detail can be ignored here, but the key features to point out are:

1. Components defined by creating a class that extends the React `Component` class, which was imported from the 'react' package.
2. There is only a `render()` method, and it returns a bit of JSX that is simply defined by a size and includes a few other components.
3. The component is exported as the default export, which means it can be imported using `import Flow from 'flow'`.

### React-contextmenu

**React-contextmenu** allows the developer to easily create custom right click menus and options. The three main components are the `ContextMenuTrigger`, `ContextMenu`, and the `MenuItem`. As the name suggests, the `ContextMenuTrigger` can be placed and will detect right click activity in that region. Once the click event is triggered, React-contextmenu will look for a `ContextMenu` component with the same ID as the trigger and display it positioned appropriately. The displayed contents are determined by the `MenuItem` child components.

A menu divider can be added by including a `MenuItem` component with the divider prop: `<MenuItem divider />`.

By default, React-contextmenu will also display the menu on a held click. This can be disabled by giving the `ContextMenuTrigger` component the prop `holdToDisplay={-1}`.

All attributes passed to the `ContextMenuTrigger` component will be bundled under one (`trigger`) and forwarded to another component (perhaps containing the `ContextMenu` object) if necessary. To do so, import the `connectMenu()` function from `react-contextmenu`. This function is a higher-order function whose first set of parameters is just the identifier used by your contextmenu. The second function call is simply the class you want the data forwarded to.

#### Sample code

This snippet of code creates a basic context menu that only has one item in it. It opens the menu when the component is right clicked.
```
import React, { Component } from 'react'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'

class ContextMenuDemo extends Component {
    render() {
        return (
            <ContextMenuTrigger id={0} holdToDisplay={-1} green={true}>
                Trigger
            </ContextMenuTrigger>
            <ContextMenu id={0}>
                <MenuItem>Item 1</MenuItem>
            </ContextMenu>
        )
    }
}
```
If another component needed data from the trigger (say, the variable `green` from above), we can do:
```
import React, { Component } from 'react'
import { connectMenu } from 'react-contextmenu'

class ConnectedComponent extends Component {
    render() {
        const { green } = this.props
        // code
    }
}
export default connectMenu(0)(ConnectedComponent)
```

### React-dnd

The fundamental idea behind React-dnd are two higher-order classes that wrap your draggable and target components, `DragSource` and `DropTarget` respectively. Each class takes a few callback functions and options as the first set of parameters, then your wrapped component as the second set of parameters. In the most basic drag lifecycle, two functions are called: `beginDrag()` and `drop()`, both of which are examples of the callback functions passed as parameters; `beginDrag` from `DragSource`, and `drop` from `DropTarget`.

React-dnd requires every drag source to have an item type. This allows the drop target to both filter out unwanted drag sources as well as identify which item is being dropped. This information is passed to both classes during initialization as parameters.

It is also possible for your drag sources and drop targets to relay information about the location, distance travelled, item type, etc. to its child component. This is done through a collect function, which simply returns a dictionary that the developer can configure to have any data. The collect function is also passed as a parameter to both classes. Using the state monitoring feature, this can also be used to pass data from the drag source to the drop target.

A good example of data that is regularly passed through the collect function is the `dropTarget()` and `dragSource()` functions, attributes of the `connect` objects passed to the collect function. These functions allow the developer to register a JSX element to be either the drop target or the drag source. Examples can be found in any file that has a drag or drop component.

React-dnd also supports custom drag layers, which allow the developer to change the drag preview or behaviour **after** the drag has begun. The react-dnd documentation has an example where dragged objects automatically snap to a grid as they are being dragged, and Flow.js uses it to display a constantly updating drag preview.

#### Sample code

Suppose we have the component classes `DragDemo` and `DropDemo`. To make it possible to drag one onto the other, we write:
```
// DragDemo.js
import { DragSource } from 'react-dnd'
const spec = {
    beginDrag: function(props, monitor, component) {
        console.log("dragging!")
        return { name: "DragDemo" }
    }
}
export default DragSource("demo", spec, (connect, monitor) => { })(DragDemo)
```
Note that we use [arrow functions](#arrowlambda-functions) here.
```
// DropDemo.js
import { DropTarget } from 'react-dnd'
const spec = {
    drop: function(props, monitor, component) {
        console.log("dropped!")
    }
}
export default DropTarget("demo", spec, (connect, monitor) => { connectDragSource: connect.dragSource() })(DropDemo)
```
Notice the three parameters of both the `DragSource` and `DropTarget` functions. The first represents the item type - this can be an array for `DropTarget` to allow multiple drag sources to be dropped.

The second is the `spec` variable, which is an object containing specification methods that will automatically be called as certain events occur. For example, the `beginDrag()` method is called once the dragging begins. The returned value must be a Javascript object that provides information about the dragged object to an eventual drop target. See [here](https://react-dnd.github.io/react-dnd/docs-overview.html) for more details.

The third is the collect function - it supplies some information about the current drag event, allows the developer to connect to the React-dnd event handlers, and the return value will be an object that allows the developer to inject props into their component, connecting React-dnd to the component. In this case, for the drop target, we're passing on the object that is returned by the source's `beginDrag()` method - specifically, `{ name: "DragDemo" }`.

### React-keydown

**React-keydown** is a React adapter to the HTML key down event. It simply passes the event to the developer through a prop. The package includes a `keydown` function, which takes your React component as a parameter and wraps it, allowing it to pass through props.

#### Sample code

This snippet of code simply creates a component that prints out the keycode every time a key is pressed.
```
import React, { Component } from 'react'
import keydown from 'react-keydown'

class KeydownDemo extends Component {
    componentWillReceiveProps(nextProps) {
        const { keydown: { event } } = nextProps
        console.log(event.which)    // key code representing which key was pressed
    }
    render() { return; }
}
export default keydown(KeydownDemo)
```

### React-popup

**React-popup** streamlines the process of creating popup boxes on demand. Simply include the `Popup` component anywhere in the React DOM tree and then run `Popup.alert(message)` whenever a popup is needed.

#### Sample code

This snippet of code will create a popup saying "Hello World!" once the web page has loaded.
```
import React, { Component } from 'react'
import Popup from 'react-popup'

class PopupDemo extends Component {
    render() {
        return (
            <div>
                <Popup />
                { Popup.alert("Hello World!") }
            </div>
        )
    }
}
```

### React-tooltip

**React-tooltip** enables developers to create custom tooltips when the user hovers over a component. To use react-tooltip, add the `data-tip` attribute to the element that needs to display a tooltip when hovered over, and 

#### Sample code

This snippet of code creates a component that contains the word "Hello", and will display a tooltip with the text "World!" when hovered over.
```
import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

class TooltipDemo extends Component {
    render() {
        return (
            <div data-tip={ "World!" }>
                Hello
                <ReactTooltip />
            </div>
        )
    }
}
```

## 4. Flow.js 

The fourth and final section of this guide will cover the actual functionality and structure of Flow.js and some of its specifications. There may be a few poor design choices due to inexperience with these libraries.

### Functionality

Flow.js is a flow editor for machine learning developers and programmers that is easy to modify to their needs. It is composed of two main components: the **toolbar** and the **editor**. The toolbar contains **tiles** that can be dragged onto the editor to create **nodes**. These nodes have **ports** that can be connected to one another to make **connections**.

Nodes can be selected, and their selection status can be toggled by clicking. Nodes can also have right click context menus that provide information about the node and options to edit the node.

Everything is drag-and-drop: tiles are dragged from the toolbar to the editor, nodes are dragged along the editor to move them, and connections are made by dragging one port onto another. 

### Components

The hierarchy of the Flow.js components looks as follows:

* Flow
   * Toolbar
     * Tile
   * Editor
     * Node
       * Port
       * NodeContextMenu
     * Connection
   * EditorDragLayer

Each one of these components will be covered below, along with a section of their props describing what each one does.

#### Flow

Flow is the wrapper component. It defines the `<div>` that encompasses every component of Flow.js. The two major displayed child components are the Toolbar and the Editor. The `<Popup />` component is required as a global object by the `react-popup` package. The `<EditorDragLayer />` acts as a `react-dnd` drag layer that displays a constantly updating preview of a connection being made. If a change to the dimensions of the entire editor was to be made, this would be the location.

It has no props, so there is no section here.

#### Toolbar

The Toolbar acts as a container for all of the tiles (icons that generate new nodes on the editor). Other than some CSS to define its location, color, and borders, it has nothing else.

It has no props, so there is no section here.

#### Tile

A Tile represents a draggable source for a new node on the editor. Its `beginDrag()` function contains information about the tile location so the drag offset can be used to calculate the final placement of the Node. As of now, the drag preview is just the tile icon itself. The Tile component also renders a `ReactTooltip` that will display the node's name if a cursor is hovered over the icon.

##### Props

* name: a string that represents the type of node that will be generated. A list of the names can be found in the [constants](#constants) section below.
* connectDragSource: a function generated by React-dnd that allows the developer to register a JSX object to be a drag source.
* connectDragPreview: a function generated by React-dnd that allows the developer to register an image preview to a drag source.

#### Editor

The Editor component is where most of the activity occurs in Flow.js. First of all, it acts as a drop target for Tiles and Nodes. When a Tile is dragged on, a Node is placed on the drop location, and when a Node is dragged from the Editor onto itself, the Node moves. The `drop()` function does all of these calculations.

As can be seen in the constructor, Editor is where all of the state data is stored for all of Flow.js. The state data is split into two types: dusty and clean. The dusty data, once updated, will make the component dirty, which is a React technical term that means the component and its children need to be rerendered. This data is stored directly in the `this.state` variable, as a call to `this.setState()` will directly update that data and automatically set the component as dirty. The clean state data is data that does not need a rerendering on update. This data is stored as attributes of the component (e.g. `this.nextId`). There is currently a preset example node that will be displayed on load.

The `componentWillReceiveProps()` method is currently used for detecting the delete keystroke and will delete all selected nodes and connections.

The `render()` method creates arrays of JSX node and connection objects separately, before combining them together to create the entire editor.

There are also several helper methods that are passed as props to child components that allow them to modify the state of the editor, such as adding/deleting connections, modifying nodes, etc. This callback-props passing & centralized state system is so common across React projects that there are packages like [Redux](https://github.com/reactjs/redux) that act as state containers to centralize all of the data.

##### Props

* connectDropTarget: a function generated by React-dnd that allows the developer to register a JSX object to be a drop target.

#### Node

The Node component represents an individual node in the flow diagram. While currently each and every node is the same (excluding IDs), it is easy to create new unique Nodes extending from the base class. By default, each node has one in port and one out port. InPorts and OutPorts are differentiated in the [Port](#port) section.

Nodes register the click event in `componentDidMount()` so they can detect when they are being selected/deselected. The drag preview is also defined here as a static box with the same CSS as the actual box.

In the `render()` method, first the two ports are created, then they are attached to a box that has lots of defining CSS, a `ContextMenuTrigger` is created encapsulating the box, and finally the box is positioned in a `<div>`.

##### Props

* id: a number that represents the node's ID.
* left/top: numbers that represent the pixel location of the node.
* inPorts/outPorts: the number of in/out ports this node has.
* nodeName: a string that represents the type of node this is. A list of the names can be found in the [constants](#constants) section below.
* isSelected: a boolean representing whether or not this node is selected.
* modifySelection: a function that sets the selection state of any node.
* connectedPorts: a list of which ports on this node are connected.
* add/deleteConnection: functions that help create new or destroy existing connections; passed directly to InPorts.
* getNextConnectionId: self explanatory; increments the current counter by one.
* isDragging: a boolean generated by React-dnd that tells us whether the node is being dragged.
* connectDragSource: a function generated by React-dnd that allows the developer to register a JSX object to be a drag source.
* connectDragPreview: a function generated by React-dnd that allows the developer to register an image preview to a drag source.

#### Port

Ports are starting and ending points for connections. Since connections are directional, there are in and out ports. Both the `InPort` and `OutPort` component classes extend a base `Port` class, which contains shared functionality as well as acting as a model for the preview when its node is being dragged.

The `beginDrag()` function simply provides basic information that the drop target port will need in its `drop()` function. The `drop()` function deletes existing connections if they exist and create a new one in its place. There is a `canDrop()` function in the drop `spec` to prevent nodes from connecting to themselves.  

##### Props

* nodeID/portID: identification numbers that allow us to build connections.
* connected: boolean representing whether the port is already connected. 
* getNextConnectionId: self explanatory; increments the current counter by one.

For OutPort:

* connectDragSource: a function generated by React-dnd that allows the developer to register a JSX object to be a drag source.
* connectDragPreview: a function generated by React-dnd that allows the developer to register an image preview to a drag source.

For InPort:

* add/deleteConnection: functions that help create new or destroy existing connections.
* connectDropTarget: a function generated by React-dnd that allows the developer to register a JSX object to be a drop target.

#### NodeContextMenu

The NodeContextMenu is a model of a node's right click menu. As of right now, it is barebones and only displays basic information about the node. Since the menu is in a different component than the trigger, the `connectMenu()` function is used to pass props from the parent component of the trigger (Node) to this component.

##### Props

* id: a string representing the type of contextmenu generated. In this case there is only one type, and the name can be found in the [constants](#constants) section.
* trigger: an object that contains information passed from the node. Its shape can be whatever you want.

#### Connection



#### EditorDragLayer

### Constants
