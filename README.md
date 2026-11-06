# SDET Interview — Pre-Interview Scaffold

Thanks for scheduling a Software Engineer, Test interview with LogicGate! This repository is
**not the interview exercise** — it's the empty scaffolding of the real project: the same
Angular + Express/TypeScript toolchain, with none of the actual application logic. We're sharing
it ahead of time purely so that setup — installing dependencies, starting both pieces, installing
a browser for test automation — happens before your interview, not during it.

The real application (and the task itself) is introduced live, at the start of your session.
Nothing in this repository tells you anything about how it's built.

### What to do before your interview

From this directory:

```
npm run setup
npm run dev
```

`setup` installs everything (the mock server, the Angular app, and a Playwright browser) in one
step. `dev` then starts both pieces together.

Open **http://localhost:4200**. You should see a page with a single button: **Run Environment
Check**. Click it — you should see a green "All wired up" message. That confirms Angular, the
dev-server proxy, and the mock server are all correctly talking to each other on your machine.

Optionally, you can also confirm Playwright itself works:

```
cd playwright
npm run test:js      # or npm run test:ts
```

That runs one trivial test that clicks the same button and checks for the same success message.

**Please do this at least a day before your interview**, and reply to your scheduling email once
you see the green success message (or let us know if you hit any errors, so we can help before
interview day). Leave the project installed — you won't need to redo this setup live.

### Business Rules

This is the application you'll be testing live. The section below describes what it's supposed
to do, in plain English, so you can start thinking about test scenarios ahead of time. It is not
code, and it doesn't tell you whether everything described here actually works correctly in the
real app — that's exactly what the live session is for.

**What the app lets you do:**

- Add an animal, giving it a name and a favorite color (chosen from a fixed list of colors).
- See every animal currently on the farm, organized into "barns." Each barn holds animals of
  exactly one color.
- Remove an animal from the farm.

**The rule for how many barns exist, and who's in them:**

- Each barn can hold up to 20 animals.
- All animals of the same favorite color share that color's barn(s). An animal is never placed in
  a barn of a different color.
- When every existing barn of a color is full, a new barn of that color is created.
- Animals of the same color are kept spread out as evenly as possible across however many barns
  of that color exist — not filling one barn before starting the next. Two barns of the same
  color should generally hold close to the same number of animals, not one nearly full and one
  nearly empty.
- When an animal is removed, the farm checks whether the remaining animals of that color could
  now fit into fewer barns without exceeding capacity. If so, the extra barn is removed entirely,
  and everyone left is redistributed evenly across the smaller number of barns.

**Two worked examples:**

*Growth.* Start with one YELLOW barn holding 20 animals (completely full).
- Add one more YELLOW animal: a second YELLOW barn is created, and the 21 animals are split
  evenly across the two barns (10 and 11).
- Add another YELLOW animal: now 22 total, still split evenly across 2 barns (11 and 11).

*Shrinking.* Start with 4 RED barns holding 15, 15, 16, and 16 animals (62 total).
- Remove one RED animal: 61 remain. That's still too many for 3 barns (3 × 20 = 60), so it
  stays at 4 barns, now holding 15, 15, 15, 16.
- Remove one more RED animal: 60 remain. That now fits exactly into 3 barns, so one barn is
  destroyed and the remaining 60 animals are split evenly into 3 barns of 20 each.

**Worth thinking about before the live session:** simple cases (add one animal, see it appear)
are easy to verify and probably not where the interesting risk lives. The growth and shrinking
rules above have real "boundary" moments — exactly where a barn gets created or destroyed. The
app also has two things that both need to agree: what these rules say should happen, and what
you can actually see on the screen once it happens. Those aren't automatically the same thing.

This document describes how the app is *intended* to behave. It isn't a guarantee that the real,
running app you'll see live matches this exactly in every case — figuring that out, and how
you'd demonstrate it, is the point of the exercise.
