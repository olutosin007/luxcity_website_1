# Insights Filter Feature

## Overview
The Insights page now includes a powerful filter section that allows users to quickly find relevant posts. The filter section sits just below the hero section and provides three main filtering options:

- **Keyword Search**: Search insights by typing keywords found in the title, description, or category.
- **Date Range**: Filter posts by selecting a start and end date.
- **Category Dropdown**: Choose from color-coded categories (Industry News, Company Updates, Product News) or view all categories.

## How It Works
- The filter section is styled to match the rest of the site, with a clean, modern look and subtle icons for search, calendar, and filter.
- The category filter is implemented as a dropdown menu. Each category is color-coded:
  - **Industry News**: Blue
  - **Company Updates**: Green
  - **Product News**: Purple
- The filter logic is applied in real-time as users interact with the search box, date pickers, or category dropdown. Only posts matching all selected criteria are displayed.

## Implementation Details
- The filter section is a React component using `useState` for managing filter values.
- The posts are filtered using JavaScript's `Array.prototype.filter` method, checking for matches on search term, date range, and category.
- The dropdown menu uses state to toggle visibility and select a category.
- The UI uses Tailwind CSS for styling and Lucide icons for visual cues.

## How to Use
1. **Search**: Type a keyword in the search box to filter posts by title, description, or category.
2. **Date Range**: Select a start and/or end date to show posts within that range.
3. **Category**: Click the category dropdown and select a category to filter by. The selected category is highlighted with its color.
4. All filters can be combined for precise results.

## Customization
- To add or change categories, update the `categoryOptions` array in `src/pages/Insights.tsx`.
- To adjust styling, modify the Tailwind CSS classes in the filter section.

## File Location
- Main implementation: `src/pages/Insights.tsx`
- Documentation: `docs/insights-filter-feature.md`

---
This feature improves the user experience by making it easy to find relevant insights quickly and efficiently. 