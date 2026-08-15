# Miniface design system

Miniface is a **local model workshop**: compact, dependable, private, and quietly playful. It should feel like a well-made developer tool rather than a hosted social platform or a generic AI dashboard.

The product promise is **“Your models, close at hand.”**

## Brand identity

### Personality

- **Local, not lonely.** Miniface is a friendly home for work that stays on the user's machine.
- **Technical, not clinical.** Exact revisions and storage details are visible, but the interface explains why they matter.
- **Compact, not cramped.** Dense data uses rows and tables; decisions and destructive actions keep enough breathing room.
- **Playful, not childish.** One bright signal color and the face mark add warmth without turning every surface into decoration.

### Mark

The **Pocket Face** mark places a round, smiling face inside a compact repository pocket. Closed crescent eyes and a centered, tongue-free smile give it warmth; the resting hands and pocket keep it specific to Miniface. The persimmon dot is the local/connected signal.

- Source component: `src/lib/BrandMark.svelte`
- Standalone browser mark: `static/favicon.svg`
- Minimum UI size: 28 px
- Keep at least one eye-width of clear space around the mark.
- Use the primary pine-on-parchment mark on light surfaces and the reversed parchment-on-pine mark on dark surfaces.
- Keep the circular head ring visible. Do not remove it, change the expression, add a tongue, recolor individual features, add gradients, or rotate the mark.

### Wordmark and voice

The wordmark is lowercase **miniface** in Bricolage Grotesque, 700 weight, with tight tracking. Product copy uses short, direct sentences and names the user's outcome first.

Prefer:

- “Import a model”
- “Copy a pinned CLI or Python snippet”
- “Your models”
- “Couldn’t start import”

Avoid vague labels such as “Submit,” “Process,” “AI-powered,” and “Magic.”

## Foundations

### Color

| Token | Value | Role |
| --- | --- | --- |
| Pine | `#173B36` | Navigation, primary actions, brand structure |
| Parchment | `#F5F1E8` | App canvas and reversed brand details |
| Persimmon | `#F06A47` | Local/active signal and sparing emphasis |
| Sage | `#99B38C` | Supporting fills, efficiency, and quiet accents |
| Dark ink | `#202825` | Strongest text and code surfaces |
| Warm white | `#FEFCF6` | Primary surfaces |
| Success | `#147357` | Completed, valid, public access |
| Warning | `#946018` | Gated access, validation warnings |
| Danger | `#B33D48` | Failed work, cancel actions, errors |
| Muted text | `#68716D` | Secondary information |
| Border | `#D8D3C8` | Surface and data-row boundaries |

Pine communicates intent; persimmon communicates a live/local signal. Persimmon is not a general call-to-action fill. Sage supports information and efficiency without competing with status colors. Status colors always appear with text or an icon, never as color alone.

### Typography

- **Wordmark and display:** Bricolage Grotesque Variable, 200–800. Use 700 for the wordmark and primary headings.
- **Interface and body:** Instrument Sans Variable, 400–700. Its quiet, open forms keep dense model data readable.
- **Code and identifiers:** Fragment Mono, 400.
- Page title: 32–46 px, tight tracking, 1.02 line height.
- Section title: 15–20 px.
- Body: 12–14 px.
- Dense metadata: 9–11 px; never below 9 px.

All three font families are bundled at build time. Miniface makes no public font request.

### Space, shape, and elevation

- Base spacing unit: 4 px. Common gaps: 8, 12, 16, 24, 32 px.
- Controls: 8 px radius.
- Cards: 12 px radius.
- Brand/empty-state illustrations: up to 18 px radius.
- Pills are reserved for statuses, counts, and compact metadata.
- Most surfaces use a 1 px border and no visible shadow. Hovered/temporary surfaces may use one restrained shadow.

### Icons and motion

Lucide provides one consistent 1.9 px stroke family. Icons clarify a label; they do not replace a label for unfamiliar or consequential actions.

Motion lasts 120–180 ms and communicates hover, selection, progress, or copied state. `prefers-reduced-motion` removes nonessential movement.

## Product structure

```diagram
┌─────────────────────────────────────────────────────────────┐
│ Miniface                                                    │
├────────────┬────────────────────────────────────────────────┤
│ Models     │ Search · sort · grid/list · repository detail  │
│ Import     │ Local folder or Hugging Face source            │
│ Activity   │ Active work and compact retained history       │
│ Storage    │ Logical/physical use and Xet efficiency        │
│ Settings   │ Endpoint and copy-ready client setup           │
└────────────┴────────────────────────────────────────────────┘
```

The primary loop is **find → inspect → use**. Import is the only global primary action. Activity is the place to track work; it is not mixed into the model library.

## Component rules

### Buttons

- One primary button per decision area.
- Secondary buttons use a paper surface and visible border.
- Destructive/cancel actions use danger styling and explicit text.
- Icon-only controls require an accessible name and are limited to familiar actions such as copy, close, and view mode.
- Async buttons replace their leading icon with a spinner and use a present-tense label.

### Forms

- Labels remain visible above fields; placeholders are examples, not labels.
- Help text explains constraints before submission.
- Source selection uses two radio cards rather than a toggle because “Local folder” and “Hugging Face” are mutually exclusive workflows, not an on/off setting.
- Success stays in context and links directly to Activity.

### Data density

- Cards support recognition and browsing.
- Rows support comparison, activity history, files, and revisions.
- Model view and sort preferences persist in local storage.
- Job history is intentionally retained as an audit log. Finished jobs collapse to one row and can be filtered out; Miniface does not imply that deleting a job deletes immutable model data.

### Feedback and system states

Every server-backed view has loading, empty, error, and populated states. Copy actions confirm with both an inline icon change and a short toast. Active jobs refresh every four seconds while Activity is visible.

## Interaction map

### Global shell

| Trigger | Response | Persistence |
| --- | --- | --- |
| Select a navigation item | Update URL and content; scroll new sections to top | Browser history supports back/forward |
| Select the logo | Return to Models | None |
| Sign out | Delete server session and return to sign-in | Models, detail, and activity caches clear |
| Narrow viewport | Replace side navigation with a top brand bar and bottom navigation | Same routes and labels |

### Authentication

| Trigger | Response |
| --- | --- |
| Show/hide token | Toggle only the current field's visibility |
| Continue | Disable button, show progress, exchange token for secure session |
| Invalid token | Keep the form, show an inline error, preserve retry path |
| Session lookup fails | Show a branded connection state with Retry |

### Model library

| Trigger | Response | Persistence |
| --- | --- | --- |
| Type in search | Filter by owner/name, kind, architecture, and quantization immediately | Route-local |
| Clear search | Restore full library | None |
| Change sort | Reorder by updated date, name, or size | Local storage |
| Select grid/list | Change between recognition and comparison layouts | Local storage |
| Select a model | Open its Overview route | Browser history |
| Import model | Open the Import workflow | Browser history |

### Repository detail

| Trigger | Response |
| --- | --- |
| Switch tab | Change the URL without re-fetching the same repository |
| Copy revision | Copy full immutable SHA; show “Copied” and toast |
| Use model | Open pinned environment, CLI, Transformers, and Unsloth examples |
| Copy example | Copy the exact displayed snippet |
| Edit model card | Open Markdown editor with current content |
| Save model card | Create a revision, update detail, and confirm inline |
| Expand revision history | All revisions remain visible as a compact timeline; each SHA is copyable |

### Import

| Trigger | Response |
| --- | --- |
| Select Local folder | Show path validation guidance and local import copy |
| Select Hugging Face | Show repository search, revision, and ephemeral token fields |
| Type repository search | Debounce 250 ms; show size, popularity, and access state |
| Select a result | Fill source ID and, unless edited, destination ID |
| Select gated model | Make the access token required and explain the prerequisite |
| Submit | Disable action, queue work, clear sensitive token/path, link to Activity |
| Submission fails | Keep entered non-sensitive context and show inline error |

### Activity

| Trigger | Response |
| --- | --- |
| Open Activity | Load up to the backend's retained job limit |
| Active work exists | Refresh every four seconds while this view is open |
| Filter All/Active/History | Update rows locally without a request |
| Cancel active job | Disable that action, request cancellation, update row in place |
| Select Details on failure | Expand the retained server error and job ID under the row |
| Manual refresh | Keep current rows visible and rotate the refresh icon |

### Storage and settings

| Trigger | Response |
| --- | --- |
| Open Storage | Compare logical and physical use; calculate savings safely for empty profiles |
| Copy endpoint/setup | Copy exact local endpoint or shell commands and confirm |

## Accessibility and responsive behavior

- Semantic landmarks, one main heading per page, labels for every field, and tab/radio roles mirror the visible interaction.
- Keyboard focus uses a persimmon ring that is visible on parchment and pine surfaces.
- Status always combines color with an icon or text.
- A skip link bypasses navigation.
- Touch layouts preserve at least 36 px controls and use 52 px bottom-navigation targets.
- Data grids collapse into one-column cards or simplified rows before 800 px.
- Text and controls reflow without horizontal page scrolling at 390 px.

## Source of truth

- Design tokens and component styling: `src/lib/app.css`
- Product interactions and states: `src/lib/App.svelte`
- Brand mark: `src/lib/BrandMark.svelte`
- Browser mark: `static/favicon.svg`

When extending Miniface, reuse these tokens and patterns before adding a new visual primitive.
