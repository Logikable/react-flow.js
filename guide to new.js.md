# Guide to new.js

#### Disclaimer: This guide assumes intermediate level knowledge of Javascript, HTML, and minimal knowledge of Linux. It will not cover CSS or any of its new dialects.

## Introduction

Historically, web applications would be written with a small handful of languages (HTML, Javascript, perhaps PHP) and potentially a supporting library such as jQuery. Within the past 5 years, a number of new technologies have rapidly popped up, turning web development from one of the simplest fields of computer science into one of the most complex. This guide aims to systematically break down each component of the modern web dev stack and provide tutorials for libraries and frameworks **relevant to this project** for a novice developer or one that has not done web development since jQuery was the go-to library. If you have followed the web dev scene more recently than 2010, scroll down through the section titles until you have hit one that you are not familiar with.

### HTML

Previously, you probably worked with HTML 4. HTML 5 was introduced 2 years ago and was not a significant change from the old language. There are a few new tags such as `<canvas>`, `<header>`, and `<footer>`, but nothing substantial that has not been seen before. The major difference here is that much of web development has shifted from structuring with HTML, scripting with JS, and styling with CSS to coding much of everything with Javascript.

With the introduction of React, an extension of Javascript called JSX was created that allows programmers to easily include HTML in their scripts. More about this will be covered later.

### Javascript

Javascript has been radically changed in the last few years. To standardize Javascript, a specification called ECMAScript (or ES for short) was introduced. Most developers reading this are probably most familiar with ES5, which was released in 2009. In 2015, ES6/ES2015 was released and came with significant new syntax which we will hopefully cover later. Google Chrome does not support ES6, which makes compilers that compile ES6 code into ES5 code (also known as transpilers) a necessary part of the stack. An example that we will see in this guide is Babel.

As of last year, ES7/ES2016 was released, but will not be covered in this tutorial due to the lack of important new functionality it brings.

### Node.js and npm

As you may know, Node.js is a backend environment that executes Javascript on the server-side while also runs a web server for you. Although its backend programming capabilities will not be discussed in this guide, npm (or Node.js Package Manager) will be integral. npm is a package manager much like apt-get and yum, except it is used for web development. The functionality it brings that we will be using in this guide is single command installation and command aliases.

### Libraries and Frameworks



### React.js



### Babel, transpilers, and polyfill

As mentioned previously, recently Javascript has been changing at an exponential rate. Some browsers are too complex (Google Chrome) or too old (IE8, 9) to properly support the new syntax, and so transpilers and polyfills are needed. A transpiler translates and compiles new syntax to older syntax (such as ES6 to ES5), and polyfills are scripts and libraries that act as browser fallbacks, implementing new functionality using older javascript that is supported. Babel is a transpiler that we will be using in this tutorial, as it will transpile newer React.js syntax and ES6 into older, browser-supported ES5.

### Webpack

Since newer technologies like AngularJS, React.js, and Vue.js are demanding that all web applications are composed of many different separate, reusable parts, there becomes a tendency to have many files in your application and even more in your dependencies. Since there are so many components, plenty of interconnectivity between scripts and assets exist. This can lead to a great reduction in the efficiency of your application both because there are a lot of separate small files and scripts will repeatedly request for each other. Webpack helps alleviate this problem by combining the components you have created and the dependencies you need into a small number of static large files, thereby decreasing the number of times your web page requests for resources.

### React-dnd

## Other terminology (Optional)

There are other terminology and components to the web development stack that are not necessary for this guide, but may be good to know.

### Vue.js

## Setting up your environment
