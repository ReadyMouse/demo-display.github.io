# Images Directory

Store your project cover images here.

## Image Guidelines

- **Recommended size**: 800x500px (or 16:10 aspect ratio)
- **Format**: PNG, JPG, or WebP
- **Naming**: Use kebab-case matching your project ID (e.g., `banana-betting.png`)
- **File size**: Keep under 500KB for faster loading

## Adding Images

1. Add your image to this folder
2. Update the `image` property in your project file to point to it

**Example:**
```javascript
export default {
    id: 'my-project',
    title: 'My Project',
    image: './images/my-project.png',  // Path to your image
    // ... other properties
};
```

## Placeholder Images

If you don't have an image yet, you can use placeholder services:
- https://via.placeholder.com/800x500
- https://placehold.co/800x500
- https://picsum.photos/800/500

Or create a simple colored background with text using an online tool.
