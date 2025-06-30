# Current Insights Editorial Process
*Created: March 6, 2025*

## Overview
This document outlines the current process for managing blog posts and insights in the interim period before implementing the WordPress solution. The system uses a simple markdown-based approach with in-memory storage.

## Content Structure

### Post Format
Each blog post requires the following information:
```markdown
---
title: "Post Title"
category: "Category Name"
date: "YYYY-MM-DD"
description: "Brief description of the post"
image: "/images/image-path.jpg"
author:
  name: "Author Name"
  role: "Author Role"
  avatar: "/images/team/author-avatar.jpg"
tags:
  - Tag1
  - Tag2
  - Tag3
readingTime: "X min read"
---

# Post Content in Markdown
```

### Required Fields
1. **Title**: The main title of the post
2. **Category**: The post category (e.g., "Research Report", "Market Analysis")
3. **Date**: Publication date in YYYY-MM-DD format
4. **Description**: A brief summary of the post
5. **Image**: Path to the featured image
6. **Author**: Author information including name, role, and avatar
7. **Tags**: Relevant tags for the post
8. **Reading Time**: Estimated reading time

## Adding New Posts

### Method 1: Using the Admin Interface
1. Navigate to `/admin/insights` in the application
2. Click "New Post" button
3. Fill in all required fields in the form
4. Click "Create Post" to save

### Method 2: Direct File Creation
1. Create a new markdown file in `src/content/news/`
2. Use the format shown above
3. Add the file to the `posts` array in `src/utils/newsLoader.ts`

## Image Requirements

### Featured Images
- Recommended size: 800x400 pixels
- Format: JPG or PNG
- Location: `/public/images/`
- Naming convention: descriptive-name.jpg

### Author Avatars
- Recommended size: 200x200 pixels
- Format: JPG or PNG
- Location: `/public/images/team/`
- Naming convention: author-name-avatar.jpg

## Content Guidelines

### Writing Style
1. Use clear, professional language
2. Break content into sections with headers
3. Use bullet points for lists
4. Include relevant images where appropriate

### Markdown Formatting
- Use `#` for main title
- Use `##` for section headers
- Use `-` for bullet points
- Use `**text**` for bold
- Use `*text*` for italic
- Use `![Alt text description](/images/your-image.jpg)` for images


### Categories
Current categories include:
- Research Report
- Market Analysis
- Industry Report
- Case Study
- News

## Technical Implementation

### File Structure
```
src/
├── content/
│   └── news/
│       └── post-name.md
├── utils/
│   └── newsLoader.ts
└── pages/
    ├── Insights.tsx
    ├── InsightPost.tsx
    └── admin/
        └── InsightsManager.tsx
```

### Data Flow
1. Posts are stored in `newsLoader.ts`
2. Posts are loaded and displayed in `Insights.tsx`
3. Individual posts are rendered in `InsightPost.tsx`
4. Posts can be managed through `InsightsManager.tsx`

## Limitations

### Current System
1. In-memory storage (posts are lost on page refresh)
2. No search functionality
3. No category filtering
4. No image upload interface
5. No draft system

### Workarounds
1. Keep a backup of the `newsLoader.ts` file
2. Use the admin interface for post management
3. Implement proper image optimization before uploading
4. Use descriptive filenames for better organization

## Best Practices

### Content Creation
1. Write content in a markdown editor first
2. Optimize images before adding to the project
3. Use consistent formatting
4. Include relevant tags
5. Add proper meta descriptions

### Image Management
1. Compress images before adding
2. Use descriptive filenames
3. Maintain consistent aspect ratios
4. Store in appropriate directories

### Code Management
1. Keep `newsLoader.ts` backed up
2. Use version control for content changes
3. Document any custom implementations
4. Follow the established file structure

## Troubleshooting

### Common Issues
1. **Posts not appearing**
   - Check if the post is added to `newsLoader.ts`
   - Verify the markdown format
   - Check for any console errors

2. **Images not loading**
   - Verify image path
   - Check if image exists in the correct directory
   - Ensure proper file permissions

3. **Formatting issues**
   - Check markdown syntax
   - Verify frontmatter format
   - Ensure proper spacing

## Next Steps
This interim solution will be replaced by the WordPress implementation. Until then:
1. Continue using the current system
2. Document any issues or improvements needed
3. Prepare content for migration to WordPress
4. Maintain consistent formatting for easy migration 