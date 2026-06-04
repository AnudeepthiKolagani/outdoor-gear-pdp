# Technical Decisions

This document outlines the key architectural and implementation decisions made during the development of the Product Detail Page (PDP) application.

---

## React + TypeScript

I chose React because it is a widely adopted library for building component-based user interfaces and provides excellent support for creating reusable UI components.

TypeScript was used to improve code reliability through static type checking, better IDE support, and safer refactoring. Since the application contains multiple interconnected components and shared state, TypeScript helps reduce runtime errors and improves maintainability.

---

## Vite as the Build Tool

Vite was selected for its fast development experience, instant hot module replacement (HMR), and optimized production builds.

Compared to traditional bundlers, Vite offers significantly faster startup and rebuild times, making development more efficient.

---

## SCSS Modules

SCSS Modules were chosen to provide locally scoped styles and prevent style leakage between components.

This approach keeps styles maintainable as the application grows while still allowing the use of Sass features such as variables, nesting, and reusable mixins.

---

## React Context API for State Management

The application requires shared cart state across multiple components but does not have enough complexity to justify introducing a larger state management library.

React Context API provides a lightweight solution for managing global state while keeping the dependency footprint minimal.

---

## Tabs Instead of Accordion

The Product Details section was implemented using tabs instead of an accordion.

### Reasons

* Users can switch between Description, Specifications, and Reviews with a single click.
* All available sections are visible at once, improving discoverability.
* Tabs provide a cleaner desktop experience where sufficient horizontal space is available.
* The content sections are closely related and intended for comparison, making tabs a natural fit.

An accordion would have been more appropriate if the content were significantly longer or if reducing vertical scrolling was the primary concern.

---

## URL-Based Variant Selection

The selected color and size are synchronized with URL parameters.

### Benefits

* Product configurations can be shared using a direct link.
* Browser refreshes preserve the selected variant.
* Improves user experience by making the page deep-linkable.

---

## localStorage Persistence

Cart data is stored in localStorage to persist user selections across page refreshes.

This approach satisfies the project requirements while avoiding the need for backend services or user authentication.

---

## Component-Driven Architecture

The application is organized into focused and reusable components.

### Benefits

* Improved readability and maintainability.
* Easier testing of individual components.
* Better separation of concerns.
* Simplified future enhancements.

Whenever a component began taking on multiple responsibilities, it was split into smaller, more focused components.

---

## Testing Strategy

Vitest was chosen for unit testing because it integrates seamlessly with Vite and provides a fast testing experience.

The tests focus on validating component behavior, user interactions, and utility functions to ensure critical functionality remains reliable during future changes.

---

## Known Trade-offs

* Product variant data (colors, sizes, stock levels) is mocked because the Fake Store API does not provide variant information.
* Reviews are static and not fetched from an external service.
* Context API is sufficient for the current scope but may become less suitable if the application's state management requirements grow substantially.

---

## Future Improvements

If the application were expanded further, potential improvements would include:

* Backend-powered cart persistence
* Real inventory management
* Dynamic reviews and ratings
* Product recommendations
* End-to-end testing
* Accessibility enhancements
* Server-side rendering for improved SEO
