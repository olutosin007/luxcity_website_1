# Proptii Interactive Web Tools
## Engineering & UX Handoff Guide

This document packages the Interactive Web Tools strategy into a **build-ready guide for a peer programmer**, including:
- Product intent & constraints
- Tool-level UX copy (ready to implement)
- Engineering handoff specs (logic, states, data, extensibility)

The goal is to enable fast, aligned execution **without additional strategy interpretation**.

---

## 1. Product Philosophy (Read This First)

These tools are **pre-signup products**, not marketing widgets.

They must:
- Work without authentication
- Provide real utility in isolation
- Reveal fragmentation through use, not persuasion
- Make Proptii’s value obvious *after* effort is felt

Hard constraints:
- No forced signup
- No data uploads required
- No dark patterns or premature CTAs

Success is measured by:
- Completion
- Return usage
- Saves / exports
- Time spent inside tools

---

## 2. Tool Stack Overview

| Tool | Primary Job | Core Outcome |
|---|---|---|
| Referencing Readiness Checker | Reduce uncertainty | Clarity on preparedness |
| Document Completeness Tracker | Expose repetition | Awareness of reuse pain |
| Viewing & Application Tracker | Organise chaos | Visible fragmentation |
| Process Simulator | Reduce anxiety | Trust via transparency |
| Application Timeline Generator | Set expectations | Reduced stress |

Each tool must be independently deployable.

---

## 3. Tool 1: Tenant Referencing Readiness Checker

### Product Intent
Help tenants understand if they are *likely* to pass referencing — before agents decide for them.

### UX Copy (Exact Wording)
**Page Title**
> Are You Ready to Apply?

**Intro Text**
> Letting agents check the same things every time. This takes 2 minutes and shows what you’re missing — before they do.

**Question Examples**
- Do you have valid photo ID?
- Can you show recent proof of income?
- Have you rented before in the UK?
- Would you be able to provide a guarantor if asked?

**Results Header**
> Your Application Readiness

**Status Labels**
- Mostly Ready
- A Few Gaps
- Needs Preparation

**Results Microcopy**
> This doesn’t decide your application — it helps you prepare for what agents usually check.

**Bridge Copy (Non-CTA)**
> When you apply to multiple properties, these checks repeat. Proptii keeps this information ready.

### Engineering Spec
**Input**
- Stateless form
- Boolean + conditional answers

**Logic**
- Weighted scoring (no visible percentage)
- Conditional branching (guarantor only triggered when relevant)

**Output**
- Readiness state
- Gap list
- Downloadable checklist (static generation)

**Persistence**
- Optional localStorage save

---

## 4. Tool 2: Document Completeness Tracker

### Product Intent
Make repetition visible *before* automation is introduced.

### UX Copy
**Title**
> Your Rental Documents

**Intro**
> Letting agents often ask for the same documents again and again. Tick what you already have.

**Section Labels**
- Identity
- Income
- Rental History
- Guarantor (if applicable)

**Hint Text**
> Most agents will ask for these separately — even if you’ve already sent them.

**Bridge Copy**
> Repeating this for every application gets tiring. Proptii saves it once.

### Engineering Spec
**Input**
- Checkbox groups

**State**
- Client-only state

**Output**
- Completion indicator
- Printable / exportable view

**Key Rule**
No uploads. No validation. Manual only.

---

## 5. Tool 3: Viewing & Application Tracker

### Product Intent
Expose fragmentation through organisation.

### UX Copy
**Title**
> Track Your Property Viewings

**Intro**
> When you’re speaking to multiple agents, details get lost quickly. Keep everything in one place.

**Table Headers**
- Property
- Agent
- Viewing Date
- Status
- Notes

**Empty State**
> Add your first viewing to get started.

**Bridge Copy**
> Managing more than a few applications like this gets messy fast.

### Engineering Spec
**Input**
- Dynamic row creation

**State**
- localStorage persistence

**Output**
- Editable table
- Export (PDF / CSV)

**Scalability Cue**
Surface friction after ~3 entries (copy only, no block).

---

## 6. Tool 4: What Happens After You Apply? (Process Simulator)

### Product Intent
Turn the black box into a clear system.

### UX Copy
**Title**
> What Happens After You Apply

**Intro**
> Most decisions happen behind the scenes. Here’s what usually takes place.

**Step Labels**
1. Agent Review
2. Referencing Checks
3. Landlord Comparison
4. Decision

**Expandable Text**
> This step exists so agents can reduce risk — not to make renting harder.

**Trust Copy**
> Understanding the process won’t guarantee an offer, but it removes uncertainty.

### Engineering Spec
**Implementation**
- Static timeline
- Expand/collapse sections

**No Input Required**
Purely educational.

---

## 7. Tool 5: Rental Application Timeline Generator

### Product Intent
Set realistic expectations and reduce stress.

### UX Copy
**Title**
> How Long Will This Take?

**Intro**
> Timelines vary. This gives you a realistic estimate based on your situation.

**Inputs**
- Employment type
- Guarantor: Yes / No

**Output Header**
> Your Expected Timeline

**Copy**
> Delays usually come from missing documents or third-party checks.

**Bridge Copy**
> When applications overlap, timelines become hard to manage.

### Engineering Spec
**Logic**
- Rule-based duration ranges

**Output**
- Visual timeline
- Bottleneck highlights

---

## 8. Cross-Tool Engineering Principles

- Stateless first, persistent second
- Local-first storage
- SEO-rendered pages
- Accessible by default

---

## 9. Definition of Done

A tool is complete when:
- It works without signup
- A user can finish it in under 3 minutes
- The value of organisation is felt, not explained
- Proptii is introduced as relief, not requirement

---

End of Guide

