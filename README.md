# vibe-coding-sprint

Vibe Coding Sprint for ARTSCI 150 class.

## Volunteer Tool: Volunteer Shift Companion

This repository contains a small, static website that prototypes a **“Volunteer Shift Companion”** tool for community food bank volunteers. The goal is to explore how a simple tool could meaningfully support about 10 hours of volunteer work, not to build a full production app.

### What the tool does

- **Plan volunteer shifts**:  
  Volunteers can enter their name, organization/site, a shift date, the number of hours, and a short list of planned tasks. The page keeps a running total of planned hours out of 10 and shows a progress bar.

- **Track and mark shifts complete**:  
  Each planned shift appears in a list with basic details and a “Mark done” checkbox, so a volunteer can quickly see which shifts are still planned versus completed.

- **Reflect on completed shifts**:  
  Once at least one shift is marked complete, a simple reflection form appears. Volunteers can choose a completed shift and write short notes about what went well and what could be improved. In this prototype, reflections are only stored in the browser (no backend).

### Technical notes

- The site is built using **static HTML, CSS, and JavaScript** so it can be hosted easily with GitHub Pages.
- All logic runs client‑side in `script.js`; there is **no database or server**.
- The design aims to be clean and readable for someone quickly checking their plan before or after a volunteer shift.

To view the prototype locally, open `index.html` in a browser. Once pushed to GitHub and enabled with GitHub Pages, it can be accessed as a simple published website.
