# Premium Outdoor Gear Store - Product Detail Page (PDP)

A responsive Product Detail Page (PDP) built for a premium outdoor gear store using React, TypeScript, and Vite. The application provides a modern e-commerce experience with product variant selection, image galleries, cart persistence, and responsive layouts across devices.

## 🌐 Live Demo

You can view the deployed application here:

👉 https://outdoor-gear-pdp-ten.vercel.app/

## Tech Stack

* React 19
* TypeScript
* Vite
* SCSS Modules
* React Context API
* Vitest
* localStorage
* Fake Store API

---

## Setup

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Run tests

```bash
npm run test
```

---

## Key Features

* Interactive product image gallery with thumbnail navigation
* Desktop image zoom functionality
* Color swatch and size variant selection
* Stock-aware quantity controls and add-to-cart flow
* Cart persistence using localStorage
* Deep-linkable product variants via URL parameters
* Product details section with Description, Specifications, and Reviews
* Fully responsive layout optimized for desktop and mobile devices

---

## Project Structure

```text
src/
├── components/
├── pages/
├── cntext/
├── routes/
├── data/
├── styles/
├── utils/

tests/
docs/
```

---

## Design Decisions

* **TypeScript** for improved type safety and maintainability.
* **React Context API** for lightweight global state management without additional dependencies.
* **SCSS Modules** for component-scoped styling and better scalability.
* **localStorage** for preserving cart state across page refreshes.
* **URL-based variant selection** to support deep-linking and shareable product configurations.

---

## Trade-offs

* Product variants and inventory data are mocked because the Fake Store API does not provide this information.
* Reviews are static and not backed by a live service.
* Context API is sufficient for the current scope but may require migration to a more robust state management solution as the application grows.

---

## API

Product data is fetched from:

https://fakestoreapi.com
