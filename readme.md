# Tobeez

This project is a modular landing page for Tobeez app. The codebase has been structured to be easily maintainable, where each component can be modified independently without affecting other parts of the website.

## Project Structure

```
project/
├── assets/               (Images and static resources)
├── components/           (HTML components)
│   ├── navbar.html       (Navigation and header)
│   ├── hero.html         (Hero section with demo)
│   ├── brands.html       (Trusted brands section)
│   ├── api.html          (API features section)
│   ├── benefits.html     (Benefits of using Pixa)
│   ├── tools.html        (Pre-built AI tools)
│   ├── features.html     (Additional features)
│   ├── testimonials.html (User testimonials)
│   ├── pricing.html      (Pricing plans)
│   ├── blog.html         (Blog articles)
│   ├── faq.html          (Frequently asked questions)
│   ├── cta.html          (Call to action section)
│   ├── newsletter.html   (Newsletter signup)
│   └── footer.html       (Footer section)
├── css/
│   ├── main.css          (Main CSS that imports all component CSS)
│   ├── tailwind-build.css (Production Tailwind CSS)
│   ├── index.css         (Base CSS)
│   └── components/       (Component-specific CSS)
│       ├── navbar.css
│       ├── hero.css
│       └── ...
├── js/
│   ├── component-loader.js (Loads HTML components)
│   ├── components.js     (Exports component classes)
│   ├── index.js          (Main JS that initializes modules)
│   └── modules/          (JavaScript modules)
│       ├── navbar.js
│       ├── hero.js
│       ├── dropdown.js
│       ├── prompt.js
│       ├── animations.js
│       └── faq.js
└── index.html            (Main HTML that includes components)
```

## Usage


### Development Setup

This template uses Tailwind CSS with the `tw-` prefix to differentiate Tailwind classes from other classes. During development:

1. Include the runtime CSS:
```html
<link rel="stylesheet" href="./css/tailwind-runtime.css">
<link rel="stylesheet" href="./css/main.css">
```

2. Start Tailwind during development:

```
npm run start:tailwind
```
(after installing the cross-env package: npm install --save-dev cross-env)
### Production Setup

For production:

1. Include the build CSS:
```html
<link rel="stylesheet" href="./css/tailwind-build.css">
<link rel="stylesheet" href="./css/main.css">
```

2. Create a build file:
```
npm run build:tailwind
```

## How to Modify Components

### HTML Components

Each section of the website is in its own HTML file in the `components/` directory. To modify a section:

1. Find the relevant component file (e.g., `components/hero.html`)
2. Make your changes to the HTML structure
3. The changes will automatically be loaded via the component loader

### CSS Styling

1. To add or modify styles, edit the component-specific CSS file in `css/components/`
2. Component-specific styles should be placed in their respective files
3. Global styles should be added to `css/index.css`

### JavaScript Functionality

1. Each component has its own JavaScript module in `js/modules/`
2. Modify the functionality in the respective module
3. If adding new functionality:
   - Create a new module or add to an existing one
   - Import the module in `js/index.js` if needed
   - Add initialization code to the component load event handler

## Adding or Removing Sections

### To Remove a Section:

1. Remove the component's container div from `index.html`
2. That's it! The section will no longer be loaded

### To Add a New Section:

1. Create a new HTML file in the `components/` directory
2. Add a container div to `index.html` with a unique ID
3. Add the component to the `components` array in `js/component-loader.js`
4. Create any necessary CSS and JavaScript files
5. Import and initialize the new module in `js/index.js`

## Best Practices

1. Keep component HTML files focused on structure and content
2. Put component-specific JavaScript in its own module
3. Use event delegation where possible to minimize event listeners
4. Follow the naming conventions throughout the project

For help, contact [here](https://). Response within 24-48 hours during business days.