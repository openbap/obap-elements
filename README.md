# Open Business Application Platform Web Components

> IMPORTANT: The Open Business Application Platform Web Components are a work in progress and subject to major changes until the 1.0 release.

The Open Business Application Platform Web Components (OBAP Elements) are a collection of Web Components designed specifically for desktop browser line of business applications and implement a simplified and modified Material Design.

## Components

* [Completed Elements](docs/COMPONENTS.md)
* [Demos](https://openbap.github.io/demo/)
* [Task List](TASKS.md)
* [Change Log](CHAMGELOG.md)

## Quick Start

### 1) Install

Install the components from NPM:

```
npm i @obap/obap-elements
```

### 2) Import the elements that you wish to use

TODO

## Additional Resources

A good starting place is the [LitElement documentation](https://lit-element.polymer-project.org/), and the [Material Web Components](https://github.com/material-components/material-components-web-components) have some useful information (since they're also based on LitElement).

## Progress

This suite of web components is very ambitious (have a look at the [list of elements](TASKs.md) that are proposed), so it's going to take a while. The intended release schedule is:

|Version           |Features                                                                          |Status     |
|------------------|----------------------------------------------------------------------------------|-----------|
|0.0.x             |Lots of these, which will just be periodic commits as work pregresses.            |In Progress|
|0.1.x             |Elements are all implemented- this is the standardization and stabilization phase.|Not Started|
|0.2.x             |Element demo phase - complete and detailed demos will be created.                 |Not Started|
|0.3.x             |Element documentation phase - complete and detailed documentation will be created.|Not Started|
|0.4.x             |Application demo phase - one or more complete application demos will be created.  |Not Started|
|0.5.x             |Developer guide phase - a complete and detailed developer guide will be created.  |Not Started|
|1.0.0             |First release.                                                                    |Not Started|

*The elements will only be usable from version 0.2.x, before that they'll be unstable and incomplete.*

## Motivation

The idea for these components didn't just pop out of the blue. I've been developing components and application frameworks for multiple platforms for many years and have been frustrated with the underlying components used to build line of business applications. There's very little in the open source world that caters for business applications and commercial products are, well, commercial. They try to cater for the widest possible audience and continue adding features to justify paid upgrades, which results in bloat and a lot of unnecessary features for any given user. The Open Business Application Platform Web Components try a different approach and provide an opinionated solution that just gets the job done.

Obviously, none of this would be possible with shamelessly studying other excellent products and libraries to figure out how to do things. Special thanks go to:

* [Polymer](https://polymer-library.polymer-project.org/), which got me started with Web Components
* [LitElement](https://lit-element.polymer-project.org/) is just amazing - that's all.
* [Polymer Elements](https://www.webcomponents.org/author/PolymerElements) - I learn something new from them every day.
* [Material Web Components](https://github.com/material-components/material-components-web-components) are an excellent LitElement resource.
* [Material Design](https://material.io/design) - I live here.
* [Wired Elements](https://wiredjs.com/) - Another excellent LitElement component suite to study.
* [Flutter](https://flutter.dev/) - not web, but their component suite is second to none and excellent for ideas.
* [Open Web Component Recommendations](https://open-wc.org/) - just use it, no arguments.
