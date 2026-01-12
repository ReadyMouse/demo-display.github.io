# Projects Directory

This directory contains all the hackathon project definitions for the carousel.

## Adding a New Project

1. **Create a new project file** (e.g., `my-awesome-project.js`)
2. **Copy this template:**

```javascript
// My Awesome Project
export default {
    id: 'my-awesome-project',
    title: 'My Awesome Project',
    subtitle: '1st Place Winner',
    image: './images/my-awesome-project.png',  // Store images in /images folder
    event: 'Hackathon Name - Month Year',
    githubUrl: 'https://github.com/yourusername/my-awesome-project',
    youtubeUrl: 'https://youtube.com/watch?v=...',  // Set to null if not available
    demoUrl: 'https://my-awesome-project-demo.com'  // Set to null if not available
};
```

3. **Import it in `index.js`:**
   - Add the import: `import myAwesomeProject from './my-awesome-project.js';`
   - Add it to the projects array in the desired position

4. **Done!** Refresh the page to see your new project in the carousel.

## Removing a Project

1. **Delete the project file** (or move it elsewhere)
2. **Remove the import from `index.js`**
3. **Remove it from the projects array in `index.js`**

## Project Properties

- `id`: Unique identifier (kebab-case recommended)
- `title`: Project name displayed prominently
- `subtitle`: Award or achievement
- `image`: Path to project image (store in `/images` folder, 800x500px recommended)
- `event`: Hackathon/event name and date
- `githubUrl`: Link to GitHub repository (set to `null` or empty string if not available)
- `youtubeUrl`: Link to YouTube promo video (set to `null` or empty string if not available)
- `demoUrl`: Link to live demo site (set to `null` or empty string if not available)

**Note:** Buttons for unavailable links will be automatically greyed out and disabled.

## Images

Store project images in the `/images` folder. See [/images/README.md](../images/README.md) for guidelines.

## Display Order

Projects are displayed in the order they appear in the `projects` array in `index.js`.
Rearrange the array to change the display order.
