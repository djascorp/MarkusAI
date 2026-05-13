---
name: qa-web
description: >
  QA tests for the MarkusAI web application. Tests critical user flows including
  authentication (Fortify), onboarding, dashboard, content generation, content review,
  agent management, and settings. Uses agent-browser for browser-based testing.
---

# QA Web App Tests

## Testing Target

This project does NOT use Vercel/Netlify preview deployments. The QA workflow must:

1. Start the dev server locally using `composer run dev` (starts PHP server + queue worker + Vite concurrently)
2. Poll `http://localhost:8000` until it responds (up to 30 seconds)
3. Use `http://localhost:8000` as the base URL for all browser tests

**CRITICAL:** Do NOT fall back to any remote environment. Either use localhost or report BLOCKED.

## Authentication

The app uses Laravel Fortify with email/password authentication.

**For testing, create a fresh user via the registration page:**
1. Navigate to `/register`
2. Fill in: Name, Email, Password, Confirm Password
3. Click "Create account"
4. This creates a new user with an empty workspace

**Test credentials are created dynamically during each run.** No pre-existing test accounts needed.

## App Layout

After login, the app uses a dark sidebar layout (`MarkusLayout`) with:
- **Sidebar navigation:** Dashboard, AI Agents, Content Drafts, ROI & Analytics, Settings & Strategy, Active Agents quick links
- **Top bar:** With user menu
- **Color scheme:** Dark theme with gold accents (#D4AF37), dark backgrounds (#0A0A0B, #0E0E11, #111114)

## Available Test Flows

### Flow 1: User Registration

**When to run:** Changes to registration page, Fortify config, auth middleware, User model, or workspace creation.

**Steps:**
1. Navigate to `/register`
2. Verify the registration form renders with fields: Name, Email, Password, Confirm Password
3. Fill in all fields with valid test data
4. Click "Create account" button
5. Verify redirect to dashboard or onboarding page
6. Verify the user is authenticated (sidebar is visible)

**Success criteria:** User is created and redirected to an authenticated page.

**Variations:**
- Test with invalid email format -> should show validation error
- Test with short password -> should show validation error
- Test with mismatched passwords -> should show validation error

### Flow 2: User Login

**When to run:** Changes to login page, Fortify config, auth middleware, or session management.

**Steps:**
1. First register a user (see Flow 1)
2. Log out via user menu
3. Navigate to `/login`
4. Fill in Email and Password
5. Click "Log in" button
6. Verify redirect to dashboard
7. Verify sidebar shows user name

**Success criteria:** User is logged in and sees the dashboard with their name in the sidebar.

**Variations:**
- Test with wrong password -> should show error message
- Test with non-existent email -> should show error message
- Test "Remember me" checkbox

### Flow 3: Dashboard

**When to run:** Changes to `DashboardController`, `dashboard.tsx`, `DashboardMetrics` service, or shared metric components.

**Steps:**
1. Login as owner
2. Verify dashboard loads at `/dashboard`
3. Verify the page shows:
   - "CMO Dashboard" heading
   - Marketing Health Score metric card
   - Traffic trend chart (area chart from Recharts)
   - Priority Actions section
   - Agent Activity section
4. Verify sidebar "Dashboard" link is highlighted as active

**Success criteria:** Dashboard renders with all metric sections and the traffic chart.

### Flow 4: Onboarding

**When to run:** Changes to `OnboardingController`, `onboarding/index.tsx`, workspace creation, or agent deployment logic.

**Steps:**
1. Login as owner
2. Navigate to `/onboarding` (via sidebar "Settings & Strategy" link)
3. Verify step 1 renders with URL input field
4. Enter a URL (e.g., `https://example.com`)
5. Click "Analyze Site"
6. Wait for analysis (currently simulated with setTimeout)
7. Verify step 2 renders showing:
   - "Analysis Complete" header
   - Primary Audience card
   - Detected Tone card
   - Goal selection checkboxes
   - Agent deployment badges (SEO Agent, Writer Agent, Reddit Agent, X Agent, LinkedIn Agent)
8. Click "Deploy CMO Team"
9. Verify step 3 renders with "Your AI CMO is deployed!" message
10. Click "Go to Dashboard"
11. Verify redirect to dashboard

**Success criteria:** All 3 onboarding steps complete and redirect to dashboard.

**Note:** The onboarding is currently a client-side mockup with no backend persistence. The test should verify the UI flow works correctly even though no data is saved.

### Flow 5: Content Generation

**When to run:** Changes to `ContentController`, `DraftController`, `GenerateDraftAction`, `GenerateDraftJob`, `generate-content-dialog.tsx`, or content/index.tsx.

**Steps:**
1. Login as owner
2. Navigate to `/content` (via sidebar "Content Drafts" link)
3. Verify the Content Workflow page renders with:
   - "Content Workflow" heading
   - "Generate Content" button
   - Approval Queue section
   - Content editor/preview area
4. Click "Generate Content" button to open the dialog
5. In the dialog:
   - Select an Agent from the dropdown
   - Select a Content Type (Blog Post, Social Media Post, etc.)
   - Enter a Title
   - Enter Instructions/Prompt
   - Optionally enter a Target Channel
6. Click "Generate" button
7. Verify the dialog closes and a success flash message appears

**Success criteria:** The generate dialog submits and the draft job is dispatched.

**Important:** Draft generation is asynchronous (queue job). The queue worker must be running for the job to process. If testing the full cycle, wait 10-15 seconds and reload to check if the draft appears in the list.

**Variations:**
- Test without filling required fields -> dialog should show validation errors
- Test with each content type

### Flow 6: Content Review (Approve/Reject)

**When to run:** Changes to `DraftController` approve/reject methods, content/index.tsx review UI, or Draft model status transitions.

**Steps:**
1. Login as owner
2. Navigate to `/content`
3. If drafts exist in "Pending Review" state:
   - Verify they appear in the Approval Queue with type badge, title, agent name, and score
   - Click "Approve & Schedule" button
   - Verify the draft status changes to "Approved"
4. If no drafts exist:
   - Generate a draft first (Flow 5), wait for it to complete
   - Then verify it appears in the queue

**Success criteria:** Draft status transitions work correctly.

### Flow 7: Agent Management

**When to run:** Changes to `AgentController`, `AgentCatalog` service, agents/index.tsx, agents/show.tsx, or Agent model.

**Steps:**
1. Login as owner
2. Navigate to `/agents` (via sidebar "AI Agents" link)
3. Verify the agents grid renders with cards showing:
   - Agent name and description
   - Status badge (Active, Idle, Alerting)
   - Active task count
   - "View Details" and Settings buttons
4. Click "View Details" on the SEO Agent
5. Verify the agent detail page renders with:
   - Agent name and status
   - Stats section (Pages Crawled, Issues Fixed, etc.)
   - Current Tasks section
6. Verify sidebar "Active Agents" quick links are visible and clickable

**Success criteria:** Agent list and detail pages render correctly with expected data.

### Flow 8: Settings (Profile & Security)

**When to run:** Changes to settings controllers, settings pages, or Fortify user management.

**Steps:**
1. Login as owner
2. Navigate to profile settings via sidebar "Profile & Settings" link
3. Verify the settings page renders with profile form
4. Verify navigation between settings tabs: Profile, Appearance, Security
5. On Security tab, verify 2FA setup option is available

**Success criteria:** Settings pages render and navigation between tabs works.

## Per-Persona Notes

### Owner (default)
- Full access to all features
- Can generate content, approve/reject drafts, manage agents, access settings
- Workspace is automatically created on registration (via `currentWorkspace()` returns first workspace)

### New User (fresh signup)
- After registration, may see empty states if no workspace/agents exist
- The `SetWorkspace` middleware resolves `currentWorkspace()` which returns the first workspace from the pivot table
- If no workspace exists, `$request->attributes->get('workspace')` will be null, which may cause errors on pages that expect a workspace (ContentController, AgentController)

## Known Failure Modes

1. **No workspace after registration.** If the registration process does not automatically create a workspace, pages that depend on `SetWorkspace` middleware will fail. The `currentWorkspace()` method returns `null` and controllers like `ContentController` will crash. Check `CreateNewUser` action or a Fortify event listener for workspace creation.

2. **Queue worker not running.** Content generation uses `GenerateDraftJob` dispatched to the `database` queue. If no queue worker is running, drafts will never be generated. Always start the queue worker before testing content generation.

3. **ZAI API key missing or invalid.** The `GenerateDraftJob` calls the ZAI API via `laravel/ai`. If `ZAI_API_KEY` is missing or the API URL is incorrect, the job will fail after 3 retries. Check `.env` for `ZAI_API_KEY` and `ZAI_URL`.

4. **Dark theme selectors.** The app uses a custom dark theme with specific color values. Standard light-theme assumptions about text visibility will not apply. Use accessibility tree snapshots rather than visual inspection.

5. **Sidebar is a drawer on mobile.** On viewports < 1024px, the sidebar is a fixed drawer that slides in/out. Test navigation on both mobile and desktop viewports.

6. **Inertia form submissions.** Login and registration use Inertia `<Form>` component with Wayfinder-generated route actions (`store.form()` from `@/routes/login`). These are not standard HTML forms -- agent-browser must interact with the rendered DOM, not construct HTTP requests manually.

7. **`laravel/ai` package instability.** The package is constrained as `*` in composer.json, which may resolve to an incompatible version. If `AiManager`, `AgentPrompt`, or `agent()` helper are not found, the GenerateDraftJob will fail with a class-not-found error.
