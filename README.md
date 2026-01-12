# Hackathon Demo Showcase

A beautiful, responsive carousel website for showcasing hackathon projects and demos.

## Features

- 🎨 **3D Circular Carousel** - Large center image with smaller previews on both sides
- 🔄 **Infinite Scrolling** - Wraps around seamlessly in both directions
- ⌨️ **Keyboard Navigation** - Use arrow keys to navigate
- 📱 **Touch/Swipe Support** - Mobile-friendly swipe gestures
- 🎯 **Modular Projects** - Easy to add/remove projects
- 🌙 **Dark Theme** - Modern gradient background

## Quick Start

1. Open `index.html` in a browser
2. Use arrow buttons, keyboard arrows, or swipe to navigate

## Adding/Removing Projects

### To Add a New Project:

1. Create a new file in the `projects/` folder (e.g., `my-project.js`)
2. Copy the template from `projects/README.md`
3. Import it in `projects/index.js`
4. Add it to the `projects` array

### To Remove a Project:

1. Delete the project file from `projects/` folder
2. Remove the import from `projects/index.js`
3. Remove it from the `projects` array

See [projects/README.md](projects/README.md) for detailed instructions.

## Project Structure

```
demo-display.github.io/
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── script.js           # Carousel logic
├── images/             # Project cover images
│   └── README.md       # Image guidelines
└── projects/           # Project definitions
    ├── README.md       # Project management guide
    ├── index.js        # Project imports & exports
    ├── banana-betting.js
    ├── defi-dashboard.js
    ├── nft-marketplace.js
    └── social-dapp.js
```

## Deployment

### GitHub Pages

1. Push to your GitHub repository
2. Go to Settings → Pages
3. Select branch (usually `main`)
4. Your site will be live at `https://yourusername.github.io/repo-name/`

### Custom Domain

Add a `CNAME` file with your domain name and configure DNS settings.

## Customization

- **Colors**: Edit the gradient and colors in `styles.css`
- **Animations**: Adjust transition timing in `styles.css`
- **Card Scale**: Modify scale values for left/right/active cards in `styles.css`
- **Placeholder Images**: Replace with your actual project screenshots

## Browser Support

Works on all modern browsers that support ES6 modules:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

See [LICENSE](LICENSE) file for details.
