# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts the Vite development server at http://localhost:5173

### Production Build
```bash
npm run build
```
Compiles TypeScript and builds the application for production

### Preview Production Build
```bash
npm run preview
```
Serves the built application for preview

### Type Checking
```bash
npx tsc --noEmit
```
Runs TypeScript type checker without emitting files

## Project Structure

```
TrainApp/
├── app/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Navbar.tsx          # Navigation bar
│   │   │   ├── TrainSearch.tsx     # Train search and booking interface
│   │   │   ├── MyBookings.tsx      # User's bookings management
│   │   │   ├── LoginForm.tsx       # Authentication form
│   │   │   ├── LandingPage.tsx     # Home page
│   │   │   ├── Help.tsx            # Help and FAQ section
│   │   │   ├── Deals.tsx           # Special offers and promotions
│   │   │   └── SeatMap.tsx         # Seat selection component
│   │   ├── context/              # React context providers
│   │   │   └── AuthContext.tsx     # Authentication state management
│   │   ├── api/                  # API service functions
│   │   │   ├── axiosConfig.ts      # Axios instance configuration
│   │   │   ├── trainApi.ts         # Train-related API calls
│   │   │   └── userApi.ts          # User-related API calls
│   │   ├── types/                # TypeScript interfaces
│   │   │   └── index.ts            # All TypeScript interfaces
│   │   ├── App.tsx               # Main application component
│   │   ├── main.tsx              # Entry point
│   │   ├── index.css             # Global CSS styles
│   │   └── vite.config.ts        # Vite configuration
│   ├── public/                   # Static assets
│   ├── package.json              # Dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   └── vite.config.ts            # Vite build configuration
```

## Key Architectural Patterns

### State Management
- Uses **TanStack Query** for server state management (caching, background updates)
- **React Context** for authentication state (`AuthContext`)
- Local component state for UI-specific data (form inputs, toggles)

### API Communication
- Centralized `apiClient` instance with base URL and auth interceptor
- Service functions in `src/api/` for each domain (trainApi, userApi)
- Automatic JWT token handling via Axios request interceptor

### Routing
- **React Router v6** for client-side routing
- Routes defined in `App.tsx`:
  - `/` - Landing page
  - `/search` - Train search and booking
  - `/bookings` - User's bookings
  - `/help` - Help and FAQ
  - `/deals` - Special offers
  - `/login` - Authentication

### Styling
- **Tailwind CSS** for utility-first styling
- Custom color scheme with purple (#7a20c9, #5b1796) as primary colors
- Responsive design with mobile-first approach
- Dark/light mode considerations in color choices

## Component Responsibilities

### TrainSearch.tsx
- Main search interface for finding trains
- Handles form inputs for source, destination, date
- Displays search results with filtering capabilities
- Manages seat selection and booking process
- Shows booking success/error messages

### MyBookings.tsx
- Displays user's current bookings
- Allows cancellation of bookings
- Shows booking details (train info, passenger info, fare)
- Handles loading and error states

### Navbar.tsx
- Application navigation with logo and links
- Authentication-aware UI (shows login/logout based on state)
- Responsive design with mobile dropdown menu

### LoginForm.tsx
- Username/password authentication form
- Handles form validation and submission
- Redirects to home on successful login
- Shows error messages for invalid credentials

### SeatMap.tsx
- Visual representation of train seating arrangement
- Shows available/booked seats with color coding
- Allows seat selection (though currently display-only in this implementation)

## Data Flow

1. **Authentication**: 
   - User logs in via LoginForm
   - AuthContext stores user data and token in localStorage
   - Axios interceptor automatically attaches token to requests

2. **Train Search**:
   - User enters search criteria in TrainSearch
   - Calls `searchTrains` API via TanStack Query
   - Results displayed with filtering options
   - Selecting a train shows schedule and seat availability

3. **Booking Process**:
   - User selects seats and enters passenger count
   - Calls `bookTicket` API via useMutation
   - On success: shows confirmation message and invalidates related queries
   - On error: displays error message

4. **Booking Management**:
   - MyBookings component fetches user's bookings via `fetchBookings`
   - Cancel booking via `cancelBooking` mutation
   - Successful cancellation refreshes the bookings list

## Common Development Tasks

### Adding a New Feature
1. Create new component in `src/components/`
2. Add route to `App.tsx` if needed
3. Implement API calls in `src/api/` if backend interaction needed
4. Add any new TypeScript types to `src/types/index.ts`
5. Style using Tailwind CSS utilities

### Modifying API Calls
1. Update appropriate service file in `src/api/`
2. Ensure axiosConfig has correct baseURL and headers
3. Update corresponding TypeScript types if needed
4. Handle loading/error states in components

### Styling Updates
- Use Tailwind utility classes directly in JSX
- Follow existing color scheme and spacing conventions
- Maintain responsive design principles
- Check consistency with existing components

### State Management Patterns
- Use TanStack Query for server state (data fetching, mutations)
- Use React Context for global state (authentication)
- Use useState/useReducer for local component state
- Always handle loading, error, and empty states

## Code Quality Practices

### TypeScript
- Strict type checking enabled
- Define interfaces for all API responses and request bodies
- Use generic types with TanStack Query hooks
- Avoid `any` type when possible

### React Best Practices
- Functional components with hooks
- Early returns for conditional rendering
- Proper key props for list items
- Accessible form elements with labels
- Error boundaries for error handling

### Styling Conventions
- Mobile-first responsive design
- Consistent spacing (using Tailwind's spacing scale)
- Semantic color usage (primary, secondary, success, error, etc.)
- Hover and focus states for interactive elements

## Troubleshooting

### Common Issues
1. **API Connection Errors**: 
   - Check backend server is running on localhost:8086
   - Verify API endpoints in service files match backend routes
   - Check network tab in dev tools for failed requests

2. **Authentication Issues**:
   - Ensure token is being stored in localStorage after login
   - Verify Axios interceptor is attaching token to requests
   - Check that AuthContext is properly providing user data

3. **TypeScript Errors**:
   - Run `npx tsc --noEmit` to see all type errors
   - Check that API response types match actual responses
   - Ensure proper handling of nullable/undefined values

4. **Styling Issues**:
   - Verify Tailwind classes are spelled correctly
   - Check for conflicting utility classes
   - Ensure responsive prefixes (sm:, md:, lg:) are used appropriately

## Database
The application uses a SQL database (refer to `Train_Booking_DB.sql` for schema). Key tables include:
- Users (authentication)
- Trains (train information)
- Schedules (train schedules with pricing)
- Bookings (user reservations)
- Tickets (individual ticket details)

When making changes that affect the database schema, update the SQL file accordingly and ensure migration scripts are maintained.