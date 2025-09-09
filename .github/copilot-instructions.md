# AI Pets - Pet-Friendly Meetup Landing Page

AI Pets is a static HTML/CSS/JavaScript landing page for a pet-friendly meetup service. The application allows users to sign up for early access to a platform that helps pet owners find pet-friendly places and events.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

- **NO BUILD PROCESS REQUIRED**: This is a static website with HTML, CSS, and JavaScript files that can be served directly.
- Start the local development server:
  - `cd /path/to/ai-pets`
  - `python3 -m http.server 8080` - NEVER CANCEL: Takes ~2 seconds to start. Set timeout to 30+ seconds.
  - Alternative: `python -m http.server 8080` (if python3 not available)
  - Alternative: Any HTTP server like `npx serve` or `php -S localhost:8080`
- Access the application at `http://localhost:8080`
- **NO DEPENDENCIES**: No package.json, no npm install, no build tools required.

## Validation

- **CRITICAL**: Always manually validate functionality after making changes by testing in a browser.
- **COMPLETE USER SCENARIOS**: Test the full email signup workflow:
  1. Load the page at `http://localhost:8080`
  2. Enter a valid email (e.g., `test@example.com`) and click "Fetch Early Access"
  3. Verify success message: "Thank you! We'll notify you when we launch! 🐾"
  4. Test invalid email validation by entering `invalid-email` and clicking submit
  5. Verify error message: "Please enter a valid email address."
  6. Test empty email validation by clicking submit with empty field
  7. Verify error message: "Please enter your email address."
- **FORM VALIDATION**: The JavaScript validates email format and provides user feedback.
- **EXTERNAL RESOURCES**: Google Fonts and Unsplash images may be blocked in restricted environments but don't affect core functionality.

## File Structure

```
/ai-pets/
├── index.html       # Main landing page
├── styles.css       # All styling and responsive design
├── script.js        # Email form validation and interaction
└── README.md        # Minimal project description
```

## Key Components

### Email Signup Form
- **Location**: Main hero section of index.html
- **JavaScript Handler**: script.js handles form submission and validation
- **Validation**: Email format validation with user feedback
- **Success State**: Shows confirmation message and clears form

### Responsive Design
- **Mobile-First**: CSS includes responsive breakpoints
- **Key Breakpoint**: `@media (max-width: 650px)` for mobile layout
- **Components**: Hero section, benefits cards, process steps, footer

## Common Tasks

### Making Changes to the Application
1. **Always start the server first**: `python3 -m http.server 8080`
2. **Edit files directly**: No compilation or build step needed
3. **Refresh browser**: Changes are immediately visible (Ctrl+F5 for hard refresh)
4. **Test functionality**: Always validate email signup workflow after changes

### Testing Email Form
- **Valid Email Test**: Enter `test@example.com`, expect success message
- **Invalid Format Test**: Enter `invalid-email`, expect validation error
- **Empty Field Test**: Submit empty form, expect required field error
- **Message Timeout**: Success/error messages disappear after 5 seconds

### File Modifications
- **HTML Changes**: Edit `index.html` directly
- **Styling Changes**: Edit `styles.css` directly  
- **JavaScript Changes**: Edit `script.js` directly
- **No Build Step**: All changes are immediately available after browser refresh

## Repository Status (as of validation)

### Files Present and Working
```
ls -la
total 24
-rw-rw-r-- 1 runner runner   10 README.md
-rw-rw-r-- 1 runner runner 2938 index.html
-rw-rw-r-- 1 runner runner 4063 styles.css
-rw-rw-r-- 1 runner runner 1552 script.js
```

### What Works
- ✅ HTML page loads correctly
- ✅ CSS styling applies properly (responsive design)
- ✅ JavaScript email validation functions correctly
- ✅ Form submission with success/error feedback
- ✅ All interactive elements working (buttons, links, form)

### Known Limitations
- External Google Fonts may be blocked in restricted environments (graceful fallback to system fonts)
- External Unsplash image may be blocked (shows broken image placeholder)
- No backend - email submissions are logged to browser console only

## Timing Expectations

- **Server Startup**: ~2 seconds - NEVER CANCEL. Set timeout to 30+ seconds.
- **Page Load**: Instant (static files)
- **Form Interaction**: Immediate response
- **No Build Time**: This is a static site with no compilation needed

## Validation Checklist

When making changes, always verify:
- [ ] Server starts successfully with `python3 -m http.server 8080`
- [ ] Page loads at `http://localhost:8080` without console errors
- [ ] Email form accepts valid email and shows success message
- [ ] Email form rejects invalid email with error message  
- [ ] Page is responsive on mobile breakpoint (< 650px width)
- [ ] All interactive elements respond to clicks/touches
- [ ] No JavaScript errors in browser console

## Development Notes

- **Simple Architecture**: Pure HTML/CSS/JS - no frameworks or build tools
- **No Testing Framework**: Manual browser testing is the validation method
- **No Linting**: No ESLint, Prettier, or other code quality tools configured
- **No CI/CD**: No GitHub Actions or automated testing
- **Static Hosting Ready**: Can be deployed to any static hosting service

## Troubleshooting

**Server Won't Start**
- Ensure Python 3 is installed: `python3 --version`
- Try alternative: `python -m http.server 8080`
- Check port availability: `lsof -i :8080`

**Form Not Working**
- Check browser console for JavaScript errors
- Verify `script.js` is loaded (check Network tab in DevTools)
- Test with simple browser reload (F5)

**Styling Issues**
- Verify `styles.css` is loading (check Network tab)
- Test responsive design with browser DevTools
- Check for CSS syntax errors in browser console