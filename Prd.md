# Product Requirements Document (PRD)  
## Project: Ariel – Mermaid.js Markdown Previewer (Blazor WASM)

### 1. Overview
Ariel is a **single-page Blazor WebAssembly application** that allows users to write **Markdown containing Mermaid diagrams** and instantly render them as interactive diagrams in the browser. The app is fully client-side and intended to be hosted on **GitHub Pages**.

---

### 2. Goals
- Provide a live preview of Mermaid diagrams embedded in Markdown.
- Render diagrams entirely client-side for security and offline use.
- Simple, responsive interface suitable for small screens.
- Allow users to copy or export the rendered diagram as SVG/PNG.

---

### 3. Non-Goals
- No server-side rendering or storage.
- No user accounts or authentication.
- No support for Markdown features unrelated to diagrams beyond basic formatting.

---

### 4. Target Users
- Developers and engineers documenting workflows, flowcharts, or graphs.
- Technical writers creating diagrams from Markdown.
- Students learning Mermaid.js syntax.

---

### 5. Core Features
#### 5.1 Input
- Textarea for Markdown input with live editing.
- Support for Mermaid fenced code blocks (````mermaid ...````).

#### 5.2 Output
- Rendered Mermaid diagrams in a preview pane.
- Automatic re-render on input changes.
- Option to copy diagram as SVG or PNG.

#### 5.3 UI/UX
- Two-column layout: Markdown editor on the left, preview on the right.
- Toggle between dark/light theme for both editor and preview.
- Minimalistic, distraction-free interface.

---

### 6. Technical Requirements
- **Framework:** Blazor WebAssembly (standalone)  
- **Libraries:**  
  - `Mermaid.js` for diagram rendering (via JS interop)  
  - Optional: `Markdig` for Markdown parsing  
- **JS Interop:** Needed to call Mermaid.js from Blazor.  
- **Hosting:** GitHub Pages (static site).  
- **Storage:** Optional localStorage for last edited Markdown.  

---

### 7. Security
- All rendering is client-side; no user data leaves the browser.
- No embedded third-party scripts besides Mermaid.js.

---

### 8. User Interface
| Section | Description |
|---------|-------------|
| Header | App title "Ariel" + theme toggle |
| Editor | Markdown textarea with syntax highlighting |
| Preview | Live-rendered Mermaid diagrams (HTML/SVG) |
| Footer | Export buttons and credits |

---

### 9. Success Metrics
- Input Markdown with Mermaid blocks → diagrams render instantly (<200ms typical).  
- Works offline after first load.  
- Fully functional on GitHub Pages.  
- Users can export diagrams as SVG/PNG.  

---

### 10. Example
**Input Markdown:**
```markdown
# Example Diagram

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Option 1]
    B -->|No| D[Option 2]
