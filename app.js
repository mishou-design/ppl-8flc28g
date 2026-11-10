(() => {
  "use strict";

  const DAYS = [
    {
      id: "push-a",
      name: "Push A",
      short: "PA",
      type: "push",
      focus: "HEAVY",
      defaultRest: 120,
      lifts: [
        { name: "Barbell bench press", target: "4×5–7", sets: 4 },
        { name: "Low-to-high cable press", target: "3×8–10", sets: 3 },
        { name: "Weighted dip or dip machine", target: "3×6–10", sets: 3 },
        { name: "Seated DB lateral raise", target: "4×10–15", sets: 4 },
        { name: "Cable overhead triceps ext.", target: "3×10–15", sets: 3 },
        { name: "Machine or cable fly (swap)", target: "2×12–15", sets: 2 },
      ],
    },
    {
      id: "pull-a",
      name: "Pull A",
      short: "PLA",
      type: "pull",
      focus: "HEAVY",
      defaultRest: 120,
      lifts: [
        { name: "Weighted pull-up (or heavy lat pulldown)", target: "4×5–8", sets: 4 },
        { name: "Chest-supported row (machine / DB)", target: "4×6–10", sets: 4 },
        { name: "One-arm dumbbell row", target: "3×8–12", sets: 3 },
        { name: "Face pull or rear-delt fly", target: "3×12–20", sets: 3 },
        { name: "EZ-bar or DB curl", target: "3×8–12", sets: 3 },
        { name: "Straight-arm pulldown (swap)", target: "2×12–15", sets: 2 },
      ],
    },
    {
      id: "legs-a",
      name: "Legs A",
      short: "LA",
      type: "legs",
      focus: "HEAVY",
      defaultRest: 120,
      lifts: [
        { name: "Back squat (or SSB / high-bar)", target: "4×5–7", sets: 4 },
        { name: "Romanian deadlift", target: "3×6–8", sets: 3 },
        { name: "Walking lunge or Bulgarian split squat", target: "3×8–12", sets: 3 },
        { name: "Leg extension/elevated squat", target: "3×10–15", sets: 3 },
        { name: "Standing or seated calf raise", target: "4×8–12", sets: 4 },
        { name: "Hanging knee raise or plank (swap)", target: "3×8–15", sets: 3 },
      ],
    },
    {
      id: "push-b",
      name: "Push B",
      short: "PB",
      type: "push",
      focus: "HYPERTROPHY",
      defaultRest: 90,
      lifts: [
        { name: "Seated DB overhead press", target: "4×8–12", sets: 4 },
        { name: "Machine chest press (neutral grip)", target: "3×10–12", sets: 3 },
        { name: "Low-to-high cable fly or pec deck", target: "3×12–15", sets: 3 },
        { name: "Lean-away cable lateral raise", target: "4×12–20", sets: 4 },
        { name: "Cross-body cable or overhead rope extension", target: "3×12–15", sets: 3 },
        { name: "Front raise or high-incline DB press (swap)", target: "2×12–15", sets: 2 },
      ],
    },
    {
      id: "pull-b",
      name: "Pull B",
      short: "PLB",
      type: "pull",
      focus: "HYPERTROPHY",
      defaultRest: 90,
      lifts: [
        { name: "Meadows row or T-bar row", target: "4×8–12", sets: 4 },
        { name: "Neutral-grip or close-grip pulldown", target: "3×10–12", sets: 3 },
        { name: "Cable seated row (wide or mid)", target: "3×10–15", sets: 3 },
        { name: "Rear-delt cable or chest-supported rear fly", target: "3×12–20", sets: 3 },
        { name: "Incline DB curl or Bayesian cable curl", target: "3×10–15", sets: 3 },
        { name: "Straight-arm pulldown or pullover (swap)", target: "3×12–15", sets: 3 },
      ],
    },
    {
      id: "legs-b",
      name: "Legs B",
      short: "LB",
      type: "legs",
      focus: "HYPERTROPHY",
      defaultRest: 90,
      lifts: [
        { name: "Trap-bar deadlift or conventional", target: "4×4–6", sets: 4 },
        { name: "Hack squat or leg press", target: "3×8–12", sets: 3 },
        { name: "Lying or seated leg curl", target: "3×8–12", sets: 3 },
        { name: "Box jumps", target: "3×8–10", sets: 3 },
        { name: "Seated calf raise", target: "4×10–15", sets: 4 },
        { name: "Back extension or GHR (swap)", target: "3×8–12", sets: 3 },
      ],
    },
  ];

  // ---- Exercise rotation: a new set of lifts every 3 weeks (4 blocks, then repeat) ----
  const BLOCK_LENGTH = 3;
  const L = (name, target) => ({ name, target, sets: parseInt(target, 10) });
  const ROTATION = {
    "push-a": [
      null, // Block 1 = original lifts above
      [
        L("Incline barbell bench press", "4×5–7"),
        L("Flat DB press", "3×8–10"),
        L("Close-grip bench press", "3×6–10"),
        L("Single-arm cable lateral raise", "4×10–15"),
        L("EZ-bar skull crusher", "3×10–15"),
        L("Pec deck", "2×12–15"),
      ],
      [
        L("Incline DB press", "4×6–8"),
        L("Plate-loaded chest press (Hammer Strength)", "3×8–10"),
        L("JM press (Smith or barbell)", "3×6–10"),
        L("Machine lateral raise", "4×10–15"),
        L("Overhead DB triceps extension", "3×10–15"),
        L("High-to-low cable fly", "2×12–15"),
      ],
      [
        L("Smith machine bench press", "4×5–7"),
        L("Low-incline DB press", "3×8–10"),
        L("Weighted deficit push-up", "3×6–10"),
        L("Cable Y-raise", "4×10–15"),
        L("Rope triceps pushdown", "3×10–15"),
        L("Seated cable fly", "2×12–15"),
      ],
    ],
    "pull-a": [
      null,
      [
        L("Weighted chin-up", "4×5–8"),
        L("Chest-supported DB row (incline bench)", "4×6–10"), // replaced Pendlay row
        L("Single-arm cable row", "3×8–12"),
        L("Reverse pec deck", "3×12–20"),
        L("Barbell curl", "3×8–12"),
        L("DB pullover", "2×12–15"),
      ],
      [
        L("Heavy wide-grip lat pulldown", "4×5–8"),
        L("Seal row (or chest-supported T-bar)", "4×6–10"),
        L("Single-arm machine row", "3×8–12"),
        L("Prone incline DB rear-delt raise", "3×12–20"),
        L("Hammer curl", "3×8–12"),
        L("Machine pullover", "2×12–15"),
      ],
      [
        L("Neutral-grip weighted pull-up", "4×5–8"),
        L("Yates row (underhand barbell)", "4×6–10"),
        L("Kroc row (heavy DB)", "3×8–12"),
        L("Rope face pull", "3×12–20"),
        L("Preacher curl", "3×8–12"),
        L("Rope straight-arm pulldown", "2×12–15"),
      ],
    ],
    "legs-a": [
      null,
      [
        L("Front squat", "4×5–7"),
        L("Good morning", "3×6–8"),
        L("Bulgarian split squat", "3×8–12"),
        L("Single-leg leg extension", "3×10–15"),
        L("Leg-press calf raise", "4×8–12"),
        L("Cable crunch", "3×8–15"),
      ],
      [
        L("Hack squat (heavy)", "4×5–7"),
        L("Barbell hip thrust", "3×6–8"),
        L("DB reverse lunge", "3×8–12"),
        L("Leg extension (1-sec pause at top)", "3×10–15"),
        L("Smith machine calf raise", "4×8–12"),
        L("Ab wheel rollout", "3×8–15"),
      ],
      [
        L("Belt squat or Smith squat", "4×5–7"),
        L("Stiff-leg deadlift", "3×6–8"),
        L("DB step-up", "3×8–12"),
        L("Sissy squat or reverse Nordic", "3×10–15"),
        L("Seated calf raise (pause at stretch)", "4×8–12"),
        L("Hanging straight-leg raise", "3×8–15"),
      ],
    ],
    "push-b": [
      null,
      [
        L("Machine shoulder press", "4×8–12"),
        L("Incline machine press", "3×10–12"),
        L("DB fly", "3×12–15"),
        L("Super-ROM DB lateral raise", "4×12–20"),
        L("Single-arm cable pushdown", "3×12–15"),
        L("Landmine press", "2×12–15"),
      ],
      [
        L("Arnold press", "4×8–12"),
        L("Standing cable chest press", "3×10–12"),
        L("Incline DB fly", "3×12–15"),
        L("Behind-the-back cable lateral raise", "4×12–20"),
        L("Katana cable triceps extension", "3×12–15"),
        L("Cable front raise", "2×12–15"),
      ],
      [
        L("Smith machine seated overhead press", "4×8–12"),
        L("Plate-loaded incline press", "3×10–12"),
        L("Pec deck (paused squeeze)", "3×12–15"),
        L("Lean-in DB lateral raise", "4×12–20"),
        L("Overhead EZ-bar extension", "3×12–15"),
        L("Plate front raise", "2×12–15"),
      ],
    ],
    "pull-b": [
      null,
      [
        L("Chest-supported T-bar row", "4×8–12"),
        L("Single-arm lat pulldown", "3×10–12"),
        L("Wide-grip machine row", "3×10–15"),
        L("Bent-over DB rear-delt raise", "3×12–20"),
        L("Straight-bar cable curl", "3×10–15"),
        L("Kneeling cable lat prayer", "3×12–15"),
      ],
      [
        L("Chest-supported machine row (neutral)", "4×8–12"),
        L("Underhand pulldown", "3×10–12"),
        L("High-to-low single-arm cable row", "3×10–15"),
        L("Cross-cable rear-delt fly", "3×12–20"),
        L("Spider curl", "3×10–15"),
        L("Lying cable pullover", "3×12–15"),
      ],
      [
        L("Smith machine row", "4×8–12"),
        L("Wide-grip pull-up (bodyweight)", "3×8–12"),
        L("Single-arm machine low row", "3×10–15"),
        L("Single-arm rear-delt machine fly", "3×12–20"),
        L("Rope cable hammer curl", "3×10–15"),
        L("Single-arm cable lat pull-in", "3×12–15"),
      ],
    ],
    "legs-b": [
      null,
      [
        L("Sumo deadlift", "4×4–6"),
        L("Pendulum squat (or leg press)", "3×8–12"),
        L("Band-assisted Nordic ham curl", "3×6–10"),
        L("Broad jumps", "3×5–8"),
        L("Donkey calf raise (or machine)", "4×10–15"),
        L("Reverse hyper or 45° hip extension", "3×8–12"),
      ],
      [
        L("Rack pull (below knee)", "4×4–6"),
        L("Single-leg leg press", "3×8–12"),
        L("Single-leg seated leg curl", "3×8–12"),
        L("Kettlebell swing", "3×10–15"),
        L("Single-leg DB calf raise", "4×10–15"),
        L("Cable pull-through", "3×10–12"),
      ],
      [
        L("Deficit conventional deadlift", "4×4–6"),
        L("Leg press (feet low & narrow)", "3×8–12"),
        L("Slider or stability-ball leg curl", "3×8–12"),
        L("Jump squats (light)", "3×6–8"),
        L("Standing calf raise (machine)", "4×10–15"),
        L("Single-leg hip thrust", "3×8–12"),
      ],
    ],
  };
  DAYS.forEach((d) => {
    ROTATION[d.id][0] = d.lifts;
  });
  const NUM_BLOCKS = 4;
  const MAX_WEEK = 520;

  const STORAGE_PREFIX = "arete:";
  // One-time migration from the app's earlier storage names. Old keys are copied, never
  // deleted, so they stay as a backup this release. The legacy prefix is assembled at runtime.
  (function migrateStorage() {
    const DONE = STORAGE_PREFIX + "migrated";
    try {
      if (localStorage.getItem(DONE)) return;
      const legacy = ["aus", "tin-ppl:"].join("");
      const pairs = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(legacy)) pairs.push([k, STORAGE_PREFIX + k.slice(legacy.length)]);
      }
      pairs.push(["ppl:timer", STORAGE_PREFIX + "timer"], ["ppl:settings", STORAGE_PREFIX + "settings"]);
      pairs.forEach(([from, to]) => {
        const v = localStorage.getItem(from);
        if (v !== null && localStorage.getItem(to) === null) localStorage.setItem(to, v);
      });
      localStorage.setItem(DONE, "1");
    } catch (_) {}
  })();
  const WEEK_KEY = STORAGE_PREFIX + "currentWeek";
  const LOG_KEY = STORAGE_PREFIX + "logs";
  const ROT_KEY = STORAGE_PREFIX + "rotationStart"; // program week where Block 2 begins
  const SCHEMA_KEY = STORAGE_PREFIX + "schema";
  let remoteRotationStart = null;
  // ---- Mobility (built on the Rebuilding Milo / Squat University approach) ----
  // Order: mobilize the stiff joints (ankle, hip, T-spine) -> activate the stabilizers
  // (glutes, core, shoulder blades/rotator cuff) -> prime with ramp-up sets of the first lift.
  // Short holds (<30s) before lifting; longer holds only in the cooldown.
  const D = (name, dose, cue) => ({ name, dose, cue });
  const MOBILITY = {
    "push-a": {
      minutes: 9,
      focus: "T-spine + shoulders for pressing",
      mobilize: [
        D("Foam roll T-spine extension", "60s", "Roller across mid-back, hands behind head, extend over it at 3–4 spots."),
        D("Open book (side-lying rotation)", "2×6/side", "Knees stacked and still, open chest to the ceiling, eyes follow the hand."),
        D("Banded shoulder distraction", "30s/side", "Band at wrist, sit hips back, let it pull the arm long overhead."),
        D("Doorway pec stretch", "20s/side", "Elbow at shoulder height, step through gently. Short hold."),
      ],
      activate: [
        D("Band pull-apart", "2×15", "Arms straight, pinch shoulder blades, no shrug."),
        D("Band external rotation", "2×12/side", "Elbow pinned to side, rotate out slow, 2s back."),
        D("Scap push-up", "1×10", "Arms locked, let chest sink, then push the floor away."),
      ],
      between: { lift: 0, drill: D("Band pull-apart", "×10", "First 30s of rest. Keeps the shoulder blades set for the next bench set.") },
    },
    "push-b": {
      minutes: 9,
      focus: "Overhead reach: T-spine, lats, shoulders",
      mobilize: [
        D("Foam roll T-spine extension", "60s", "Pause and breathe out at each stiff spot."),
        D("Quadruped T-spine rotation", "2×6/side", "Hips over knees, hand behind head, rotate from mid-back, not low back."),
        D("Bench lat / T-spine stretch", "2×20s", "Elbows on bench, hips back, drop chest. Ribs down."),
        D("Banded shoulder distraction", "30s/side", "Band overhead, lean away, let the shoulder open."),
      ],
      activate: [
        D("Wall slide with lift-off", "1×10", "Back and arms on wall, slide up, lift hands off at the top."),
        D("Band external rotation", "2×12/side", "Slow and controlled. Cuff, not momentum."),
        D("Band pull-apart", "2×15", "Thumbs back, squeeze, no shrug."),
      ],
      between: { lift: 0, drill: D("Wall slide", "×5", "First 30s of rest. Grooves a clean overhead position.") },
    },
    "pull-a": {
      minutes: 9,
      focus: "T-spine, lats + hips for pulling",
      mobilize: [
        D("Foam roll lats + T-spine", "60s", "Side-lying on the roller under the armpit, then mid-back."),
        D("Open book (side-lying rotation)", "2×6/side", "Breathe out as you rotate open."),
        D("Child's pose lat reach", "20s/side", "Walk both hands to one side, sink hips back, breathe into the ribs."),
        D("90/90 hip switch", "2×5/side", "Sit tall, rotate knees side to side, hands off floor if you can."),
      ],
      activate: [
        D("Scap pull-up (dead hang)", "2×8", "Arms straight, pull shoulder blades down and back. No elbow bend."),
        D("Band pull-apart", "2×15", "Slow on the way back."),
        D("Bird dog", "2×5/side", "Brace, reach long, hips don't rotate. 2s hold."),
      ],
      between: { lift: 0, drill: D("Quadruped T-spine rotation", "×4/side", "First 30s of rest. Opens the mid-back for the next pull.") },
    },
    "pull-b": {
      minutes: 9,
      focus: "T-spine, lats + hip hinge for rows",
      mobilize: [
        D("Foam roll lats + T-spine", "60s", "Slow rolls, pause on tight spots."),
        D("Thread the needle", "2×6/side", "From all fours, reach under then open up to the ceiling."),
        D("Child's pose lat reach", "20s/side", "Hips back, long arms, big belly breath."),
        D("90/90 hip switch", "2×5/side", "Hinge/row posture starts at the hips."),
      ],
      activate: [
        D("Prone Y raise", "2×10", "Face down on incline or floor, thumbs up, lift with lower traps."),
        D("Scap pull-up (dead hang)", "2×8", "Down and back, then relax to full hang."),
        D("Bird dog", "2×5/side", "Back flat as a table."),
      ],
      between: { lift: 0, drill: D("90/90 hip switch", "×4/side", "First 30s of rest. Keeps hips loose for the row hinge.") },
    },
    "legs-a": {
      minutes: 10,
      focus: "Ankles + hips for squatting",
      mobilize: [
        D("Half-kneeling ankle mobilization", "2×10/side", "Heel glued down, drive knee past the toes, 2s hold."),
        D("90/90 hip switch", "2×5/side", "Sit tall, rotate from the hips."),
        D("Couch stretch", "20s/side", "Squeeze the glute, ribs down. Feel the front of the hip."),
        D("Goblet squat prying hold", "2×20s", "Elbows push knees out, chest tall, shift side to side."),
      ],
      activate: [
        D("Glute bridge (3s squeeze)", "2×10", "Drive through heels, glutes do the work, not the low back."),
        D("Banded lateral walk", "2×10/side", "Knees out over toes, small steps, stay low."),
        D("Copenhagen plank (short lever)", "2×15s/side", "Top knee on bench, lift hips into a straight line."),
      ],
      between: { lift: 0, drill: D("Half-kneeling ankle rock", "×5/side", "First 30s of rest. Keeps depth easy on the next squat set.") },
    },
    "legs-b": {
      minutes: 10,
      focus: "Hips, hamstrings + ankles for hinging",
      mobilize: [
        D("Half-kneeling ankle mobilization", "1×10/side", "Knee tracks over the middle toes."),
        D("Adductor rock-back", "2×8/side", "One leg out to the side, flat back, rock hips back."),
        D("90/90 hip switch", "2×5/side", "Smooth and controlled."),
        D("Couch stretch", "20s/side", "Glute squeezed, tall torso."),
      ],
      activate: [
        D("Single-leg glute bridge", "2×8/side", "Feel the glute, not the hamstring or low back."),
        D("Bird dog", "2×5/side", "Brace like you're about to pull."),
        D("Copenhagen plank (short lever)", "2×15s/side", "Hips up, straight line, breathe."),
      ],
      between: { lift: 0, drill: D("Bird dog", "×3/side", "First 30s of rest. Re-groove the brace before the next pull.") },
    },
  };
  const COOLDOWN = {
    push: [
      D("Doorway pec stretch", "45s/side", "Relax into it, longer hold now."),
      D("Child's pose lat reach", "45s/side", "Hips back, long exhale."),
      D("Open book hold", "30s/side", "Let the top arm sink toward the floor."),
      D("Crocodile breathing", "1 min", "Face down, slow breaths into the low back and sides."),
    ],
    pull: [
      D("Dead hang", "2×20s", "Relax the shoulders and let the spine decompress."),
      D("Thread the needle hold", "30s/side", "Melt the shoulder toward the floor."),
      D("Child's pose lat reach", "45s/side", "Breathe into the ribs."),
      D("90/90 breathing", "1 min", "Feet on wall or bench, ribs down, slow exhales."),
    ],
    legs: [
      D("Couch stretch", "45s/side", "Glute squeezed, tall chest."),
      D("90/90 hip hold", "45s/side", "Lean forward over the front shin."),
      D("Deep squat hold", "60s", "Hold a post, heels down, breathe."),
      D("Crocodile breathing", "1 min", "Slow nose breaths, let the legs relax."),
    ],
  };
  const SCREENS = [
    D("Ankle: knee-to-wall", "each side", "Toes ~4 in (10 cm) from wall, heel down. Knee should touch the wall. Fail or left/right gap = more ankle work."),
    D("T-spine: seated rotation", "each side", "Sit, stick across shoulders, knees together. Aim for ~45° each way without the hips moving."),
    D("Shoulder: overhead reach", "both arms", "Back flat on a wall, ribs down, raise straight arms. Thumbs should reach the wall without arching."),
    D("Hip: 90/90 sit", "each side", "Both knees at 90°. Sit tall without hands and rotate side to side. Stuck or one-sided = hip work."),
  ];
  const MOB_KEY = STORAGE_PREFIX + "mobility"; // separate from workout logs: { "dayId|wN|warm|i": true }
  // How-to videos: v:<id> = specific demo (verified via YouTube oEmbed), q:<query> = YouTube search fallback.
  const VIDEOS = {
    "Foam roll T-spine extension": "q:squat+university+thoracic+spine+foam+roll+extension",
    "Open book (side-lying rotation)": "q:squat+university+open+book+thoracic+rotation",
    "Banded shoulder distraction": "q:squat+university+Banded+shoulder+distraction",
    "Doorway pec stretch": "v:l5nMszaaJ28",
    "Band pull-apart": "q:squat+university+Band+pull-apart",
    "Band external rotation": "v:lw5jkvrLwVw",
    "Scap push-up": "q:squat+university+Scap+push-up",
    "Quadruped T-spine rotation": "v:_PVrnpv_mN8",
    "Bench lat / T-spine stretch": "q:squat+university+bench+thoracic+lat+stretch",
    "Wall slide with lift-off": "v:k_zZ6XB9jds",
    "Wall slide": "q:squat+university+Wall+slide",
    "Foam roll lats + T-spine": "q:squat+university+foam+roll+lats",
    "Child's pose lat reach": "q:squat+university+child%27s+pose+lat+stretch",
    "90/90 hip switch": "q:squat+university+90%2F90+hip+switch",
    "Scap pull-up (dead hang)": "q:squat+university+scap+pull+up",
    "Bird dog": "v:xEDnlOxeJH4",
    "Thread the needle": "v:SkQhKf74nZk",
    "Prone Y raise": "q:squat+university+Prone+Y+raise",
    "Half-kneeling ankle mobilization": "v:DMGVE6JAK44",
    "Couch stretch": "v:d9pOjXCKGN8",
    "Goblet squat prying hold": "v:i8YBz2rlwXU",
    "Glute bridge (3s squeeze)": "v:tl6xvm4-Qk0",
    "Banded lateral walk": "v:pzQ2M_iY0D8",
    "Copenhagen plank (short lever)": "v:1NNqUQvMYGc",
    "Half-kneeling ankle rock": "v:DMGVE6JAK44",
    "Adductor rock-back": "v:zfO4HhPUxDw",
    "Single-leg glute bridge": "v:neRA-7kSy1s",
    "Open book hold": "q:squat+university+open+book+thoracic+rotation",
    "Crocodile breathing": "v:2ibSb6jQ3Ec",
    "Dead hang": "q:squat+university+Dead+hang",
    "Thread the needle hold": "v:SkQhKf74nZk",
    "90/90 breathing": "q:squat+university+90%2F90+breathing",
    "90/90 hip hold": "v:P4GfbdNvOT8",
    "Deep squat hold": "q:squat+university+Deep+squat+hold",
    "Ankle: knee-to-wall": "v:Clutk_VsgUY",
    "T-spine: seated rotation": "q:squat+university+seated+thoracic+rotation+test",
    "Shoulder: overhead reach": "q:squat+university+shoulder+flexion+overhead+mobility+test+wall",
    "Hip: 90/90 sit": "v:uxh_b87er9s",
    "Barbell bench press": "v:rT7DgCr-3pg",
    "Low-to-high cable press": "q:Low-to-high+cable+press+form",
    "Weighted dip or dip machine": "v:2i3o0bFZT_s",
    "Seated DB lateral raise": "v:g_7iXXBrCkY",
    "Cable overhead triceps ext.": "v:1u18yJELsh0",
    "Machine or cable fly (swap)": "q:Machine+form",
    "Weighted pull-up (or heavy lat pulldown)": "v:HuuyDNGrCI8",
    "Chest-supported row (machine / DB)": "v:H75im9fAUMc",
    "One-arm dumbbell row": "v:PgpQ4-jHiq4",
    "Face pull or rear-delt fly": "v:cc0tasCalHg",
    "EZ-bar or DB curl": "v:tJIFTI9wZOw",
    "Straight-arm pulldown (swap)": "v:G9uNaXGTJ4w",
    "Back squat (or SSB / high-bar)": "v:my0tLDaWyDU",
    "Romanian deadlift": "v:5bJEigM5iVg",
    "Walking lunge or Bulgarian split squat": "v:yDVAlYTNPSo",
    "Leg extension/elevated squat": "v:ljO4jkwv8wQ",
    "Standing or seated calf raise": "q:Standing+form",
    "Hanging knee raise or plank (swap)": "v:RD_A-Z15ER4",
    "Seated DB overhead press": "q:Seated+DB+overhead+press+form",
    "Machine chest press (neutral grip)": "v:P8Hx90LdGH4",
    "Low-to-high cable fly or pec deck": "v:eQ_NBB6OBH4",
    "Lean-away cable lateral raise": "v:v45w8UM43IY",
    "Cross-body cable or overhead rope extension": "q:Cross-body+cable+form",
    "Front raise or high-incline DB press (swap)": "v:T76xu0XjYTk",
    "Meadows row or T-bar row": "v:G-jU1aPVhnY",
    "Neutral-grip or close-grip pulldown": "v:KgZqDuNx7rI",
    "Cable seated row (wide or mid)": "v:UCXxvVItLoM",
    "Rear-delt cable or chest-supported rear fly": "v:qz1OLup4W_M",
    "Incline DB curl or Bayesian cable curl": "v:aTYlqC_JacQ",
    "Straight-arm pulldown or pullover (swap)": "v:G9uNaXGTJ4w",
    "Trap-bar deadlift or conventional": "v:v709aJKv-gM",
    "Hack squat or leg press": "v:rYgNArpwE7E",
    "Lying or seated leg curl": "q:Lying+form",
    "Box jumps": "v:9lfhjmrC8Zo",
    "Seated calf raise": "v:BxfKOyI8sUg",
    "Back extension or GHR (swap)": "v:H8Swl1N-uis",
    "Incline barbell bench press": "v:SrqOu55lrYU",
    "Flat DB press": "v:YQ2s_Y7g5Qk",
    "Close-grip bench press": "v:JeoYZk4EIDk",
    "Single-arm cable lateral raise": "q:Single-arm+cable+lateral+raise+form",
    "EZ-bar skull crusher": "v:eluOhtYkm-0",
    "Pec deck": "v:Dbly77Jgbo8",
    "Incline DB press": "v:0f6-uCUKqgA",
    "Plate-loaded chest press (Hammer Strength)": "q:Plate-loaded+chest+press+form",
    "JM press (Smith or barbell)": "v:Tih5iHyELsE",
    "Machine lateral raise": "v:0o07iGKUarI",
    "Overhead DB triceps extension": "v:-Vyt2QdsR7E",
    "High-to-low cable fly": "v:8Um35Es-ROE",
    "Smith machine bench press": "v:O5viuEPDXKY",
    "Low-incline DB press": "v:B09ZkYsnKko",
    "Weighted deficit push-up": "q:Weighted+deficit+push-up+form",
    "Cable Y-raise": "v:NBkMIWWkIKQ",
    "Rope triceps pushdown": "q:Rope+triceps+pushdown+form",
    "Seated cable fly": "v:VuzxvBnYVoA",
    "Weighted chin-up": "v:9aA0-FbxK9E",
    "Chest-supported DB row (incline bench)": "v:tZUYS7X50so",
    "Single-arm cable row": "v:pBbbR6ypIEs",
    "Reverse pec deck": "v:dC7jhEk-29A",
    "Barbell curl": "v:JnLFSFurrqQ",
    "DB pullover": "v:jQjWlIwG4sI",
    "Heavy wide-grip lat pulldown": "v:lueEJGjTuPQ",
    "Seal row (or chest-supported T-bar)": "v:4H2ItXwUTp8",
    "Single-arm machine row": "q:Single-arm+machine+row+form",
    "Prone incline DB rear-delt raise": "v:XIJTt_Czqmc",
    "Hammer curl": "v:7jqi2qWAUJk",
    "Machine pullover": "v:oxpAl14EYyc",
    "Neutral-grip weighted pull-up": "v:-27Ofi_wMFc",
    "Yates row (underhand barbell)": "v:0RyZHNgCiqQ",
    "Kroc row (heavy DB)": "v:3rB5euZ9lu0",
    "Rope face pull": "v:eFxMixk_qPQ",
    "Preacher curl": "v:7v7uldi1eLU",
    "Rope straight-arm pulldown": "v:iyJ15x6yMEw",
    "Front squat": "v:7pyxT5hqmQY",
    "Good morning": "v:f23vXjoG2e8",
    "Bulgarian split squat": "v:hPlKPjohFS0",
    "Single-leg leg extension": "v:I1F58vIjbvc",
    "Leg-press calf raise": "v:dhRz1Ns60Zg",
    "Cable crunch": "v:ToJeyhydUxU",
    "Hack squat (heavy)": "v:4cxt_Tldugw",
    "Barbell hip thrust": "v:EF7jXP17DPE",
    "DB reverse lunge": "v:sjlsISvHyZs",
    "Leg extension (1-sec pause at top)": "v:ljO4jkwv8wQ",
    "Smith machine calf raise": "v:ofEDDXpFgj8",
    "Ab wheel rollout": "q:Ab+wheel+rollout+form",
    "Belt squat or Smith squat": "v:h_ok0J0y5j4",
    "Stiff-leg deadlift": "v:Xy1O99wrKYE",
    "DB step-up": "q:DB+step-up+form",
    "Sissy squat or reverse Nordic": "v:R_GgqlXwJDE",
    "Seated calf raise (pause at stretch)": "v:BxfKOyI8sUg",
    "Hanging straight-leg raise": "v:7FwGZ8qY5OU",
    "Machine shoulder press": "v:WvLMauqrnK8",
    "Incline machine press": "q:Incline+machine+press+form",
    "DB fly": "v:_LwuS1PdbdM",
    "Super-ROM DB lateral raise": "q:Super-ROM+DB+lateral+raise+form",
    "Single-arm cable pushdown": "v:Cp_bShvMY4c",
    "Landmine press": "v:6cSTRPhpubs",
    "Arnold press": "v:ris9tKqMwgU",
    "Standing cable chest press": "q:Standing+cable+chest+press+form",
    "Incline DB fly": "v:8oR5hBwbIBc",
    "Behind-the-back cable lateral raise": "q:Behind-the-back+cable+lateral+raise+form",
    "Katana cable triceps extension": "v:nVv1fZ0eL4E",
    "Cable front raise": "v:FX2-94buxek",
    "Smith machine seated overhead press": "v:OLqZDUUD2b0",
    "Plate-loaded incline press": "q:Plate-loaded+incline+press+form",
    "Pec deck (paused squeeze)": "v:Dbly77Jgbo8",
    "Lean-in DB lateral raise": "q:Lean-in+DB+lateral+raise+form",
    "Overhead EZ-bar extension": "v:priRWVpDV8c",
    "Plate front raise": "v:e8my9OOCXVo",
    "Chest-supported T-bar row": "v:8ixhkUwBxbE",
    "Single-arm lat pulldown": "v:HBC5s98wXko",
    "Wide-grip machine row": "q:Wide-grip+machine+row+form",
    "Bent-over DB rear-delt raise": "v:73WpaOMnhSU",
    "Straight-bar cable curl": "q:Straight-bar+cable+curl+form",
    "Kneeling cable lat prayer": "q:Kneeling+cable+lat+prayer+form",
    "Chest-supported machine row (neutral)": "v:bmWA2yO9Aa0",
    "Underhand pulldown": "v:VprlTxpB1rk",
    "High-to-low single-arm cable row": "q:High-to-low+single-arm+cable+row+form",
    "Cross-cable rear-delt fly": "v:ywMSCem375A",
    "Spider curl": "v:ke2shAeQ0O8",
    "Lying cable pullover": "v:fbIyijUKdkA",
    "Smith machine row": "v:3QcJggd_L24",
    "Wide-grip pull-up (bodyweight)": "q:Wide-grip+pull-up+form",
    "Single-arm machine low row": "q:Single-arm+machine+low+row+form",
    "Single-arm rear-delt machine fly": "q:Single-arm+rear-delt+machine+fly+form",
    "Rope cable hammer curl": "q:Rope+cable+hammer+curl+form",
    "Single-arm cable lat pull-in": "q:Single-arm+cable+lat+pull-in+form",
    "Sumo deadlift": "v:FLbh7Di2KM8",
    "Pendulum squat (or leg press)": "v:wc2t62qiqAI",
    "Band-assisted Nordic ham curl": "v:RS9yc3i69M8",
    "Broad jumps": "v:q7851uL2M8c",
    "Donkey calf raise (or machine)": "v:eFAfbxHnd6Q",
    "Reverse hyper or 45° hip extension": "v:z4ziwnaw4r8",
    "Rack pull (below knee)": "v:PMqH4cOoN_A",
    "Single-leg leg press": "v:gspQiEILqOw",
    "Single-leg seated leg curl": "v:h5NievMGthk",
    "Kettlebell swing": "v:LBhaLLc153A",
    "Single-leg DB calf raise": "v:KcTEGifMTDY",
    "Cable pull-through": "v:pv8e6OSyETE",
    "Deficit conventional deadlift": "q:Deficit+conventional+deadlift+form",
    "Leg press (feet low & narrow)": "v:B6rGDcfyPto",
    "Slider or stability-ball leg curl": "q:Slider+form",
    "Jump squats (light)": "v:DeTBwEL4m7s",
    "Standing calf raise (machine)": "v:3UWi44yN-wM",
    "Single-leg hip thrust": "v:lzDgRRuBdqY"
    };
  function videoUrl(name) {
    const v = VIDEOS[name];
    if (v && v.startsWith("v:")) return "https://www.youtube.com/watch?v=" + v.slice(2);
    if (v && v.startsWith("q:")) return "https://www.youtube.com/results?search_query=" + v.slice(2);
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(name.replace(/\(.*?\)/g, "") + " form").replace(/%20/g, "+");
  }
  function watchHtml(name) {
    return `<a class="watch-link" href="${videoUrl(name)}" data-name="${esc(name)}" target="_blank" rel="noopener">▶ Watch how</a>`;
  }
  // Home PC server (LAN) keeps a live logs.json backup. On the public host, logs.json is only a
  // one-time seed of past history, and there is no server to POST to.
  const IS_LAN = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(location.hostname);
  const SEEDED_KEY = STORAGE_PREFIX + "seeded";

  const state = {
    screen: "home",
    dayId: null,
    week: loadWeek(),
    logs: loadLogs(),
    rotationStart: loadRotationStart(),
    timer: {
      running: false,
      paused: false,
      remaining: 0,
      total: 0,
      preset: 120,
      intervalId: null,
    },
  };

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  function loadWeek() {
    const w = parseInt(localStorage.getItem(WEEK_KEY), 10);
    return w >= 1 && w <= MAX_WEEK ? w : 1;
  }

  function loadRotationStart() {
    const r = parseInt(localStorage.getItem(ROT_KEY), 10);
    return r >= 4 && r <= 6 ? r : 4;
  }

  // Which block a program week falls in. Weeks 1-3 = Block 1, 4-6 = Block 2, 7-9 = Block 3,
  // 10-12 = Block 4, 13-15 = Block 1 again, etc. (If old W4/W5 logs existed before rotation was
  // added, Block 1 is stretched to cover them so those logs keep their original lift names.)
  function blockInfo(week) {
    const rs = state.rotationStart;
    if (week < rs) {
      return { block: 1, index: 0, cycle: 1, weekInBlock: week, blockLen: rs - 1, firstWeek: 1, lastWeek: rs - 1 };
    }
    const k = Math.floor((week - rs) / BLOCK_LENGTH);
    const index = (k + 1) % NUM_BLOCKS;
    const firstWeek = rs + k * BLOCK_LENGTH;
    return {
      block: index + 1,
      index,
      cycle: Math.floor((k + 1) / NUM_BLOCKS) + 1,
      weekInBlock: week - firstWeek + 1,
      blockLen: BLOCK_LENGTH,
      firstWeek,
      lastWeek: firstWeek + BLOCK_LENGTH - 1,
    };
  }

  function liftsFor(day, week) {
    return ROTATION[day.id][blockInfo(week).index];
  }

  function isFilled(v) {
    return !!(v && (v.reps || v.weight || v.rir || v.done));
  }

  function parseKey(k) {
    const m = /^([\w-]+)\|w(\d+)\|l(\d+)\|s(\d+)$/.exec(k);
    return m ? { dayId: m[1], week: +m[2], li: +m[3], si: +m[4] } : null;
  }

  // Tag each log entry with the lift name it belongs to (non-destructive; keys never change).
  function stampLiftNames() {
    let changed = false;
    Object.entries(state.logs).forEach(([k, v]) => {
      if (!v || typeof v !== "object" || v.lift) return;
      const p = parseKey(k);
      const day = p && getDay(p.dayId);
      if (!day) return;
      const lift = liftsFor(day, p.week)[p.li];
      if (lift) {
        v.lift = lift.name;
        changed = true;
      }
    });
    return changed;
  }

  // One-time upgrade from the 5-week version. Old logs keep their exact keys.
  function migrate() {
    if (localStorage.getItem(SCHEMA_KEY) !== "2") {
      let rs = 4;
      if (remoteRotationStart >= 4 && remoteRotationStart <= 6) {
        rs = remoteRotationStart;
      } else {
        let maxLegacy = 0;
        Object.entries(state.logs).forEach(([k, v]) => {
          const p = parseKey(k);
          if (p && isFilled(v) && p.week > maxLegacy) maxLegacy = p.week;
        });
        rs = Math.max(4, Math.min(maxLegacy, 5) + 1);
      }
      state.rotationStart = rs;
      localStorage.setItem(ROT_KEY, String(rs));
      localStorage.setItem(SCHEMA_KEY, "2");
    }
    if (stampLiftNames()) localStorage.setItem(LOG_KEY, JSON.stringify(state.logs));
  }

  // Most recent earlier week this exact lift was logged (any day, any cycle).
  function lastPerformance(liftName, beforeWeek) {
    let best = null;
    Object.entries(state.logs).forEach(([k, v]) => {
      if (!v || v.lift !== liftName || !(v.weight || v.reps)) return;
      const p = parseKey(k);
      if (!p || p.week >= beforeWeek) return;
      if (!best || p.week > best.week) best = { week: p.week, sets: {} };
      if (p.week === best.week) best.sets[p.si] = v;
    });
    return best;
  }

  function isWeekComplete(week) {
    return DAYS.every((d) =>
      liftsFor(d, week).some((lift, li) =>
        Array.from({ length: lift.sets }, (_, si) => si).some(
          (si) => (state.logs[logKey(d.id, week, li, si)] || {}).done
        )
      )
    );
  }


  function isDayDone(d, week) {
    return liftsFor(d, week).some((lift, li) =>
      Array.from({ length: lift.sets }, (_, si) => si).some((si) => (state.logs[logKey(d.id, week, li, si)] || {}).done)
    );
  }
  const ROMAN = ["I", "II", "III", "IV", "V", "VI"];
  const GODS = {
    hub: { img: "./img/bg-hub.webp", color: "#4da3ff" },
    phase1: { god: "Hephaestus", title: "The Forge", sub: "Lay the foundation. Build the base.", img: "./img/bg-phase1.webp", color: "#ff7a1a" },
    phase2: { god: "Athena", title: "The Craft", sub: "Sharpen the work. Own every rep.", img: "./img/bg-phase2.webp", color: "#c9c3b0" },
    phase3: { god: "Ares", title: "The Battle", sub: "Push the limit. Leave nothing.", img: "./img/bg-phase3.webp", color: "#e3263a" },
    push: { god: "Atlas", img: "./img/bg-push.webp", color: "#9b5cff" },
    pull: { god: "Poseidon", img: "./img/bg-pull.webp", color: "#2ad4c0" },
    legs: { god: "Hermes", img: "./img/bg-legs.webp", color: "#f2c14e" },
    breath: { god: "Aeolus", title: "The Winds", sub: "Slow the breath. Command the calm.", img: "./img/bg-breath.webp", color: "#a8e6ff" },
  };
  const phaseGod = (weekInBlock) => GODS["phase" + (((weekInBlock - 1) % 3) + 1)];
  function phaseLabel(week) {
    const b = blockInfo(week);
    return { roman: ROMAN[b.weekInBlock - 1] || String(b.weekInBlock), of: ROMAN[b.blockLen - 1] || String(b.blockLen), b };
  }

  // ---- Background layer: two stacked images that crossfade per section ----
  let bgActive = 0, bgCurrent = "";
  function setBg(key, preloadKeys) {
    const g = GODS[key] || GODS.hub;
    document.documentElement.style.setProperty("--god", g.color);
    const layers = $$(".bg-img");
    if (layers.length === 2 && bgCurrent !== g.img) {
      bgCurrent = g.img;
      const next = layers[1 - bgActive];
      const show = () => {
        next.style.backgroundImage = `url("${g.img}")`;
        requestAnimationFrame(() => {
          next.classList.add("on");
          layers[bgActive].classList.remove("on");
          bgActive = 1 - bgActive;
        });
      };
      const im = new Image();
      im.onload = im.onerror = show;
      im.src = g.img;
    }
    (preloadKeys || []).forEach((k) => { if (GODS[k]) { const i = new Image(); i.src = GODS[k].img; } });
  }

  const HELD_QUOTES = [
    ["No man is free who is not master of himself.", "Epictetus"],
    ["Most powerful is he who has himself in his own power.", "Seneca"],
    ["You have power over your mind, not outside events. Realize this, and you will find strength.", "Marcus Aurelius"],
    ["Difficulties strengthen the mind, as labor does the body.", "Seneca"],
    ["Fire tests gold; adversity tests the brave.", "Seneca"],
    ["Persist and resist.", "Epictetus"],
    ["What stands in the way becomes the way.", "Marcus Aurelius"],
    ["Every habit is preserved and increased by corresponding actions.", "Epictetus"],
    ["We suffer more often in imagination than in reality.", "Seneca"],
    ["Waste no more time arguing what a good man should be. Be one.", "Marcus Aurelius"],
    ["The soul becomes dyed with the color of its thoughts.", "Marcus Aurelius"],
  ];

  const STOIC = [
    ["You have power over your mind, not outside events. Realize this, and you will find strength.", "Marcus Aurelius"],
    ["The impediment to action advances action. What stands in the way becomes the way.", "Marcus Aurelius"],
    ["Waste no more time arguing about what a good man should be. Be one.", "Marcus Aurelius"],
    ["At dawn, when you have trouble getting out of bed, tell yourself: I am rising to do the work of a human being.", "Marcus Aurelius"],
    ["Very little is needed to make a happy life; it is all within yourself.", "Marcus Aurelius"],
    ["If it is not right, do not do it; if it is not true, do not say it.", "Marcus Aurelius"],
    ["The best revenge is not to be like your enemy.", "Marcus Aurelius"],
    ["Confine yourself to the present.", "Marcus Aurelius"],
    ["We suffer more often in imagination than in reality.", "Seneca"],
    ["Difficulties strengthen the mind, as labor does the body.", "Seneca"],
    ["Luck is what happens when preparation meets opportunity.", "Seneca"],
    ["It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.", "Seneca"],
    ["While we wait for life, life passes.", "Seneca"],
    ["No man is more unhappy than he who never faces adversity. For he is not permitted to prove himself.", "Seneca"],
    ["Begin at once to live.", "Seneca"],
    ["No man is free who is not master of himself.", "Epictetus"],
    ["First say to yourself what you would be; then do what you have to do.", "Epictetus"],
    ["How long are you going to wait before you demand the best for yourself?", "Epictetus"],
    ["It's not what happens to you, but how you react to it that matters.", "Epictetus"],
    ["Don't explain your philosophy. Embody it.", "Epictetus"],
    ["No great thing is created suddenly.", "Epictetus"],
    ["Every habit and faculty is preserved and increased by corresponding actions.", "Epictetus"],
    ["We should train ourselves, not with many lessons, but with constant practice.", "Musonius Rufus"],
    ["Fate leads the willing and drags along the reluctant.", "Cleanthes"],
  ];
  const STOIC_SHORT = [
    "Rest done. What stands in the way becomes the way.",
    "Rest done. Be the one who does the work.",
    "Rest done. Difficulty is what strengthens.",
    "Rest done. Confine yourself to this set.",
    "Rest done. Master yourself. Back to the bar.",
    "Rest done. Embody it, don't explain it.",
  ];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  let stoicIdx = Math.floor(Date.now() / 86400000) % STOIC.length; // new quote each day
  function renderStoic() {
    const el = document.getElementById("stoic-text");
    if (!el) return;
    const [q, a] = STOIC[stoicIdx];
    el.textContent = "\u201C" + q + "\u201D";
    document.getElementById("stoic-author").textContent = "\u2014 " + a;
  }
  function showCover() {
    const c = document.getElementById("cover");
    if (!c) return;
    const [q, a] = STOIC[stoicIdx];
    document.getElementById("cover-quote").textContent = "\u201C" + q + "\u201D";
    document.getElementById("cover-author").textContent = a;
    if (sessionStorage.getItem("arete:cover")) { c.remove(); return; }
    document.body.classList.add("covered");
    requestAnimationFrame(() => c.classList.add("in"));
    let gone = false;
    const enter = () => {
      if (gone) return; gone = true;
      sessionStorage.setItem("arete:cover", "1");
      c.classList.add("out");
      document.body.classList.remove("covered");
      document.body.classList.add("entering");
      setTimeout(() => { c.remove(); document.body.classList.remove("entering"); }, 900);
    };
    c.addEventListener("click", enter);
    c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") enter(); });
  }

  // Auto-advance: once every day of the current week has at least one set checked off,
  // the app opens on the next week (and the next block after week 3).
  function autoAdvance() {
    const start = state.week;
    while (state.week < MAX_WEEK && isWeekComplete(state.week)) state.week += 1;
    if (state.week !== start) {
      saveWeek(state.week);
      const b = blockInfo(state.week);
      const fresh = b.weekInBlock === 1;
      toast(`Phase complete. Mission accomplished. Now Rotation ${b.block} • Phase ${ROMAN[b.weekInBlock - 1] || b.weekInBlock}` + (fresh ? " · New lifts" : "") + " · \u201C" + pick(STOIC)[0] + "\u201D");
    }
  }

  let toastTimer = null;
  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 4500);
  }

  function setWeek(w) {
    state.week = Math.min(MAX_WEEK, Math.max(1, w));
    saveWeek(state.week);
  }

  function blockLabelHtml(week) {
    const b = blockInfo(week);
    const isNew = b.weekInBlock === 1 && !(b.block === 1 && b.cycle === 1);
    return `<span class="block-label">Rotation ${b.block} • Phase ${ROMAN[b.weekInBlock - 1] || b.weekInBlock} of ${ROMAN[b.blockLen - 1] || b.blockLen}</span>` +
      (isNew ? ` <span class="new-badge">New lifts!</span>` : "");
  }

  function saveWeek(w) {
    localStorage.setItem(WEEK_KEY, String(w));
  }

  function loadLogs() {
    try {
      return JSON.parse(localStorage.getItem(LOG_KEY) || "{}");
    } catch {
      return {};
    }
  }

  let saveTimer = null;
  function saveLogs() {
    const payload = JSON.stringify({ week: state.week, rotationStart: state.rotationStart, logs: state.logs });
    localStorage.setItem(LOG_KEY, JSON.stringify(state.logs));
    localStorage.setItem(WEEK_KEY, String(state.week));
    clearTimeout(saveTimer);
    if (!IS_LAN) return;
    saveTimer = setTimeout(() => {
      fetch("./logs.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        cache: "no-store",
      }).catch(() => {});
    }, 200);
  }

  function mergeLogs(local, remote) {
    const out = { ...(local || {}) };
    Object.entries(remote || {}).forEach(([k, v]) => {
      const cur = out[k];
      if (!cur) {
        out[k] = v;
        return;
      }
      const curFilled = !!(cur.reps || cur.weight || cur.rir || cur.done);
      const nextFilled = !!(v && (v.reps || v.weight || v.rir || v.done));
      if (!curFilled && nextFilled) out[k] = v;
    });
    return out;
  }

  async function hydrateLogs() {
    if (!IS_LAN && localStorage.getItem(SEEDED_KEY)) return;
    try {
      const res = await fetch("./logs.json?t=" + Date.now(), { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      const remoteLogs = data && data.logs ? data.logs : data;
      if (remoteLogs && typeof remoteLogs === "object") {
        state.logs = mergeLogs(state.logs, remoteLogs);
        localStorage.setItem(LOG_KEY, JSON.stringify(state.logs));
      }
      if (data && data.rotationStart) remoteRotationStart = parseInt(data.rotationStart, 10);
      if (data && data.week >= 1 && data.week <= MAX_WEEK && !localStorage.getItem(WEEK_KEY)) {
        state.week = data.week;
        saveWeek(state.week);
      }
      if (!IS_LAN) localStorage.setItem(SEEDED_KEY, "1");
    } catch (_) {}
  }

  function logKey(dayId, week, liftIdx, setIdx) {
    return `${dayId}|w${week}|l${liftIdx}|s${setIdx}`;
  }

  function getSetLog(dayId, week, liftIdx, setIdx) {
    return state.logs[logKey(dayId, week, liftIdx, setIdx)] || {
      reps: "",
      weight: "",
      rir: "",
      done: false,
    };
  }

  function setSetLog(dayId, week, liftIdx, setIdx, data) {
    const k = logKey(dayId, week, liftIdx, setIdx);
    const lift = liftsFor(getDay(dayId), week)[liftIdx];
    state.logs[k] = { ...getSetLog(dayId, week, liftIdx, setIdx), ...data, lift: lift ? lift.name : undefined };
    saveLogs();
  }

  function getDay(id) {
    return DAYS.find((d) => d.id === id);
  }

  function vibrate(pattern = 30) {
    try {
      if (navigator.vibrate) navigator.vibrate(pattern);
    } catch (_) {}
  }

  let audioCtx = null;
  function ensureAudio() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!audioCtx) {
        audioCtx = new AC();
        audioCtx.onstatechange = () => { try { brSndState(); } catch (_) {} };
      }
      if (audioCtx.state !== "running") {
        // iOS: resume + a one-sample silent buffer inside the tap unlocks output.
        const pr = audioCtx.resume();
        if (pr && pr.catch) pr.catch(() => {});
        try {
          const src = audioCtx.createBufferSource();
          src.buffer = audioCtx.createBuffer(1, 1, 22050);
          src.connect(audioCtx.destination);
          src.start(0);
        } catch (_) {}
      }
    } catch (_) {}
  }

  function tone(ctx, freq, start, dur, vol) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(vol, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  function notifyRestOver() {
    try {
      if (!("Notification" in window) || Notification.permission !== "granted") return;
      const opts = { body: "Next set.", tag: "rest-timer", renotify: true };
      if (navigator.serviceWorker && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then((reg) => reg.showNotification("Rest over", opts)).catch(() => {
          try { new Notification("Rest over", opts); } catch (_) {}
        });
      } else {
        new Notification("Rest over", opts);
      }
    } catch (_) {}
  }

  function beep() {
    try {
      ensureAudio();
      const ctx = audioCtx;
      if (!ctx) return;
      const t = ctx.currentTime + 0.02;
      tone(ctx, 880, t, 0.18, 0.55);
      tone(ctx, 1175, t + 0.22, 0.18, 0.55);
      tone(ctx, 1568, t + 0.44, 0.28, 0.6);
    } catch (_) {}
    vibrate([120, 60, 120, 60, 180]);
    try {
      notifyRestOver();
    } catch (_) {}
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  // ---- Rest timer: timestamp-based, so it stays correct after app switch, lock, or reload ----
  const TIMER_KEY = STORAGE_PREFIX + "timer";       // { endAt, total, preset, paused, pausedRemaining }
  const SETTINGS_KEY = STORAGE_PREFIX + "settings"; // { bgTimer: true }
  function loadSettings() {
    try {
      const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
      return { bgTimer: s.bgTimer !== false };
    } catch {
      return { bgTimer: true };
    }
  }
  let settings = loadSettings();
  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (_) {}
  }
  function persistTimer() {
    const t = state.timer;
    try {
      if (settings.bgTimer && t.running) {
        localStorage.setItem(TIMER_KEY, JSON.stringify({
          endAt: t.endAt, total: t.total, preset: t.preset, paused: t.paused, pausedRemaining: t.pausedRemaining,
        }));
      } else {
        localStorage.removeItem(TIMER_KEY);
      }
    } catch (_) {}
  }
  function computeRemaining() {
    const t = state.timer;
    if (!t.running) return t.remaining;
    if (t.paused) return t.pausedRemaining;
    return Math.max(0, Math.ceil((t.endAt - Date.now()) / 1000));
  }
  function ensureInterval() {
    if (!state.timer.intervalId) state.timer.intervalId = setInterval(tickTimer, 250);
  }

  function startTimer(seconds) {
    clearTimerInterval();
    const t = state.timer;
    t.total = seconds;
    t.preset = seconds;
    t.endAt = Date.now() + seconds * 1000;
    t.remaining = seconds;
    t.pausedRemaining = 0;
    t.running = true;
    t.paused = false;
    t.finishedAway = false;
    persistTimer();
    ensureInterval();
    renderTimer();
    document.querySelector(".app").classList.add("timer-active");
  }

  function clearTimerInterval() {
    if (state.timer.intervalId) {
      clearInterval(state.timer.intervalId);
      state.timer.intervalId = null;
    }
  }

  // away = the rest ran out while the app was hidden or closed
  function finishTimer(away) {
    const t = state.timer;
    t.remaining = 0;
    t.running = false;
    t.paused = false;
    clearTimerInterval();
    persistTimer();
    if (away) {
      vibrate([200, 80, 200]);
      toast(pick(STOIC_SHORT));
      if (document.hidden) notifyRestOver();
    } else {
      beep();
    }
    renderTimer();
    setTimeout(() => {
      if (!state.timer.running) {
        document.querySelector(".app").classList.remove("timer-active");
        renderTimer();
      }
    }, away ? 4000 : 2500);
  }

  function tickTimer() {
    const t = state.timer;
    if (!t.running) return clearTimerInterval();
    const rem = computeRemaining();
    if (rem !== t.remaining) {
      t.remaining = rem;
    }
    if (!t.paused && rem <= 0) {
      const lateMs = Date.now() - t.endAt;
      return finishTimer(document.hidden || lateMs > 2000);
    }
    renderTimer();
  }

  function pauseTimer() {
    const t = state.timer;
    if (!t.running) return;
    if (!t.paused) {
      t.pausedRemaining = computeRemaining();
      t.paused = true;
    } else {
      t.endAt = Date.now() + t.pausedRemaining * 1000;
      t.paused = false;
    }
    persistTimer();
    renderTimer();
  }

  function skipTimer() {
    clearTimerInterval();
    const t = state.timer;
    t.running = false;
    t.paused = false;
    t.remaining = 0;
    persistTimer();
    document.querySelector(".app").classList.remove("timer-active");
    renderTimer();
  }

  function shiftTimer(delta) {
    const t = state.timer;
    if (!t.running) {
      if (delta > 0) startTimer(delta);
      return;
    }
    const rem = computeRemaining();
    const next = Math.max(1, rem + delta);
    if (t.paused) t.pausedRemaining = next;
    else t.endAt = Date.now() + next * 1000;
    t.total = Math.max(t.total + (delta > 0 ? delta : 0), next);
    t.remaining = next;
    persistTimer();
    renderTimer();
  }
  function add15() { shiftTimer(15); }
  function minus15() { shiftTimer(-15); }

  function setPreset(sec) {
    state.timer.preset = sec;
    if (state.timer.running || state.timer.remaining > 0) {
      startTimer(sec);
      return;
    }
    renderTimer();
  }

  // Re-sync from the stored end time (on load, return to app, or bfcache restore).
  function resyncTimer(fromStorage) {
    const t = state.timer;
    if (fromStorage) {
      if (!settings.bgTimer) return;
      let saved = null;
      try { saved = JSON.parse(localStorage.getItem(TIMER_KEY) || "null"); } catch (_) {}
      if (!saved || !saved.endAt) return;
      Object.assign(t, {
        endAt: saved.endAt, total: saved.total || 120, preset: saved.preset || t.preset,
        paused: !!saved.paused, pausedRemaining: saved.pausedRemaining || 0, running: true,
      });
      document.querySelector(".app").classList.add("timer-active");
    }
    if (!t.running) return;
    if (!t.paused && Date.now() >= t.endAt) return finishTimer(true);
    t.remaining = computeRemaining();
    ensureInterval();
    renderTimer();
  }

  function onHidden() {
    const t = state.timer;
    if (!t.running || t.paused) return;
    if (!settings.bgTimer) {
      // Background timer off: freeze the rest while the app is away.
      pauseTimer();
      t.autoPaused = true;
      return;
    }
    persistTimer();
  }
  function onVisible() {
    const t = state.timer;
    if (t.autoPaused && t.paused) {
      t.autoPaused = false;
      pauseTimer();
      return;
    }
    resyncTimer(false);
  }

  const RING_LEN = 2 * Math.PI * 52;
  function renderTimer() {
    const bar = $("#timer-bar");
    const t = state.timer;
    const show = t.running || t.remaining > 0;
    bar.classList.toggle("visible", show || document.querySelector(".app").classList.contains("timer-active"));

    const cd = $("#timer-countdown");
    cd.textContent = formatTime(t.remaining);
    cd.classList.toggle("urgent", t.running && t.remaining > 0 && t.remaining <= 10);
    const doneNow = !t.running && t.remaining === 0;
    bar.classList.toggle("done", doneNow);
    bar.classList.toggle("paused", t.running && t.paused);
    $("#timer-label").textContent = doneNow ? "Rest complete" : t.paused ? "Holding" : "Rest · T-minus";

    // Ring drains smoothly: use exact ms remaining, not whole seconds.
    let frac = 0;
    if (t.running && t.total > 0) {
      const ms = t.paused ? t.pausedRemaining * 1000 : Math.max(0, t.endAt - Date.now());
      frac = Math.min(1, ms / (t.total * 1000));
    }
    $("#timer-ring").style.strokeDashoffset = String(RING_LEN * (1 - frac));

    $("#btn-pause").textContent = t.paused ? "Resume" : "Pause";
    $$(".preset-btn").forEach((btn) => {
      btn.classList.toggle("active", parseInt(btn.dataset.sec, 10) === t.preset);
    });
  }

  // ---- UI extras: press ripple, check burst, video sheet, settings ----
  function ripple(e) {
    const btn = e.target.closest("button, .btn-heavy");
    if (!btn || btn.disabled) return;
    const r = btn.getBoundingClientRect();
    const s = document.createElement("span");
    s.className = "ripple";
    const size = Math.max(r.width, r.height) * 1.4;
    s.style.width = s.style.height = size + "px";
    s.style.left = e.clientX - r.left - size / 2 + "px";
    s.style.top = e.clientY - r.top - size / 2 + "px";
    btn.appendChild(s);
    setTimeout(() => s.remove(), 600);
  }
  function burst(btn) {
    btn.classList.remove("burst");
    void btn.offsetWidth;
    btn.classList.add("burst");
  }

  function openVideo(id, title, href) {
    const sheet = $("#video-sheet");
    $("#video-title").textContent = title || "How-to";
    $("#video-open").href = href || "https://www.youtube.com/watch?v=" + id;
    $("#video-iframe").src = `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0&modestbranding=1&autoplay=1`;
    sheet.style.transform = "";
    document.body.classList.add("sheet-open");
    vibrate(15);
  }
  function closeVideo() {
    document.body.classList.remove("sheet-open");
    $("#video-sheet").style.transform = "";
    setTimeout(() => {
      if (!document.body.classList.contains("sheet-open")) $("#video-iframe").src = "about:blank";
    }, 320);
  }
  function bindVideoSheet() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a.watch-link");
      if (!a) return;
      const m = /[?&]v=([\w-]{6,})/.exec(a.href);
      if (!m) return; // search fallback: let it open YouTube
      e.preventDefault();
      openVideo(m[1], a.dataset.name, a.href);
    });
    $("#video-backdrop").addEventListener("click", closeVideo);
    $("#video-close").addEventListener("click", closeVideo);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeVideo(); });
    const sheet = $("#video-sheet");
    const grab = $("#video-grab");
    let y0 = null, dy = 0;
    grab.addEventListener("touchstart", (e) => { y0 = e.touches[0].clientY; dy = 0; sheet.classList.add("dragging"); }, { passive: true });
    grab.addEventListener("touchmove", (e) => {
      if (y0 === null) return;
      dy = Math.max(0, e.touches[0].clientY - y0);
      sheet.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    grab.addEventListener("touchend", () => {
      sheet.classList.remove("dragging");
      if (dy > 90) closeVideo();
      else sheet.style.transform = "";
      y0 = null;
    });
  }


  // ---- Discipline counter (private, phone only) ----
  const DISC_KEY = STORAGE_PREFIX + "discipline";
  const dayNum = (iso) => Math.floor(new Date(iso + "T12:00:00").getTime() / 86400000);
  const todayIso = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
  function loadDisc() {
    try { const d = JSON.parse(localStorage.getItem(DISC_KEY) || "null"); if (d && d.start) return d; } catch {}
    return { start: "2026-11-07", slips: [], perDay: 0, urgeEnd: 0 };
  }
  let disc = loadDisc();
  const saveDisc = () => localStorage.setItem(DISC_KEY, JSON.stringify(disc));
  let urgeTimer = null;
  function discStats() {
    const today = dayNum(todayIso()), start = dayNum(disc.start);
    const slips = (disc.slips || []).map(dayNum).filter((n) => n >= start && n <= today);
    if (today < start) return { pending: start - today };
    const last = slips.length ? Math.max(...slips) : start - 1;
    const streak = today - last;            // today counts once you've held it
    const total = today - start + 1 - new Set(slips).size;
    const m = new Date(); const monthStart = dayNum(new Date(m.getFullYear(), m.getMonth(), 1, 12).toISOString().slice(0, 10));
    const from = Math.max(start, monthStart);
    const month = today - from + 1 - slips.filter((n) => n >= from).length;
    return { streak, total, month, saved: Math.max(0, total) * (Number(disc.perDay) || 0) };
  }
  function renderDiscipline() {
    const el = document.getElementById("discipline-card");
    if (!el) return;
    const st = discStats();
    const marks = [7, 14, 30, 60, 90].map((n) => `<span class="disc-mark${!st.pending && st.streak >= n ? " hit" : ""}">${n}</span>`).join("");
    const urgeLeft = Math.max(0, (disc.urgeEnd || 0) - Date.now());
    const mm = String(Math.floor(urgeLeft / 60000)).padStart(2, "0"), ss = String(Math.floor((urgeLeft % 60000) / 1000)).padStart(2, "0");
    el.innerHTML = `
      <details class="lift-card mob-card disc-card"${disc.open ? " open" : ""}>
        <summary class="lift-header mob-summary">
          <div class="lift-name">Discipline</div>
          <div class="lift-target">${st.pending ? `Begins in ${st.pending} day${st.pending === 1 ? "" : "s"}` : `Day ${st.streak} · held strong`} · private, this phone only</div>
        </summary>
        <div class="disc-body">
          <div class="disc-big">${st.pending ? "—" : st.streak}<small>${st.pending ? "not started" : "days strong"}</small></div>
          <div class="disc-marks">${marks}</div>
          ${checkinDotsHtml()}
          ${st.pending ? "" : `<div class="disc-stats"><div><b>${st.month}</b><span>this month</span></div><div><b>${st.total}</b><span>all time</span></div><div><b>$${Math.round(st.saved)}</b><span>kept</span></div></div>`}
          <button type="button" class="btn-heavy disc-urge" id="disc-urge">${urgeLeft ? `Hold the line · ${mm}:${ss}` : "Urge? Hold 15 minutes"}</button>
          <div class="disc-beaten"><b>${disc.urgesBeaten || 0}</b> urge${(disc.urgesBeaten || 0) === 1 ? "" : "s"} beaten</div>
          <div class="disc-settings">
            <label>Start <input type="date" id="disc-start" value="${esc(disc.start)}"></label>
            <label>$ / day <input type="number" inputmode="decimal" min="0" step="1" id="disc-per" value="${disc.perDay || ""}" placeholder="0"></label>
          </div>
          ${st.pending ? "" : `<button type="button" class="disc-slip" id="disc-slip">Log a slip today (not a reset)</button>`}
        </div>
      </details>
      ${journalHtml()}`;
    const det = el.querySelector("details");
    det.addEventListener("toggle", () => { disc.open = det.open; saveDisc(); });
    $("#disc-start").addEventListener("change", (e) => { if (e.target.value) { disc.start = e.target.value; saveDisc(); renderDiscipline(); } });
    $("#disc-per").addEventListener("change", (e) => { disc.perDay = Math.max(0, Number(e.target.value) || 0); saveDisc(); renderDiscipline(); });
    const slip = $("#disc-slip");
    if (slip) slip.addEventListener("click", () => {
      if (!confirm("Log a slip for today? Your month and all-time days stay.")) return;
      disc.slips = (disc.slips || []).concat(todayIso()); saveDisc(); renderDiscipline();
      toast("Logged. Back at it tomorrow. \u201CNo great thing is created suddenly.\u201D");
    });
    $("#disc-urge").addEventListener("click", startUrge);
    wireDots(el);
    if (urgeLeft) tickUrge();
    wireJournal();
  }
  function startUrge() {
    {
      if ((disc.urgeEnd || 0) > Date.now()) return;
      disc.urgeEnd = Date.now() + 15 * 60000; saveDisc(); vibrate(20); tickUrge();
      toast("Fifteen minutes. It peaks and passes. \u201CWe suffer more in imagination than in reality.\u201D");
      renderDiscipline();
    }
  }
  const TRIGGERS = ["Waking up", "After work", "Stress", "Boredom", "Gaming", "Grief", "Social", "Tired"];
  const PROMPTS = [
    "What would the best version of you do with tonight?",
    "What did the urge feel like, and what did you do instead?",
    "What are you proud of today?",
    "What's one thing that would make tomorrow easier?",
    "Where did you use your abilities today?",
    "What are you grateful for right now?",
    "What is in your control tomorrow, and what isn't?",
  ];
  function journalHtml() {
    const day = todayIso();
    const e = (disc.log || {})[day] || {};
    const prompt = PROMPTS[dayNum(day) % PROMPTS.length];
    const entries = Object.entries(disc.log || {}).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 30);
    const fmt = (iso) => new Date(iso + "T12:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    return `
      <details class="lift-card mob-card disc-card"${disc.jopen ? " open" : ""} id="journal-det">
        <summary class="lift-header mob-summary">
          <div class="lift-name">Daily log</div>
          <div class="lift-target">${e.saved ? "Today logged ✓" : "Check in + journal"} · this phone only</div>
        </summary>
        <div class="disc-body jr">
          <div class="jr-label">${fmt(day)}</div>
          <div class="jr-seg" role="group">
            <button type="button" class="jr-opt${e.clean === true ? " on" : ""}" data-clean="1">Held strong</button>
            <button type="button" class="jr-opt${e.clean === false ? " on slip" : ""}" data-clean="0">Slipped</button>
          </div>
          <label class="jr-range">Strongest urge <b id="jr-cv">${e.craving ?? 0}</b>
            <input type="range" min="0" max="10" step="1" id="jr-craving" value="${e.craving ?? 0}"></label>
          <div class="jr-sub">What set it off</div>
          <div class="jr-chips">${TRIGGERS.map((t) => `<button type="button" class="jr-chip${(e.triggers || []).includes(t) ? " on" : ""}" data-t="${esc(t)}">${esc(t)}</button>`).join("")}</div>
          <label class="jr-range">Sleep last night <b id="jr-sv">${e.sleep ?? 5}</b>
            <input type="range" min="0" max="10" step="1" id="jr-sleep" value="${e.sleep ?? 5}"></label>
          <div class="jr-seg" role="group">
            <button type="button" class="jr-opt${e.trained ? " on" : ""}" id="jr-trained">Trained today</button>
          </div>
          <div class="jr-prompt">${esc(prompt)}</div>
          <textarea id="jr-text" rows="5" placeholder="Write it out…">${esc(e.text || "")}</textarea>
          <button type="button" class="btn-heavy" id="jr-save">${e.saved ? "Update today's log" : "Save today's log"}</button>
          ${entries.length ? `<div class="jr-hist">
            <div class="jr-sub">History</div>
            ${entries.map(([d, x]) => `<details class="jr-entry"><summary><span>${fmt(d)}</span><span class="${x.clean === false ? "bad" : "good"}">${x.clean === false ? "Slip" : x.clean === true ? "Held" : "—"}</span><span>Urge ${x.craving ?? "–"} · Sleep ${x.sleep ?? "–"}${x.trained ? " · Trained" : ""}</span></summary>${(x.triggers || []).length ? `<div class="jr-tr">${esc(x.triggers.join(", "))}</div>` : ""}${x.text ? `<p>${esc(x.text).replace(/\n/g, "<br>")}</p>` : ""}${checkinText(x) ? `<div class="jr-tr">${esc(checkinText(x).trim()).replace(/\n\s*/g, "<br>")}</div>` : ""}</details>`).join("")}
            <button type="button" class="disc-slip" id="jr-copy">Copy log as text (for counseling)</button>
          </div>` : ""}
        </div>
      </details>`;
  }
  function wireJournal() {
    const det = document.getElementById("journal-det");
    if (!det) return;
    det.addEventListener("toggle", () => { disc.jopen = det.open; saveDisc(); });
    const day = todayIso();
    const draft = Object.assign({ triggers: [] }, (disc.log || {})[day] || {});
    det.querySelectorAll("[data-clean]").forEach((b) => b.addEventListener("click", () => {
      draft.clean = b.dataset.clean === "1";
      det.querySelectorAll("[data-clean]").forEach((x) => x.classList.remove("on", "slip"));
      b.classList.add("on"); if (!draft.clean) b.classList.add("slip"); vibrate(10);
    }));
    det.querySelectorAll(".jr-chip").forEach((b) => b.addEventListener("click", () => {
      const t = b.dataset.t; const i = draft.triggers.indexOf(t);
      if (i >= 0) draft.triggers.splice(i, 1); else draft.triggers.push(t);
      b.classList.toggle("on", i < 0); vibrate(10);
    }));
    $("#jr-craving").addEventListener("input", (e) => { draft.craving = +e.target.value; $("#jr-cv").textContent = e.target.value; });
    $("#jr-sleep").addEventListener("input", (e) => { draft.sleep = +e.target.value; $("#jr-sv").textContent = e.target.value; });
    $("#jr-trained").addEventListener("click", (e) => { draft.trained = !draft.trained; e.currentTarget.classList.toggle("on", draft.trained); vibrate(10); });
    $("#jr-save").addEventListener("click", () => {
      draft.text = $("#jr-text").value.trim();
      if (draft.craving == null) draft.craving = +$("#jr-craving").value;
      if (draft.sleep == null) draft.sleep = +$("#jr-sleep").value;
      draft.saved = true;
      disc.log = disc.log || {};
      const wasSlip = disc.log[day] && disc.log[day].clean === false;
      disc.log[day] = draft;
      disc.slips = disc.slips || [];
      if (draft.clean === false && !disc.slips.includes(day)) disc.slips.push(day);
      if (draft.clean === true && wasSlip) disc.slips = disc.slips.filter((d) => d !== day);
      saveDisc(); vibrate(20);
      toast(draft.clean === false ? "Logged. Not a reset. Back at it tomorrow." : "Logged. \u201CWaste no more time arguing what a good man should be. Be one.\u201D");
      renderDiscipline();
    });
    const cp = $("#jr-copy");
    if (cp) cp.addEventListener("click", () => {
      const txt = Object.entries(disc.log || {}).sort().map(([d, x]) =>
        `${d} | ${x.clean === false ? "Slip" : x.clean === true ? "Held" : "-"} | urge ${x.craving ?? "-"} | sleep ${x.sleep ?? "-"} | trained ${x.trained ? "yes" : "no"}${(x.triggers || []).length ? " | triggers: " + x.triggers.join(", ") : ""}${x.text ? "\n  " + x.text.replace(/\n/g, "\n  ") : ""}${checkinText(x)}`).join("\n");
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast("Copied. Paste it wherever you like."), () => toast("Couldn't copy on this phone."));
    });
  }
  function tickUrge() {
    clearTimeout(urgeTimer);
    if (!(disc.urgeEnd > 0)) return;
    urgeTimer = setTimeout(() => {
      const left = (disc.urgeEnd || 0) - Date.now();
      if (left <= 0) { checkUrge(); return; }
      const b = document.getElementById("disc-urge");
      if (b) b.textContent = `Hold the line · ${String(Math.floor(left / 60000)).padStart(2, "0")}:${String(Math.floor((left % 60000) / 1000)).padStart(2, "0")}`;
      tickUrge();
    }, 1000);
  }
  // Fires once per timer: when it hits zero live, or when the app is reopened after it ran out.
  function checkUrge() {
    if (!(disc.urgeEnd > 0) || Date.now() < disc.urgeEnd) { if (disc.urgeEnd > 0) tickUrge(); return; }
    disc.urgeEnd = 0;
    disc.urgesBeaten = (disc.urgesBeaten || 0) + 1;
    saveDisc();
    vibrate([120, 60, 120]);
    const [q, a] = pick(HELD_QUOTES);
    showHeld(q, a);
    try {
      if ("Notification" in window && Notification.permission === "granted") {
        const opts = { body: "\u201C" + q + "\u201D \u2014 " + a, tag: "arete-held", icon: "./icon-192.png?v=23", badge: "./icon-192.png?v=23" };
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
          navigator.serviceWorker.ready.then((reg) => reg.showNotification("You held the line.", opts)).catch(() => {});
        }
      }
    } catch (_) {}
    renderDiscipline();
  }
  function showHeld(q, a) {
    let o = document.getElementById("held");
    if (o) o.remove();
    o = document.createElement("div");
    o.id = "held"; o.className = "held"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true");
    o.innerHTML = `<div class="held-inner">
        <div class="held-ring" aria-hidden="true">✓</div>
        <h2 class="held-title">You held the line.</h2>
        <div class="held-rule" aria-hidden="true"></div>
        <blockquote class="held-quote">\u201C${esc(q)}\u201D</blockquote>
        <p class="held-author">${esc(a)}</p>
        <p class="held-count"><b>${disc.urgesBeaten || 0}</b> beaten</p>
        <button type="button" class="btn-heavy held-close">Onward</button>
      </div>`;
    document.body.appendChild(o);
    requestAnimationFrame(() => o.classList.add("in"));
    const close = () => { o.classList.remove("in"); setTimeout(() => o.remove(), 500); };
    o.querySelector(".held-close").addEventListener("click", close);
    o.addEventListener("click", (e) => { if (e.target === o) close(); });
  }


  // ---- Daily check-ins (private, this phone only) ----
  const CHECKINS = [
    { id: "morning", label: "Morning anchor", short: "AM", def: "07:00" },
    { id: "midday", label: "Midday reset", short: "MID", def: "11:10" },
    { id: "after", label: "After work", short: "PM", def: "15:45" },
    { id: "evening", label: "Evening review", short: "EVE", def: "20:30" },
  ];
  const CI_INTENT = ["Train", "Stay busy", "Hold strong", "Rest"];
  const CI_REASONS = ["My people", "Health", "My old self"];
  const CI_PLANS = ["Train now", "Walk", "Shower", "Call someone", "Eat", "Gaming"];
  const CI_MOVES = ["Gum", "Cold water", "Walk", "Breathe 2 min", "Pushups", "Eat"];
  const CI_LINES = {
    midday: [["You have power over your mind, not outside events. Realize this, and you will find strength.", "Marcus Aurelius"], ["Wait. Give the urge a little time; it will pass.", "Epictetus"], ["We suffer more in imagination than in reality.", "Seneca"]],
    morning: [["At dawn, tell yourself: I am rising to do the work of a human being.", "Marcus Aurelius"], ["Begin at once to live.", "Seneca"], ["First say to yourself what you would be; then do what you have to do.", "Epictetus"]],
    after: [["Most powerful is he who has himself in his own power.", "Seneca"], ["Persist and resist.", "Epictetus"], ["What stands in the way becomes the way.", "Marcus Aurelius"]],
    evening: [["Every night, review the day. What did I do well? What can I do better?", "Seneca"], ["No great thing is created suddenly.", "Epictetus"], ["Confine yourself to the present.", "Marcus Aurelius"]],
  };
  function ciCfg() {
    disc.checkins = disc.checkins || {};
    const c = disc.checkins;
    c.times = Object.assign({}, ...CHECKINS.map((k) => ({ [k.id]: k.def })), c.times || {});
    c.enabled = Object.assign({}, ...CHECKINS.map((k) => ({ [k.id]: true })), c.enabled || {});
    c.notified = c.notified || {};
    return c;
  }
  const hm = (t) => { const [h, m] = String(t || "0:0").split(":").map(Number); return (h || 0) * 60 + (m || 0); };
  const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
  const fmtTime = (t) => { const m = hm(t); const h = Math.floor(m / 60), mm = m % 60; return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`; };
  function ciToday(date) { const l = (disc.log || {})[date || todayIso()] || {}; return l.checkins || {}; }
  function ciDone(id, date) { return !!(ciToday(date)[id] || {}).done; }
  // The check-in whose window we're in: its time has passed and the next enabled one hasn't started.
  function dueCheckin() {
    const c = ciCfg(), n = nowMin();
    const on = CHECKINS.filter((k) => c.enabled[k.id]).sort((a, b) => hm(c.times[a.id]) - hm(c.times[b.id]));
    let cur = null;
    on.forEach((k) => { if (n >= hm(c.times[k.id])) cur = k; });
    return cur && !ciDone(cur.id) ? cur : null;
  }
  function checkinDotsHtml() {
    const c = ciCfg(), due = dueCheckin();
    return `<div class="ci-dots" aria-label="Today's check-ins">${CHECKINS.map((k) => {
      const done = ciDone(k.id), off = !c.enabled[k.id];
      return `<button type="button" class="ci-dot${done ? " done" : ""}${due && due.id === k.id ? " due" : ""}${off ? " off" : ""}" data-ci="${k.id}"><i>${done ? "✓" : ""}</i><span>${k.short}</span></button>`;
    }).join("")}</div>`;
  }
  function wireDots(root) {
    $$(".ci-dot", root).forEach((b) => b.addEventListener("click", () => openCheckin(b.dataset.ci)));
  }
  function renderCheckinBanner() {
    const el = document.getElementById("checkin-banner");
    if (!el) return;
    const due = dueCheckin();
    if (!due || state.screen !== "home") { el.innerHTML = ""; el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = `<button type="button" class="ci-banner" id="ci-open"><span class="ci-pulse" aria-hidden="true"></span><span class="ci-b-text"><b>Check-in due</b> · ${due.label}</span><span class="ci-b-arrow">›</span></button>`;
    $("#ci-open").addEventListener("click", () => openCheckin(due.id));
  }
  function checkinText(x) {
    const ci = (x && x.checkins) || {};
    const parts = [];
    if (ci.morning && ci.morning.done) parts.push(`morning: sleep ${ci.morning.sleep ?? "-"}${ci.morning.intent ? ", intention " + ci.morning.intent : ""}${(ci.morning.reasons || []).length ? ", reason " + ci.morning.reasons.join(", ") : ""}`);
    if (ci.midday && ci.midday.done) parts.push(`midday: urge ${ci.midday.urge ?? "-"}${(ci.midday.plan || []).length ? ", plan " + ci.midday.plan.join(", ") : ""}`);
    if (ci.after && ci.after.done) parts.push(`after work: urge ${ci.after.urge ?? "-"}${(ci.after.plan || []).length ? ", plan " + ci.after.plan.join(", ") : ""}`);
    if (ci.evening && ci.evening.done) parts.push(`evening: ${ci.evening.clean === false ? "slipped" : "held"}, peak ${ci.evening.peak ?? "-"}, trained ${ci.evening.trained ? "yes" : "no"}${ci.evening.note ? ", note: " + ci.evening.note : ""}`);
    return parts.length ? "\n  check-ins: " + parts.join(" | ") : "";
  }

  function chipRow(name, opts, sel, multi) {
    return `<div class="jr-chips" data-group="${name}"${multi ? ' data-multi="1"' : ""}>${opts.map((o) => `<button type="button" class="jr-chip${(multi ? (sel || []).includes(o) : sel === o) ? " on" : ""}" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
  }
  function openCheckin(id) {
    const k = CHECKINS.find((x) => x.id === id) || CHECKINS[0];
    const date = todayIso();
    disc.log = disc.log || {};
    const day = disc.log[date] || {};
    const prev = (day.checkins || {})[k.id] || {};
    const d = Object.assign({}, prev);
    const [q, a] = CI_LINES[k.id][dayNum(date) % CI_LINES[k.id].length];
    let body = "";
    if (k.id === "morning") {
      d.sleep = d.sleep ?? day.sleep ?? 6; d.reasons = d.reasons || [];
      body = `
        <label class="jr-range">How did you sleep? <b class="ci-v" data-for="sleep">${d.sleep}</b>
          <input type="range" min="0" max="10" step="1" data-k="sleep" value="${d.sleep}"></label>
        <div class="jr-sub">Today's intention</div>${chipRow("intent", CI_INTENT, d.intent, false)}
        <div class="jr-sub">My reason today</div>${chipRow("reasons", CI_REASONS, d.reasons, true)}`;
    } else if (k.id === "after" || k.id === "midday") {
      d.urge = d.urge ?? 0; d.plan = d.plan || [];
      const live = (disc.urgeEnd || 0) > Date.now();
      body = `
        <label class="jr-range">Urge right now <b class="ci-v" data-for="urge">${d.urge}</b>
          <input type="range" min="0" max="10" step="1" data-k="urge" value="${d.urge}"></label>
        <div class="jr-sub">${k.id === "midday" ? "Noon is the peak. Your move for the next hour" : "The plan for the next hour"}</div>${chipRow("plan", k.id === "midday" ? CI_MOVES : CI_PLANS, d.plan, true)}
        <button type="button" class="btn-heavy ci-hold" id="ci-hold"${live ? " disabled" : ""}>${live ? "Holding the line…" : "Hold the line · 15 min"}</button>`;
    } else {
      d.clean = d.clean ?? day.clean; d.peak = d.peak ?? day.craving ?? 0; d.trained = d.trained ?? !!day.trained;
      body = `
        <div class="jr-seg" role="group">
          <button type="button" class="jr-opt${d.clean === true ? " on" : ""}" data-clean="1">Held strong</button>
          <button type="button" class="jr-opt${d.clean === false ? " on slip" : ""}" data-clean="0">Slipped</button>
        </div>
        <label class="jr-range">Urge peak today <b class="ci-v" data-for="peak">${d.peak}</b>
          <input type="range" min="0" max="10" step="1" data-k="peak" value="${d.peak}"></label>
        <div class="jr-seg"><button type="button" class="jr-opt${d.trained ? " on" : ""}" id="ci-trained">Trained today</button></div>
        <input type="text" class="ci-note" id="ci-note" maxlength="140" placeholder="One line about today…" value="${esc(d.note || "")}">`;
    }
    closeCheckin(true);
    const o = document.createElement("div");
    o.className = "ci-wrap"; o.id = "ci-wrap";
    o.innerHTML = `<div class="ci-back"></div>
      <div class="ci-sheet jr" role="dialog" aria-modal="true" aria-labelledby="ci-title">
        <div class="sheet-handle"></div>
        <div class="ci-head"><div><div class="ci-kicker">${fmtTime(ciCfg().times[k.id])} check-in</div><h2 class="ci-title" id="ci-title">${k.label}</h2></div>
          <button type="button" class="sheet-close" id="ci-x" aria-label="Close">✕</button></div>
        <blockquote class="ci-quote">\u201C${esc(q)}\u201D <span>— ${esc(a)}</span></blockquote>
        ${body}
        <button type="button" class="btn-heavy ci-save" id="ci-save">${prev.done ? "Update ✓" : "Done ✓"}</button>
      </div>`;
    document.body.appendChild(o);
    document.body.classList.add("ci-open");
    requestAnimationFrame(() => o.classList.add("in"));
    o.querySelector(".ci-back").addEventListener("click", () => closeCheckin());
    $("#ci-x").addEventListener("click", () => closeCheckin());
    $$("input[type=range]", o).forEach((r) => r.addEventListener("input", () => { d[r.dataset.k] = +r.value; o.querySelector(`.ci-v[data-for="${r.dataset.k}"]`).textContent = r.value; }));
    $$(".jr-chips", o).forEach((g) => $$(".jr-chip", g).forEach((b) => b.addEventListener("click", () => {
      const key = g.dataset.group, v = b.dataset.v;
      if (g.dataset.multi) { const arr = d[key] = d[key] || []; const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); b.classList.toggle("on", i < 0); }
      else { d[key] = d[key] === v ? undefined : v; $$(".jr-chip", g).forEach((x) => x.classList.toggle("on", x.dataset.v === d[key])); }
      vibrate(10);
    })));
    $$("[data-clean]", o).forEach((b) => b.addEventListener("click", () => {
      d.clean = b.dataset.clean === "1";
      $$("[data-clean]", o).forEach((x) => x.classList.remove("on", "slip"));
      b.classList.add("on"); if (!d.clean) b.classList.add("slip"); vibrate(10);
    }));
    const tr = $("#ci-trained");
    if (tr) tr.addEventListener("click", () => { d.trained = !d.trained; tr.classList.toggle("on", d.trained); vibrate(10); });
    const hold = $("#ci-hold");
    if (hold) hold.addEventListener("click", () => { startUrge(); hold.disabled = true; hold.textContent = "Holding the line…"; });
    $("#ci-save").addEventListener("click", () => {
      const note = $("#ci-note");
      if (note) d.note = note.value.trim();
      d.done = true; d.at = Date.now();
      const entry = disc.log[date] = disc.log[date] || {};
      entry.checkins = entry.checkins || {};
      entry.checkins[k.id] = d;
      // Feed the existing daily log so history + export stay in one place.
      if (k.id === "morning") entry.sleep = d.sleep;
      if (k.id === "after" || k.id === "midday") entry.craving = Math.max(entry.craving || 0, d.urge || 0);
      if (k.id === "evening") {
        disc.slips = disc.slips || [];
        const wasSlip = entry.clean === false;
        if (d.clean !== undefined) entry.clean = d.clean;
        entry.craving = d.peak; entry.trained = !!d.trained; entry.saved = true;
        if (d.note && !(entry.text || "").includes(d.note)) entry.text = (entry.text ? entry.text + "\n" : "") + d.note;
        if (entry.clean === false && !disc.slips.includes(date)) disc.slips.push(date);
        if (entry.clean === true && wasSlip) disc.slips = disc.slips.filter((x) => x !== date);
      }
      saveDisc(); vibrate(20);
      closeCheckin();
      toast(k.id === "evening" ? (d.clean === false ? "Logged. Not a reset. Tomorrow we go again." : "Day logged. Rest well.") : `${k.label} ✓`);
      renderDiscipline(); renderCheckinBanner();
    });
  }
  function closeCheckin(instant) {
    const o = document.getElementById("ci-wrap");
    document.body.classList.remove("ci-open");
    if (!o) return;
    if (instant) { o.remove(); return; }
    o.classList.remove("in"); setTimeout(() => o.remove(), 400);
  }

  // Reminders: banner + optional local notification when due; schedule ahead where the browser supports triggers.
  function ciNotifyIfDue() {
    const due = dueCheckin();
    if (!due) return;
    const c = ciCfg(), key = todayIso() + "|" + due.id;
    if (c.notified[key]) return;
    c.notified[key] = 1;
    Object.keys(c.notified).forEach((x) => { if (x.slice(0, 10) < todayIso()) delete c.notified[x]; });
    saveDisc();
    if (!document.hidden) return; // he's looking at the banner already
    swNotify("ARETE · " + due.label, { body: "Check-in due. Tap to open.", tag: "arete-ci-" + due.id, data: { url: "./#checkin" } });
  }
  function swNotify(title, opts) {
    try {
      if (!("Notification" in window) || Notification.permission !== "granted" || !navigator.serviceWorker) return;
      navigator.serviceWorker.ready.then((reg) => reg.showNotification(title, Object.assign({ icon: "./icon-192.png?v=23", badge: "./icon-192.png?v=23" }, opts))).catch(() => {});
    } catch (_) {}
  }
  function ciSchedule() {
    try {
      if (!("Notification" in window) || Notification.permission !== "granted" || !navigator.serviceWorker) return;
      if (typeof TimestampTrigger === "undefined" || !("showTrigger" in Notification.prototype)) return;
      const c = ciCfg();
      navigator.serviceWorker.ready.then(async (reg) => {
        const old = await reg.getNotifications({ includeTriggered: false }).catch(() => []);
        old.forEach((n) => { if (/^arete-ci-/.test(n.tag)) n.close(); });
        const base = new Date(); base.setHours(0, 0, 0, 0);
        for (let dd = 0; dd < 3; dd++) CHECKINS.forEach((k) => {
          if (!c.enabled[k.id]) return;
          const ts = base.getTime() + dd * 86400000 + hm(c.times[k.id]) * 60000;
          if (ts <= Date.now() + 30000) return;
          reg.showNotification("ARETE · " + k.label, { body: "Check-in due. Tap to open.", tag: "arete-ci-" + k.id + "-" + dd, icon: "./icon-192.png?v=23", data: { url: "./#checkin" }, showTrigger: new TimestampTrigger(ts) }).catch(() => {});
        });
      }).catch(() => {});
    } catch (_) {}
  }

  // Calendar file: daily repeating reminders, one per check-in.
  function buildIcs() {
    const c = ciCfg();
    const pad = (n) => String(n).padStart(2, "0");
    const d = new Date();
    const ymd = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
    const url = "https://mishou-design.github.io/ppl-8flc28g/#checkin";
    const L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ARETE//Check-ins//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:ARETE",
      "BEGIN:VTIMEZONE", "TZID:America/Chicago",
      "BEGIN:DAYLIGHT", "TZOFFSETFROM:-0600", "TZOFFSETTO:-0500", "TZNAME:CDT", "DTSTART:19700308T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU", "END:DAYLIGHT",
      "BEGIN:STANDARD", "TZOFFSETFROM:-0500", "TZOFFSETTO:-0600", "TZNAME:CST", "DTSTART:19701101T020000", "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU", "END:STANDARD",
      "END:VTIMEZONE"];
    CHECKINS.forEach((k) => {
      if (!c.enabled[k.id]) return;
      const m = hm(c.times[k.id]);
      L.push("BEGIN:VEVENT", `UID:arete-checkin-${k.id}@mishou-design.github.io`, `DTSTAMP:${stamp}`,
        `DTSTART;TZID=America/Chicago:${ymd}T${pad(Math.floor(m / 60))}${pad(m % 60)}00`, "DURATION:PT10M", "RRULE:FREQ=DAILY",
        `SUMMARY:ARETE · ${k.label}`, `DESCRIPTION:Check-in time. Open ARETE: ${url}`, `URL:${url}`, "TRANSP:TRANSPARENT",
        "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:ARETE · ${k.label}`, "TRIGGER:PT0S", "END:VALARM", "END:VEVENT");
    });
    L.push("END:VCALENDAR");
    const fold = (l) => { let out = ""; while (l.length > 70) { out += l.slice(0, 70) + "\r\n "; l = l.slice(70); } return out + l; };
    return L.map(fold).join("\r\n") + "\r\n";
  }
  function downloadIcs() {
    const ics = buildIcs();
    const standalone = window.navigator.standalone === true || (window.matchMedia && matchMedia("(display-mode: standalone)").matches);
    if (standalone && /iP(hone|ad|od)/.test(navigator.userAgent)) {
      location.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
      return;
    }
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "arete-checkins.ics";
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
    toast("Calendar file ready. Open it to add the reminders.");
  }
  function checkinSettingsHtml() {
    const c = ciCfg();
    const notif = !("Notification" in window) ? "unsupported" : Notification.permission;
    return `
        <div class="setting-row ci-set-head"><div class="mob-text"><div class="mob-name">Daily check-ins</div>
          <div class="mob-cue">Three quick check-ins. Private, this phone only.</div></div></div>
        ${CHECKINS.map((k) => `
        <div class="setting-row ci-set">
          <div class="mob-text"><div class="mob-name">${k.label}</div></div>
          <input type="time" class="ci-time" data-ci="${k.id}" value="${esc(c.times[k.id])}" aria-label="${k.label} time">
          <input type="checkbox" class="switch ci-en" data-ci="${k.id}"${c.enabled[k.id] ? " checked" : ""} aria-label="${k.label} on">
        </div>`).join("")}
        <div class="setting-row">
          <div class="mob-text"><div class="mob-name">Check-in alerts</div>
            <div class="mob-cue">${notif === "granted" ? "On. You'll get a nudge when a check-in is due (when the phone allows it)." : notif === "denied" ? "Blocked in phone settings." : notif === "unsupported" ? "On iPhone, add ARETE to your Home Screen first, or use the calendar reminders below." : "Optional. The banner shows either way."}</div></div>
          ${notif === "default" ? `<button type="button" class="btn-heavy small" id="ci-alerts">Turn on alerts</button>` : ""}
        </div>
        <div class="setting-row ci-cal"><button type="button" class="btn-heavy" id="ci-ics">Add reminders to my calendar</button></div>`;
  }
  function wireCheckinSettings(el) {
    const c = ciCfg();
    $$(".ci-time", el).forEach((i) => i.addEventListener("change", () => { if (i.value) { c.times[i.dataset.ci] = i.value; saveDisc(); ciSchedule(); renderDiscipline(); renderCheckinBanner(); } }));
    $$(".ci-en", el).forEach((i) => i.addEventListener("change", () => { c.enabled[i.dataset.ci] = i.checked; saveDisc(); ciSchedule(); vibrate(15); renderDiscipline(); renderCheckinBanner(); }));
    const al = $("#ci-alerts", el);
    if (al) al.addEventListener("click", () => Notification.requestPermission().then(() => { ciSchedule(); renderSettings(); }).catch(() => {}));
    $("#ci-ics", el).addEventListener("click", downloadIcs);
  }

  function renderSettings() {
    const el = $("#settings-card");
    if (!el) return;
    const notif = !("Notification" in window) ? "unsupported" : Notification.permission;
    el.innerHTML = `
      <details class="lift-card mob-card">
        <summary class="lift-header mob-summary">
          <div class="lift-name">Settings</div>
          <div class="lift-target">Check-ins, timer and alerts</div>
        </summary>
        <label class="setting-row">
          <div class="mob-text">
            <div class="mob-name">Keep timer running in background</div>
            <div class="mob-cue">Rest keeps counting if you switch apps, lock the phone, or close the app.</div>
          </div>
          <input type="checkbox" class="switch" id="set-bg"${settings.bgTimer ? " checked" : ""}>
        </label>
        <div class="setting-row">
          <div class="mob-text">
            <div class="mob-name">Rest alerts</div>
            <div class="mob-cue">${notif === "granted" ? "On. You'll get a “Rest over” alert when the phone allows it." : notif === "denied" ? "Blocked in phone settings." : notif === "unsupported" ? "Add to Home Screen to enable alerts on iPhone." : "Optional. On iPhone, works from the Home Screen app."} The timer is always right when you come back.</div>
          </div>
          ${notif === "default" ? `<button type="button" class="btn-heavy small" id="set-notif">Enable</button>` : ""}
        </div>
        ${checkinSettingsHtml()}
      </details>`;
    wireCheckinSettings(el);
    $("#set-bg").addEventListener("change", (e) => {
      settings.bgTimer = e.target.checked;
      saveSettings();
      persistTimer();
      vibrate(15);
    });
    const nb = $("#set-notif");
    if (nb) nb.addEventListener("click", () => {
      Notification.requestPermission().then(() => { ciSchedule(); renderSettings(); }).catch(() => {});
    });
  }

  function showScreen(name) {
    state.screen = name;
    if (name !== "home") { const cb = document.getElementById("checkin-banner"); if (cb) { cb.hidden = true; cb.innerHTML = ""; } }
    $$(".screen").forEach((s) => s.classList.toggle("active", s.dataset.screen === name));
    window.scrollTo(0, 0);
  }

  function setHeader(title, wordmark, back) {
    $("#header-back").classList.toggle("hidden", !back);
    $("#header-title").textContent = title;
    $("#header-title").classList.toggle("wordmark", !!wordmark);
    $("#header-badge").classList.add("hidden");
    $("#header-gear").classList.toggle("hidden", !wordmark);
  }

  // The phase he's on: first week of this rotation not yet complete.
  function currentPhaseWeek(b) {
    for (let w = b.firstWeek; w <= b.lastWeek; w++) if (!isWeekComplete(w)) return w;
    return 0;
  }

  function renderHome() {
    renderStoic();
    showScreen("home");
    setHeader("ARETE", true, false);

    const b = blockInfo(state.week);
    const cur = currentPhaseWeek(b);
    setBg("hub", [cur ? "phase" + (((cur - b.firstWeek) % 3) + 1) : "phase1", "breath"]);
    const banner = $("#block-banner");
    banner.innerHTML = `
      <button type="button" class="block-nav" id="week-prev" aria-label="Previous rotation"${b.firstWeek <= 1 ? " disabled" : ""}>‹</button>
      <div class="block-text">
        <div class="block-title">Rotation ${b.block}${b.cycle > 1 ? ` <span class="rot-cycle">· Cycle ${b.cycle}</span>` : ""}</div>
      </div>
      <button type="button" class="block-nav" id="week-next" aria-label="Next rotation"${b.lastWeek >= MAX_WEEK ? " disabled" : ""}>›</button>`;
    $("#week-prev").addEventListener("click", () => { setWeek(b.firstWeek - 1); renderHome(); });
    $("#week-next").addEventListener("click", () => { setWeek(b.lastWeek + 1); renderHome(); });

    const grid = $("#day-grid");
    grid.className = "phase-grid";
    const tiles = [];
    for (let w = b.firstWeek; w <= b.lastWeek; w++) {
      const i = w - b.firstWeek + 1;
      const g = phaseGod(i);
      const done = isWeekComplete(w);
      const st = done ? "done" : w === cur ? "current" : "upcoming";
      const count = DAYS.filter((d) => isDayDone(d, w)).length;
      tiles.push(`
      <button class="phase-tile ${st}" data-week="${w}" type="button" style="--god:${g.color}">
        <span class="phase-art" style="background-image:url('${g.img}')" aria-hidden="true"></span>
        <span class="phase-num">${ROMAN[i - 1] || i}</span>
        <span class="phase-info">
          <span class="phase-name">Phase ${ROMAN[i - 1] || i} <em>${g.title}</em></span>
          <span class="phase-god">${g.god}</span>
          <span class="phase-sub">${st === "done" ? "Complete" : st === "current" ? `Now · ${count}/${DAYS.length} done` : count ? `${count}/${DAYS.length} done` : "Ahead"}</span>
        </span>
        <span class="phase-state" aria-hidden="true">${st === "done" ? "✓" : "›"}</span>
      </button>`);
    }
    grid.innerHTML = tiles.join("");
    $$(".phase-tile", grid).forEach((btn) => btn.addEventListener("click", () => openPhase(parseInt(btn.dataset.week, 10))));
    renderBreathTile();
    renderDiscipline();
    renderScreens();
    renderSettings();
    renderCheckinBanner();
  }

  function openPhase(week) {
    setWeek(week);
    history.replaceState(null, "", "#phase/" + state.week);
    renderPhase();
  }

  function renderPhase() {
    const w = state.week;
    const { roman, b } = phaseLabel(w);
    const g = phaseGod(b.weekInBlock);
    showScreen("phase");
    setHeader("Phase " + roman, false, true);
    setBg("phase" + (((b.weekInBlock - 1) % 3) + 1), ["push", "pull", "legs"]);
    const isNew = b.weekInBlock === 1 && !(b.block === 1 && b.cycle === 1);
    $("#phase-hero").innerHTML = `
      <div class="phase-hero-god">${g.god}</div>
      <h2 class="phase-hero-title">${g.title}</h2>
      <p class="phase-hero-sub">${g.sub}</p>
      <div class="phase-hero-meta">Rotation ${b.block} · Phase ${roman} of ${ROMAN[b.blockLen - 1] || b.blockLen}${isNew ? ` <span class="new-badge">New lifts!</span>` : ""}</div>`;
    const list = $("#phase-days");
    list.innerHTML = DAYS.map((d) => {
      const lifts = liftsFor(d, w);
      const done = isDayDone(d, w);
      return `
      <button class="day-card${done ? " done" : ""}" data-day="${d.id}" type="button">
        <div class="day-icon ${d.type}">${d.short}</div>
        <div class="day-info">
          <div class="name">${d.name}</div>
          <div class="meta lead">${esc(lifts[0].name)}</div>
        </div>
        <div class="day-arrow">${done ? "✓" : "›"}</div>
      </button>`;
    }).join("");
    $$(".day-card", list).forEach((btn) => btn.addEventListener("click", () => openDay(btn.dataset.day)));
  }

  function openDay(dayId) {
    state.dayId = dayId;
    const day = getDay(dayId);
    state.timer.preset = day.defaultRest;
    history.replaceState(null, "", "#session/" + dayId);
    renderSession();
  }

  // ---- Mobility rendering + its own storage (never touches LOG_KEY) ----
  function loadMob() {
    try {
      const m = JSON.parse(localStorage.getItem(MOB_KEY) || "{}");
      return m && typeof m === "object" ? m : {};
    } catch {
      return {};
    }
  }
  let mobState = loadMob();
  function mobKey(dayId, week, part, i) {
    return `${dayId}|w${week}|${part}|${i}`;
  }
  function setMob(k, on) {
    if (on) mobState[k] = true;
    else delete mobState[k];
    try { localStorage.setItem(MOB_KEY, JSON.stringify(mobState)); } catch (_) {}
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }
  function drillRow(d, k) {
    const on = !!mobState[k];
    const plan = parseHold(d.dose);
    const chip = plan ? `<button type="button" class="mt-chip${mt && mt.key === k ? " live" : ""}" data-mt-open="${esc(k)}" aria-label="Timer for ${esc(d.name)}">◷ Timer</button>` : "";
    return `
      <div class="mob-row${on ? " done" : ""}${plan ? " has-timer" : ""}" data-mob-row="${esc(k)}">
        <div class="mob-text">
          <div class="mob-name">${esc(d.name)} <span class="mob-dose">${esc(d.dose)}</span> ${chip}</div>
          <div class="mob-cue">${esc(d.cue)} ${watchHtml(d.name)}</div>
        </div>
        <button type="button" class="btn-done mob-check${on ? " checked" : ""}" data-mob="${esc(k)}" aria-label="Mark ${esc(d.name)} done">${on ? "✓" : "○"}</button>
        ${plan ? mtPanelHtml(k, d, plan) : ""}
      </div>`;
  }
  function mobCount(keys) {
    return keys.filter((k) => mobState[k]).length;
  }
  function warmupHtml(day, week) {
    const m = MOBILITY[day.id];
    if (!m) return "";
    const drills = [...m.mobilize.map((d) => ["Mobilize", d]), ...m.activate.map((d) => ["Activate", d])];
    const keys = drills.map((_, i) => mobKey(day.id, week, "warm", i));
    const done = mobCount(keys);
    let lastGroup = "";
    const rows = drills.map(([g, d], i) => {
      const head = g !== lastGroup ? `<div class="mob-group">${g === "Mobilize" ? "1 · Mobilize the stiff joints" : "2 · Activate the stabilizers"}</div>` : "";
      lastGroup = g;
      return head + drillRow(d, keys[i]);
    }).join("");
    const first = liftsFor(day, week)[0];
    return `
      <details class="lift-card mob-card ${day.type}"${done < keys.length ? " open" : ""}>
        <summary class="lift-header mob-summary">
          <div class="lift-name">Mobility warm-up <span class="mob-tag">~${m.minutes} min</span></div>
          <div class="lift-target">${esc(m.focus)} · <span class="mob-progress">${done}/${keys.length}</span> done</div>
        </summary>
        ${rows}
        <div class="mob-group">3 · Prime the pattern</div>
        <div class="mob-prime">2–3 light ramp-up sets of <strong>${esc(first.name)}</strong> before your first work set.</div>
      </details>`;
  }
  function cooldownHtml(day, week) {
    const list = COOLDOWN[day.type];
    if (!list) return "";
    const keys = list.map((_, i) => mobKey(day.id, week, "cool", i));
    const done = mobCount(keys);
    return `
      <details class="lift-card mob-card ${day.type}">
        <summary class="lift-header mob-summary">
          <div class="lift-name">Cooldown <span class="mob-tag">~5 min · optional</span></div>
          <div class="lift-target">Longer holds are fine now · <span class="mob-progress">${done}/${keys.length}</span> done</div>
        </summary>
        ${list.map((d, i) => drillRow(d, keys[i])).join("")}
      </details>`;
  }
  function betweenHtml(day, li) {
    const m = MOBILITY[day.id];
    if (!m || !m.between || m.between.lift !== li) return "";
    const d = m.between.drill;
    return `<div class="mob-between">↔ Between sets: <strong>${esc(d.name)} ${esc(d.dose)}</strong> · ${esc(d.cue)} ${watchHtml(d.name)}</div>`;
  }
  function updateMobUi(k, on) {
    $$(".mob-check").forEach((btn) => {
      if (btn.dataset.mob !== k) return;
      btn.classList.toggle("checked", on);
      btn.textContent = on ? "✓" : "○";
      btn.closest(".mob-row").classList.toggle("done", on);
      const card = btn.closest(".mob-card");
      const all = $$(".mob-check", card);
      const prog = $(".mob-progress", card);
      if (prog) prog.textContent = `${all.filter((b) => mobState[b.dataset.mob]).length}/${all.length}`;
      if (on) burst(btn);
    });
  }
  function bindMobility(root) {
    $$(".mob-check", root).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const k = btn.dataset.mob;
        const on = !mobState[k];
        setMob(k, on);
        updateMobUi(k, on);
        if (on) vibrate(20);
      });
    });
    mtRender();
  }

  // ---- Mobility hold timers: tap-to-start, timestamp-based (survives backgrounding/reload) ----
  // Doses like "30s/side", "2×20s", "2×15s/side", "60s", "1 min" get a timer; rep doses don't.
  const MT_KEY = STORAGE_PREFIX + "mobTimer";      // running timer snapshot
  const MT_PREF_KEY = STORAGE_PREFIX + "mobTimerPrefs"; // { leadIn: true }
  const MT_SWITCH = 5, MT_LEAD = 3, MT_RING = 2 * Math.PI * 52;
  function parseHold(dose) {
    const t = String(dose || "").replace(/\s+/g, " ").trim().toLowerCase();
    let m = t.match(/^(?:(\d+)\s*[×x]\s*)?(\d+)\s*s(?:ec)?(\/side)?$/);
    if (m) return { sets: +(m[1] || 1), sec: +m[2], perSide: !!m[3] };
    m = t.match(/^(?:(\d+)\s*[×x]\s*)?(\d+(?:\.\d+)?)\s*min(?:ute)?s?(\/side)?$/);
    if (m) return { sets: +(m[1] || 1), sec: Math.round(+m[2] * 60), perSide: !!m[3] };
    return null;
  }
  function mtSegments(plan, leadIn) {
    const segs = [];
    if (leadIn) segs.push({ kind: "lead", label: "Get set", sec: MT_LEAD });
    const sides = plan.perSide ? 2 : 1;
    for (let s = 1; s <= plan.sets; s++) {
      for (let side = 1; side <= sides; side++) {
        if (segs.length && segs[segs.length - 1].kind === "work") {
          segs.push({ kind: "switch", label: side === 2 ? "Switch sides" : `Reset · set ${s}`, sec: MT_SWITCH });
        }
        const parts = [];
        if (plan.sets > 1) parts.push(`Set ${s}/${plan.sets}`);
        if (sides > 1) parts.push(`Side ${side}`);
        segs.push({ kind: "work", label: parts.join(" · ") || "Hold", sec: plan.sec });
      }
    }
    return segs;
  }
  function mtPrefs() {
    try { const p = JSON.parse(localStorage.getItem(MT_PREF_KEY) || "{}"); return { leadIn: p.leadIn !== false }; } catch { return { leadIn: true }; }
  }
  function mtSavePrefs(p) { try { localStorage.setItem(MT_PREF_KEY, JSON.stringify(p)); } catch (_) {} }
  let mt = null; // { key, dose, segs, startAt, pausedAt, pausedMs, lastIdx, done }
  let mtInt = null, mtWake = null;
  try {
    const saved = JSON.parse(localStorage.getItem(MT_KEY) || "null");
    if (saved && saved.key && Array.isArray(saved.segs)) mt = saved;
  } catch (_) {}
  function mtPersist() {
    try { if (mt && !mt.done) localStorage.setItem(MT_KEY, JSON.stringify(mt)); else localStorage.removeItem(MT_KEY); } catch (_) {}
  }
  function mtTotal(segs) { return segs.reduce((a, g) => a + g.sec, 0) * 1000; }
  function mtElapsed() {
    if (!mt || !mt.startAt) return 0;
    const now = mt.pausedAt || Date.now();
    return Math.max(0, now - mt.startAt - (mt.pausedMs || 0));
  }
  function mtStatus() {
    // Which segment are we in, and how much of it is left?
    let el = mtElapsed();
    for (let i = 0; i < mt.segs.length; i++) {
      const ms = mt.segs[i].sec * 1000;
      if (el < ms) return { idx: i, left: ms - el, seg: mt.segs[i], segMs: ms };
      el -= ms;
    }
    return { idx: mt.segs.length, left: 0, seg: null, segMs: 1 };
  }
  function mtTone(kind) {
    try {
      ensureAudio();
      const ctx = audioCtx;
      if (!ctx) return;
      const t = ctx.currentTime + 0.02;
      if (kind === "tick") tone(ctx, 660, t, 0.09, 0.35);
      else if (kind === "go") tone(ctx, 1175, t, 0.22, 0.5);
      else if (kind === "switch") { tone(ctx, 880, t, 0.14, 0.5); tone(ctx, 880, t + 0.2, 0.14, 0.5); }
      else { tone(ctx, 880, t, 0.18, 0.55); tone(ctx, 1175, t + 0.22, 0.18, 0.55); tone(ctx, 1568, t + 0.44, 0.3, 0.6); }
    } catch (_) {}
  }
  async function mtWakeOn() {
    try { if ("wakeLock" in navigator && !mtWake && !document.hidden) { mtWake = await navigator.wakeLock.request("screen"); mtWake.addEventListener("release", () => { mtWake = null; }); } } catch (_) { mtWake = null; }
  }
  function mtWakeOff() { try { if (mtWake) mtWake.release(); } catch (_) {} mtWake = null; }
  function mtStart(k) {
    const row = document.querySelector(`[data-mob-row="${CSS.escape(k)}"]`);
    const dose = row ? $(".mob-dose", row).textContent : "";
    const plan = parseHold(dose);
    if (!plan) return;
    ensureAudio();
    if (mt && mt.key === k && mt.startAt && !mt.done) {
      // resume
      if (mt.pausedAt) { mt.pausedMs += Date.now() - mt.pausedAt; mt.pausedAt = 0; }
    } else {
      mt = { key: k, dose, segs: mtSegments(plan, mtPrefs().leadIn), startAt: Date.now(), pausedAt: 0, pausedMs: 0, lastIdx: -1, lastSec: -1, done: false, open: true };
    }
    if (!mt.segs.length || mt.segs[0].kind === "work") { if (mtElapsed() < 300) { mtTone("go"); vibrate(40); } }
    mtPersist(); mtWakeOn(); mtEnsureTick(); mtRender();
  }
  function mtPause() {
    if (!mt || !mt.startAt || mt.pausedAt || mt.done) return;
    mt.pausedAt = Date.now(); mtPersist(); mtWakeOff(); mtRender();
  }
  function mtReset(k) {
    if (mt && mt.key === k) { mt = { key: k, open: true, segs: [], startAt: 0 }; }
    mtWakeOff(); mtPersist(); mtRender();
  }
  function mtEnsureTick() {
    if (mtInt) return;
    mtInt = setInterval(mtTick, 200);
  }
  function mtTick() {
    if (!mt || !mt.startAt || mt.done) { clearInterval(mtInt); mtInt = null; return; }
    const st = mtStatus();
    const away = document.hidden;
    if (st.idx !== mt.lastIdx) {
      const prev = mt.lastIdx;
      mt.lastIdx = st.idx;
      if (prev !== -1 || st.idx > 0) {
        if (st.idx >= mt.segs.length) return mtFinish();
        const seg = st.seg;
        if (seg.kind === "switch") { mtTone("switch"); vibrate([90, 60, 90]); }
        else if (seg.kind === "work") { mtTone("go"); vibrate(60); }
      }
      mtPersist();
    }
    // 3-2-1 ticks at the end of lead-in / switch segments
    const secLeft = Math.ceil(st.left / 1000);
    if (!away && st.seg && st.seg.kind !== "work" && secLeft !== mt.lastSec && secLeft <= 3 && secLeft >= 1 && !mt.pausedAt) mtTone("tick");
    mt.lastSec = secLeft;
    mtRender();
  }
  function mtFinish() {
    const k = mt.key;
    mt.done = true; mt.finishedAt = Date.now();
    mtTone("done"); vibrate([120, 60, 120, 60, 200]);
    mtWakeOff(); mtPersist();
    if (!mobState[k]) { setMob(k, true); updateMobUi(k, true); }
    clearInterval(mtInt); mtInt = null;
    mtRender();
  }
  function mtPanelHtml(k, d, plan) {
    const segs = mtSegments(plan, false).filter((g) => g.kind === "work");
    const plain = `${plan.sets > 1 ? plan.sets + " sets · " : ""}${formatTime(plan.sec)}${plan.perSide ? " each side · 5s switch" : ""}`;
    const lead = mtPrefs().leadIn;
    return `
      <div class="mt-panel" data-mt="${esc(k)}" hidden>
        <div class="mt-ring-wrap">
          <svg class="mt-ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle class="mt-track" cx="60" cy="60" r="52"></circle>
            <circle class="mt-prog" cx="60" cy="60" r="52" style="stroke-dasharray:${MT_RING};stroke-dashoffset:0"></circle>
          </svg>
          <div class="mt-center">
            <div class="mt-num">${formatTime(plan.sec)}</div>
            <div class="mt-label">${esc(segs[0].label)}</div>
          </div>
        </div>
        <div class="mt-plan">${esc(plain)}</div>
        <div class="mt-steps">${mtSegments(plan, false).filter((g) => g.kind === "work").map(() => `<i></i>`).join("")}</div>
        <div class="mt-controls">
          <button type="button" class="btn-heavy mt-go" data-mt-go="${esc(k)}">Start</button>
          <button type="button" class="mt-btn" data-mt-reset="${esc(k)}">Reset</button>
          <label class="mt-lead"><input type="checkbox" data-mt-lead${lead ? " checked" : ""}> 3-2-1</label>
        </div>
      </div>`;
  }
  function mtRender() {
    $$(".mt-panel").forEach((panel) => {
      const k = panel.dataset.mt;
      const row = panel.closest(".mob-row");
      const chip = row && $(".mt-chip", row);
      const mine = mt && mt.key === k;
      panel.hidden = !(mine && mt.open);
      if (chip) {
        chip.classList.toggle("live", !!(mine && mt.startAt && !mt.done && !mt.pausedAt));
        chip.classList.toggle("open", !!(mine && mt.open));
      }
      if (!mine) return;
      const num = $(".mt-num", panel), label = $(".mt-label", panel), go = $(".mt-go", panel), ring = $(".mt-prog", panel);
      const steps = $$(".mt-steps i", panel);
      panel.classList.remove("running", "paused", "finished", "switching", "leading");
      if (!mt.startAt) {
        const plan = parseHold($(".mob-dose", row).textContent);
        num.textContent = formatTime(plan.sec);
        label.textContent = mtSegments(plan, false)[0].label;
        ring.style.strokeDashoffset = "0";
        steps.forEach((s) => s.className = "");
        go.textContent = "Start";
        return;
      }
      if (mt.done) {
        panel.classList.add("finished");
        num.textContent = "✓";
        label.textContent = "Hold complete";
        ring.style.strokeDashoffset = "0";
        steps.forEach((s) => s.className = "on");
        go.textContent = "Again";
        return;
      }
      const st = mtStatus();
      if (!st.seg) return;
      const secLeft = Math.ceil(st.left / 1000);
      num.textContent = st.seg.kind === "work" ? formatTime(secLeft) : String(secLeft);
      label.textContent = st.seg.label;
      ring.style.strokeDashoffset = String(MT_RING * (1 - st.left / st.segMs));
      panel.classList.add(mt.pausedAt ? "paused" : "running");
      if (st.seg.kind === "switch") panel.classList.add("switching");
      if (st.seg.kind === "lead") panel.classList.add("leading");
      const workBefore = mt.segs.slice(0, st.idx).filter((g) => g.kind === "work").length;
      steps.forEach((s, i) => s.className = i < workBefore ? "on" : (i === workBefore && st.seg.kind === "work" ? "now" : ""));
      go.textContent = mt.pausedAt ? "Resume" : "Pause";
    });
  }
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-mt-open]");
    if (open) {
      e.preventDefault();
      const k = open.dataset.mtOpen;
      if (mt && mt.key === k) mt.open = !mt.open;
      else if (mt && mt.startAt && !mt.done && !mt.pausedAt) { mt.open = true; mtPause(); mt = { key: k, open: true, segs: [], startAt: 0 }; }
      else mt = { key: k, open: true, segs: [], startAt: 0 };
      mtPersist(); mtRender();
      return;
    }
    const go = e.target.closest("[data-mt-go]");
    if (go) {
      e.preventDefault();
      const k = go.dataset.mtGo;
      if (mt && mt.key === k && mt.startAt && !mt.done && !mt.pausedAt) mtPause();
      else { if (mt && mt.done) mt = null; mtStart(k); }
      return;
    }
    const rs = e.target.closest("[data-mt-reset]");
    if (rs) { e.preventDefault(); mtReset(rs.dataset.mtReset); }
  });
  document.addEventListener("change", (e) => {
    if (e.target.matches("[data-mt-lead]")) {
      const p = mtPrefs(); p.leadIn = e.target.checked; mtSavePrefs(p);
      $$("[data-mt-lead]").forEach((c) => (c.checked = p.leadIn));
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (!mt || !mt.startAt || mt.done) return;
    if (!document.hidden) { mtTick(); if (!mt.pausedAt && !mt.done) { mtWakeOn(); mtEnsureTick(); } }
  });
  if (mt && mt.startAt && !mt.done) mtEnsureTick();

  function renderScreens() {
    const el = $("#screens-card");
    if (!el) return;
    el.innerHTML = `
      <details class="lift-card mob-card">
        <summary class="lift-header mob-summary">
          <div class="lift-name">Quick mobility screens</div>
          <div class="lift-target">2 min · retest every few weeks to see what's improving</div>
        </summary>
        ${SCREENS.map((s) => `
          <div class="mob-row">
            <div class="mob-text">
              <div class="mob-name">${esc(s.name)} <span class="mob-dose">${esc(s.dose)}</span></div>
              <div class="mob-cue">${esc(s.cue)} ${watchHtml(s.name)}</div>
            </div>
          </div>`).join("")}
        <div class="mob-prime">Based on <em>Rebuilding Milo</em> (Dr. Aaron Horschig, Squat University). Pain, not just stiffness? Get it checked. <a href="https://squatuniversity.com" target="_blank" rel="noopener">squatuniversity.com ›</a></div>
      </details>`;
  }

  // ---- Breath (Aeolus): tiered, hold-free breathing + guided 15:00 sessions ----
  // Own storage under arete:breath*; never touches workout logs, mobility or Discipline.
  // Timing is deadline-derived (startAt + paused ms), so it stays correct when backgrounded or reloaded.
  const BR_KEY = STORAGE_PREFIX + "breath";           // { tier, tierSince, log: [{ id, at, tier, tech, rating, counted }] }
  const BR_RUN_KEY = STORAGE_PREFIX + "breathRun";    // running session snapshot
  const BR_PREF_KEY = STORAGE_PREFIX + "breathPrefs"; // { tones, haptics, where, ease }
  const BR_BOLT_KEY = STORAGE_PREFIX + "breathBolt";  // [{ at, sec }]
  const BR_TOTAL = 900;
  const BR_MIN = 0.58, BR_MAX = 1, BR_TOP = 1.08;
  const brP = (i, o) => [{ ph: "in", s: i }, { ph: "out", s: o }];
  const brPat = (p) => (p ? p.map((x) => x.s).join("/") : "easy");
  const brPatText = (p) => {
    if (!p) return "easy natural breathing";
    if (p.length === 2) return `${p[0].s} in / ${p[1].s} out`;
    return p.map((x) => `${x.s} ${x.ph === "out" ? "out" : x.ph === "top" ? "top-up" : x.ph === "in" ? "in" : "hold"}`).join(" / ");
  };
  const BR_TIERS = [
    { n: 1, name: "Foundation", tech: "Diaphragmatic nasal breathing", short: "Belly breathing",
      why: "Slow belly breathing through the nose. Shoulders stay quiet; the belly rises first. Never force the breath.",
      segs: [{ label: "Settle", sec: 180, pat: brP(3, 3) }, { label: "Main", sec: 540, pat: brP(3, 4) }, { label: "Cooldown", sec: 180, pat: null }],
      need: { count: 5, days: 7 }, advance: "5 comfortable full sessions across at least 1 week, shoulders relaxed, no air hunger." },
    { n: 2, name: "Control", tech: "Extended exhale", short: "Long exhale",
      why: "The exhale runs longer than the inhale. Let it slow down on its own; it should never feel squeezed out.",
      segs: [{ label: "Settle", sec: 180, pat: brP(3, 4) }, { label: "Main", sec: 540, pat: brP(4, 6) }, { label: "Cooldown", sec: 180, pat: brP(3, 4) }],
      need: { count: 5, days: 7 }, advance: "5 comfortable sessions across at least 1 week, with no forced exhales or catch-up breaths." },
    { n: 3, name: "Rhythm", tech: "Coherent breathing", short: "Coherent 5/5",
      why: "Even 5-second breaths: 6 breaths a minute, a pace linked to a calmer, steadier state.",
      segs: [{ label: "Settle", sec: 180, pat: brP(3, 4) }, { label: "Main", sec: 540, pat: brP(5, 5) }, { label: "Cooldown", sec: 180, pat: brP(3, 4) }],
      need: { count: 7, days: 14 }, advance: "7 comfortable sessions across at least 2 weeks, without strain." },
    { n: 4, name: "Ease", tech: "Resonance breathing", short: "Resonance 5/6",
      why: "About 5.5 breaths a minute with a slightly longer exhale. The easier 5/5 is always one tap away.",
      segs: [{ label: "Settle", sec: 180, pat: brP(3, 4) }, { label: "Main", sec: 540, pat: brP(5, 6), alt: brP(5, 5) }, { label: "Cooldown", sec: 180, pat: brP(3, 4) }],
      need: { count: 7, days: 14 }, advance: "7 comfortable sessions across at least 2 weeks, without air hunger.",
      extra: "Optional, outside the sauna: notice light, quiet nasal breathing during the day. Never deliberately starve yourself of air." },
    { n: 5, name: "Mastery", tech: "Coherent + extended exhale", short: "5/5 then 4/6",
      why: "Half the main block at coherent 5/5, half at a long 4/6 exhale. Mastery is calm control, not extreme methods.",
      segs: [{ label: "Settle", sec: 180, pat: brP(3, 4) }, { label: "Main · Coherent", sec: 270, pat: brP(5, 5) }, { label: "Main · Long exhale", sec: 270, pat: brP(4, 6) }, { label: "Cooldown", sec: 180, pat: brP(3, 4) }],
      need: null, advance: "Top tier. Keep it: 3 to 5 sessions a week. Repeat or step down a tier any time." },
  ];
  // Free-pick techniques. sauna:false = outside the sauna only (seated or lying down), short rounds then easy breathing.
  const BR_TECH = [
    { id: "natural", name: "Easy nasal", sauna: true, pat: null, hint: "Nose in · nose out",
      desc: "No pacer. Quiet, natural breathing through the nose." },
    { id: "belly", name: "Diaphragmatic 3/4", sauna: true, pat: brP(3, 4), hint: "Belly rises · shoulders still",
      desc: "Gentle belly breathing with a slightly longer exhale." },
    { id: "exhale", name: "Extended exhale 4/6", sauna: true, pat: brP(4, 6), hint: "Nose in · slow nose out",
      desc: "Long, unforced exhale. Downshift to 3/4 if it feels tight." },
    { id: "coherent", name: "Coherent 5/5", sauna: true, pat: brP(5, 5), hint: "Nose in · nose out",
      desc: "Six even breaths a minute." },
    { id: "resonance", name: "Resonance 5/6", sauna: true, pat: brP(5, 6), hint: "Nose in · nose out",
      desc: "About 5.5 breaths a minute." },
    { id: "box", name: "Box 4-4-4-4", sauna: false, rounds: 4, hint: "Gentle holds · nothing forced",
      pat: [{ ph: "in", s: 4 }, { ph: "hold", s: 4 }, { ph: "out", s: 4 }, { ph: "hold", s: 4 }],
      desc: "4 gentle rounds, then easy breathing for the rest of the timer." },
    { id: "478", name: "4-7-8", sauna: false, rounds: 4, hint: "Nose in · mouth out",
      pat: [{ ph: "in", s: 4 }, { ph: "hold", s: 7 }, { ph: "out", s: 8 }],
      desc: "4 rounds only, then easy breathing. Shorten the counts if the hold feels hard." },
    { id: "sigh", name: "Cyclic sighing", sauna: false, minutes: 5, hint: "Two nose inhales · long mouth exhale",
      pat: [{ ph: "in", s: 2 }, { ph: "top", s: 1 }, { ph: "out", s: 6 }],
      desc: "5 minutes of slow sighs, then gentle easy breathing. Not 15 minutes of big breaths." },
  ];
  const BR_STOIC = [
    ["Confine yourself to the present.", "Marcus Aurelius"],
    ["Nowhere can a man find a quieter or more untroubled retreat than in his own soul.", "Marcus Aurelius"],
    ["Very little is needed to make a happy life; it is all within yourself.", "Marcus Aurelius"],
    ["Withdraw into yourself, as far as you can.", "Seneca"],
    ["It is the power of the mind to be unconquerable.", "Seneca"],
    ["No man is free who is not master of himself.", "Epictetus"],
    ["No great thing is created suddenly.", "Epictetus"],
    ["We should train ourselves, not with many lessons, but with constant practice.", "Musonius Rufus"],
    ["The happiness of your life depends upon the quality of your thoughts.", "Marcus Aurelius"],
  ];
  const BR_SAFETY = "Stop pacing and breathe normally if you feel dizzy, tingly, short of air or uncomfortable. Hydrate, and leave the sauna if you feel unwell.";

  function brLoad() {
    try {
      const s = JSON.parse(localStorage.getItem(BR_KEY) || "{}");
      return { tier: s.tier >= 1 && s.tier <= 5 ? s.tier : 1, tierSince: s.tierSince || 0, log: Array.isArray(s.log) ? s.log : [] };
    } catch { return { tier: 1, tierSince: 0, log: [] }; }
  }
  let brState = brLoad();
  function brSave() { try { localStorage.setItem(BR_KEY, JSON.stringify(brState)); } catch (_) {} }
  const brNum = (v, d) => { v = parseFloat(v); return v >= 0 && v <= 1 ? v : d; };
  function brPrefs() {
    try {
      const p = JSON.parse(localStorage.getItem(BR_PREF_KEY) || "{}");
      const v2 = p.v === 2; // v2 = sound on by default (older saved flags were silent-by-default)
      return {
        v: 2,
        tones: v2 ? p.tones !== false : true,
        music: v2 ? p.music !== false : true,
        voice: v2 ? !!p.voice : false,
        haptics: v2 ? p.haptics !== false : true,
        musicVol: brNum(p.musicVol, 0.7),
        cueVol: brNum(p.cueVol, 0.8),
        where: p.where === "outside" ? "outside" : "sauna",
        ease: !!p.ease,
      };
    } catch { return { v: 2, tones: true, music: true, voice: false, haptics: true, musicVol: 0.7, cueVol: 0.8, where: "sauna", ease: false }; }
  }
  function brSavePrefs(p) { try { localStorage.setItem(BR_PREF_KEY, JSON.stringify(p)); } catch (_) {} }
  function brBolt() { try { const b = JSON.parse(localStorage.getItem(BR_BOLT_KEY) || "[]"); return Array.isArray(b) ? b : []; } catch { return []; } }
  function brSaveBolt(b) { try { localStorage.setItem(BR_BOLT_KEY, JSON.stringify(b.slice(-60))); } catch (_) {} }

  let brRun = null;
  try { const r = JSON.parse(localStorage.getItem(BR_RUN_KEY) || "null"); if (r && r.id && Array.isArray(r.segs)) brRun = r; } catch (_) {}
  function brPersistRun() { try { if (brRun) localStorage.setItem(BR_RUN_KEY, JSON.stringify(brRun)); else localStorage.removeItem(BR_RUN_KEY); } catch (_) {} }

  const dayStart = (ts) => { const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime(); };
  function brProgress() {
    const t = BR_TIERS[brState.tier - 1];
    const c = brState.log.filter((e) => e.counted && e.tier === brState.tier && e.at >= (brState.tierSince || 0));
    const count = c.length;
    const span = count ? Math.round((dayStart(Math.max(...c.map((e) => e.at))) - dayStart(Math.min(...c.map((e) => e.at)))) / 86400000) + 1 : 0;
    const week = brState.log.filter((e) => e.counted && e.at >= Date.now() - 7 * 86400000).length;
    const eligible = !!t.need && count >= t.need.count && span >= t.need.days;
    return { t, count, span, week, eligible };
  }
  function brSetTier(n) {
    n = Math.max(1, Math.min(5, n));
    if (n > brState.tier + 1 || (n === brState.tier + 1 && !brProgress().eligible)) return false; // no skipping ahead
    if (n === brState.tier) return true;
    brState.tier = n;
    brState.tierSince = Date.now();
    brSave();
    return true;
  }

  // ---- session building + clock ----
  function brTierSegs(tier, ease) {
    return BR_TIERS[tier - 1].segs.map((g) => ({ label: g.label, sec: g.sec, pat: ease && g.alt ? g.alt : g.pat, alt: ease ? null : g.alt || null }));
  }
  function brFreeSegs(tech) {
    if (tech.rounds) {
      const cyc = tech.pat.reduce((a, x) => a + x.s, 0) * tech.rounds;
      return [{ label: "Settle", sec: 120, pat: brP(3, 4) }, { label: `${tech.name} · ${tech.rounds} rounds`, sec: cyc, pat: tech.pat }, { label: "Easy breathing", sec: BR_TOTAL - 120 - cyc, pat: null }];
    }
    if (tech.minutes) return [{ label: "Settle", sec: 60, pat: brP(3, 4) }, { label: tech.name, sec: tech.minutes * 60, pat: tech.pat }, { label: "Easy breathing", sec: BR_TOTAL - 60 - tech.minutes * 60, pat: null }];
    if (!tech.pat) return [{ label: "Easy nasal", sec: BR_TOTAL, pat: null }];
    return [{ label: "Settle", sec: 120, pat: brP(3, 4) }, { label: "Main", sec: 660, pat: tech.pat }, { label: "Cooldown", sec: 120, pat: null }];
  }
  function brElapsed(r = brRun) {
    if (!r || !r.startAt) return 0;
    const now = r.pausedAt || Date.now();
    return Math.max(0, Math.min(BR_TOTAL * 1000, now - r.startAt - (r.pausedMs || 0)));
  }
  function brStatus(r = brRun, el = brElapsed(r)) {
    let t = el, start = 0;
    for (let i = 0; i < r.segs.length; i++) {
      const seg = r.segs[i], ms = seg.sec * 1000;
      if (t < ms) {
        let pat = seg.pat, pt = t;
        if (seg.alt && r.easeAt != null && r.easeAt - start <= t) { pat = seg.alt; pt = t - Math.max(0, r.easeAt - start); }
        const ph = brPhase(pat, pt);
        return { i, seg, segLeft: ms - t, pat, ph, left: BR_TOTAL * 1000 - el };
      }
      t -= ms; start += ms;
    }
    return null;
  }
  const easeIO = (x) => 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, x)));
  function brPhase(pat, t) {
    if (!pat) {
      // Natural breathing: slow, gentle drift, no counts.
      const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * t) / 9000);
      return { ph: "easy", key: "easy", count: 0, len: 0, scale: BR_MIN + (BR_MAX - BR_MIN) * 0.5 * w };
    }
    const cyc = pat.reduce((a, x) => a + x.s, 0) * 1000;
    const n = Math.floor(t / cyc);
    let pos = t - n * cyc, from = BR_MIN;
    for (let k = 0; k < pat.length; k++) {
      const p = pat[k], ms = p.s * 1000;
      const to = p.ph === "in" ? BR_MAX : p.ph === "top" ? BR_TOP : p.ph === "out" ? BR_MIN : from;
      if (pos < ms) {
        const f = pos / ms;
        return { ph: p.ph, key: n + ":" + k, count: Math.min(p.s, Math.floor(pos / 1000) + 1), len: p.s, f, scale: from + (to - from) * easeIO(f) };
      }
      pos -= ms; from = to;
    }
    return { ph: "out", key: n + ":end", count: 0, len: 0, scale: BR_MIN };
  }
  const BR_CUE = { in: "Inhale", top: "Top up", hold: "Hold", out: "Exhale", easy: "Breathe easy" };

  // ---- breath audio: ambient bed + pacer cues + optional voice + haptics ----
  // Everything is generated with Web Audio (no external tracks). Started from the Start/Resume tap so iOS lets it play.
  let brAmb = null, brSilentEl = null, brSilentUrl = "", brVoiceReady = false, brSndShown = "";
  const brCanVibrate = () => typeof navigator.vibrate === "function";
  const brCanSpeak = () => "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";

  function brSilentWav() {
    if (brSilentUrl) return brSilentUrl;
    const sr = 8000, n = sr, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
    const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    w(0, "RIFF"); v.setUint32(4, 36 + n * 2, true); w(8, "WAVE"); w(12, "fmt "); v.setUint32(16, 16, true);
    v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true);
    v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, "data"); v.setUint32(40, n * 2, true);
    for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, i % 50 === 0 ? 1 : 0, true); // inaudible, but not pure digital silence
    brSilentUrl = URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
    return brSilentUrl;
  }
  // iOS: a playing <audio> element + audioSession "playback" lets Web Audio sound through the ringer switch.
  function brMediaOn() {
    try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (_) {}
    try {
      if (!brSilentEl) {
        brSilentEl = new Audio();
        brSilentEl.src = brSilentWav();
        brSilentEl.loop = true;
        brSilentEl.setAttribute("playsinline", "");
        brSilentEl.setAttribute("aria-hidden", "true");
      }
      const pr = brSilentEl.play();
      if (pr && pr.catch) pr.catch(() => {});
    } catch (_) {}
    try {
      if ("mediaSession" in navigator && window.MediaMetadata) {
        navigator.mediaSession.metadata = new MediaMetadata({ title: "Breath session", artist: "ARETE" });
        navigator.mediaSession.setActionHandler("pause", () => { if (brRun && !brRun.done && !brRun.pausedAt) brPause(); });
        navigator.mediaSession.setActionHandler("play", () => { if (brRun && !brRun.done && brRun.pausedAt) brPause(); });
      }
    } catch (_) {}
  }
  function brMediaOff() {
    try { if (brSilentEl) brSilentEl.pause(); } catch (_) {}
    try { if (navigator.audioSession) navigator.audioSession.type = "auto"; } catch (_) {}
    try { if ("mediaSession" in navigator) { navigator.mediaSession.metadata = null; navigator.mediaSession.setActionHandler("pause", null); navigator.mediaSession.setActionHandler("play", null); } } catch (_) {}
  }
  function brVoiceUnlock() {
    if (brVoiceReady || !brCanSpeak()) return;
    try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; speechSynthesis.speak(u); brVoiceReady = true; } catch (_) {}
  }
  function brSpeak(text) {
    if (!brCanSpeak()) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.82; u.pitch = 0.85; u.volume = Math.max(0.15, brNum(brPrefs().cueVol, 0.8));
      speechSynthesis.speak(u);
    } catch (_) {}
  }
  function brCueGain() { const v = brNum(brPrefs().cueVol, 0.8); return 0.28 * v * v; }
  function brAmbLevel() { const v = brNum(brPrefs().musicVol, 0.7); return v * v; }

  function brNoiseBuf(ctx) {
    const len = ctx.sampleRate * 6, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; } // brown-ish noise
    const fade = 2000; // loop-safe edges
    for (let i = 0; i < fade; i++) { const k = i / fade; d[i] *= k; d[len - 1 - i] *= k; }
    return b;
  }
  // Warm, slowly evolving pad: open fifths with detuned pairs, slow swells, soft filtered noise "air".
  function brAmbStart() {
    if (!brPrefs().music) return;
    ensureAudio();
    const ctx = audioCtx;
    if (!ctx) return;
    if (brAmb) {
      try { const t = ctx.currentTime; brAmb.master.gain.cancelScheduledValues(t); brAmb.master.gain.setValueAtTime(brAmb.master.gain.value, t); brAmb.master.gain.linearRampToValueAtTime(brAmbLevel(), t + 1.5); } catch (_) {}
      return;
    }
    try {
      const t = ctx.currentTime, srcs = [];
      const master = ctx.createGain(); master.gain.setValueAtTime(0.0001, t); master.gain.linearRampToValueAtTime(brAmbLevel(), t + 4);
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 850; lp.Q.value = 0.5;
      lp.connect(master); master.connect(ctx.destination);
      const lfo = (rate, depth, param, phase) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "sine"; o.frequency.value = rate; g.gain.value = depth;
        o.connect(g); g.connect(param); o.start(t + (phase || 0)); srcs.push(o);
      };
      const notes = [[73.42, 0.30], [110, 0.24], [146.83, 0.2], [220, 0.16], [293.66, 0.12], [369.99, 0.07], [440, 0.05]];
      notes.forEach(([f, a], i) => {
        const vg = ctx.createGain(); vg.gain.value = a * 0.62 * 0.17; vg.connect(lp);
        lfo(0.035 + i * 0.011, a * 0.38 * 0.17, vg.gain, i * 1.7);
        [-6, 5].forEach((cents) => {
          const o = ctx.createOscillator(); o.type = i < 2 ? "triangle" : "sine"; o.frequency.value = f; o.detune.value = cents;
          o.connect(vg); o.start(t); srcs.push(o);
        });
      });
      lfo(0.045, 220, lp.frequency, 0);
      const nz = ctx.createBufferSource(); nz.buffer = brNoiseBuf(ctx); nz.loop = true;
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 420; bp.Q.value = 0.6;
      const ng = ctx.createGain(); ng.gain.value = 0.05;
      nz.connect(bp); bp.connect(ng); ng.connect(lp); nz.start(t); srcs.push(nz);
      lfo(0.07, 0.03, ng.gain, 0);
      brAmb = { master, lp, srcs };
    } catch (_) { brAmb = null; }
  }
  function brAmbStop(fade = 2) {
    const a = brAmb;
    if (!a) return;
    brAmb = null;
    try {
      const ctx = audioCtx, t = ctx.currentTime;
      a.master.gain.cancelScheduledValues(t); a.master.gain.setValueAtTime(Math.max(0.0001, a.master.gain.value), t);
      a.master.gain.linearRampToValueAtTime(0.0001, t + fade);
      setTimeout(() => { a.srcs.forEach((s) => { try { s.stop(); } catch (_) {} }); try { a.master.disconnect(); } catch (_) {} }, fade * 1000 + 150);
    } catch (_) {}
  }
  function brAmbSwell(ph, lenSec) {
    if (!brAmb || !audioCtx) return;
    try {
      const t = audioCtx.currentTime, f = brAmb.lp.frequency;
      const target = ph === "in" || ph === "top" ? 1500 : ph === "out" ? 650 : null;
      if (target) { f.cancelScheduledValues(t); f.setValueAtTime(f.value, t); f.setTargetAtTime(target, t, Math.max(0.6, lenSec / 3)); }
    } catch (_) {}
  }

  // One soft cue per breath phase: rising for inhale, level for hold, falling for exhale.
  function brTone(freq0, freq1, dur, vol, delay) {
    try {
      const ctx = audioCtx;
      if (!ctx) return;
      const t = ctx.currentTime + 0.03 + (delay || 0);
      const g = ctx.createGain(), o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o1.type = "sine"; o2.type = "sine";
      o1.frequency.setValueAtTime(freq0, t); o1.frequency.linearRampToValueAtTime(freq1, t + dur);
      o2.frequency.setValueAtTime(freq0 * 2, t); o2.frequency.linearRampToValueAtTime(freq1 * 2, t + dur);
      g2.gain.value = 0.3; // octave overtone so small phone speakers can reproduce it
      o1.connect(g); o2.connect(g2); g2.connect(g); g.connect(ctx.destination);
      const a = Math.min(0.3, dur * 0.35), r = Math.min(0.6, dur * 0.45);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(vol, t + a);
      g.gain.setValueAtTime(vol, t + Math.max(a, dur - r));
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
      o1.start(t); o2.start(t); o1.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
    } catch (_) {}
  }
  const BR_SAY = { in: "Breathe in", top: "A little more", hold: "Hold", out: "Breathe out" };
  function brCueFx(phObj) {
    const ph = typeof phObj === "string" ? phObj : phObj.ph;
    const len = typeof phObj === "string" ? 0 : phObj.len || 0;
    const lag = typeof phObj === "string" ? 0 : (phObj.f || 0) * len; // seconds already elapsed in this phase
    const p = brPrefs();
    ensureAudio();
    if (p.tones && audioCtx) {
      const dur = Math.max(0.5, Math.min(2.6, (len || 3) - lag - 0.1)), v = brCueGain();
      if (ph === "in") brTone(392, 523.25, dur, v);
      else if (ph === "top") brTone(587.33, 659.25, Math.min(dur, 0.8), v * 0.9);
      else if (ph === "out") brTone(523.25, 392, dur, v);
      else if (ph === "hold") brTone(440, 440, Math.min(dur, 0.9), v * 0.6);
    }
    if (p.voice && BR_SAY[ph]) brSpeak(BR_SAY[ph]);
    if (p.music && ph !== "easy" && len) brAmbSwell(ph, Math.max(1, len - lag));
    if (p.haptics) vibrate(ph === "in" ? 30 : ph === "out" ? [15, 70, 15] : 10);
  }
  function brChime() {
    const p = brPrefs();
    ensureAudio();
    if (p.tones && audioCtx) { const v = brCueGain(); brTone(523.25, 523.25, 1.6, v); brTone(783.99, 783.99, 2.2, v * 0.8, 0.35); }
    if (p.voice) brSpeak("Session complete");
    if (p.haptics) vibrate([40, 80, 40]);
  }
  // Session-level helpers (call from a tap: Start, Resume, Test)
  function brAudioStart() {
    brMediaOn(); ensureAudio(); brVoiceUnlock(); brAmbStart();
  }
  function brAudioPause() { brAmbStop(1.2); try { if (brCanSpeak()) speechSynthesis.cancel(); } catch (_) {} brMediaOff(); }
  function brAudioEnd(fade) { brAmbStop(fade || 2); try { if (brCanSpeak()) speechSynthesis.cancel(); } catch (_) {} setTimeout(() => { if (!brAmb) brMediaOff(); }, (fade || 2) * 1000 + 300); }
  function brAudioKick() { // any tap on a live session: recover after reload / interruption
    if (!brRun || brRun.done || brRun.pausedAt) return;
    brMediaOn(); ensureAudio();
    if (!brAmb) brAmbStart();
  }
  function brTestSound() {
    brMediaOn(); ensureAudio(); brVoiceUnlock();
    const p = brPrefs(), v = Math.max(brCueGain(), 0.12);
    brTone(392, 523.25, 1.4, v); brTone(440, 440, 0.6, v * 0.6, 1.6); brTone(523.25, 392, 1.4, v, 2.4);
    if (p.voice) { brSpeak("Breathe in"); }
    if (!(brRun && !brRun.done && !brRun.pausedAt)) setTimeout(brMediaOff, 4500);
    setTimeout(() => toast(audioCtx && audioCtx.state === "running" ? "Test played. If silent: raise media volume with the side buttons." : "Audio is blocked. Tap Test sound again."), 300);
  }
  function brOnPref(el) {
    const k = el.dataset.brPref, p = brPrefs();
    p[k] = el.checked; brSavePrefs(p);
    if (el.checked) { ensureAudio(); if (k === "voice") brVoiceUnlock(); }
    const live = brRun && !brRun.done && !brRun.pausedAt;
    if (k === "music" && live) { if (el.checked) { brMediaOn(); brAmbStart(); } else brAmbStop(1); }
    if (k === "voice" && !el.checked) { try { if (brCanSpeak()) speechSynthesis.cancel(); } catch (_) {} }
    if (k === "haptics" && el.checked) vibrate(30);
    document.querySelectorAll(`[data-br-pref="${k}"]`).forEach((x) => { x.checked = el.checked; });
    if (k === "ease") renderBreath();
  }
  function brOnVol(el) {
    const p = brPrefs(); p[el.dataset.brVol] = Math.max(0, Math.min(1, parseFloat(el.value) / 100)); brSavePrefs(p);
    document.querySelectorAll(`[data-br-vol="${el.dataset.brVol}"]`).forEach((x) => { if (x !== el) x.value = el.value; });
    if (brAmb && audioCtx) { try { brAmb.master.gain.cancelScheduledValues(audioCtx.currentTime); brAmb.master.gain.setTargetAtTime(Math.max(0.0001, brAmbLevel()), audioCtx.currentTime, 0.05); } catch (_) {} }
  }
  function brSoundHtml(pr) {
    const hap = brCanVibrate(), say = brCanSpeak();
    return `
      <div class="br-sound">
        <label class="br-check"><input type="checkbox" data-br-pref="music"${pr.music ? " checked" : ""}> Ambient music</label>
        <input class="br-range" type="range" min="0" max="100" step="5" value="${Math.round(pr.musicVol * 100)}" data-br-vol="musicVol" aria-label="Music volume">
        <label class="br-check"><input type="checkbox" data-br-pref="tones"${pr.tones ? " checked" : ""}> Breath tones (rise · level · fall)</label>
        <input class="br-range" type="range" min="0" max="100" step="5" value="${Math.round(pr.cueVol * 100)}" data-br-vol="cueVol" aria-label="Cue volume">
        <label class="br-check"><input type="checkbox" data-br-pref="voice"${pr.voice ? " checked" : ""}${say ? "" : " disabled"}> Spoken cues (&ldquo;Breathe in&rdquo;, &ldquo;Hold&rdquo;, &ldquo;Breathe out&rdquo;)</label>
        <label class="br-check"><input type="checkbox" data-br-pref="haptics"${pr.haptics && hap ? " checked" : ""}${hap ? "" : " disabled"}> Haptic pulse${hap ? "" : " (not available on this device)"}</label>
        <button type="button" class="mt-btn br-test" data-br-test>Test sound</button>
        <p class="br-note">Sound is the main cue. iPhone web apps can't vibrate, so haptics work on Android only. Turn up media volume with the side buttons; sessions ask the phone to play even with the ringer on silent.</p>
      </div>`;
  }
  function brSndState() {
    const el = document.getElementById("br-snd-state");
    if (!el) return;
    const p = brPrefs(), any = p.music || p.tones || p.voice;
    let s;
    if (!any) s = "Sound off";
    else if (!(window.AudioContext || window.webkitAudioContext)) s = "Audio isn't supported in this browser";
    else if (!audioCtx || audioCtx.state !== "running") s = "Sound paused · tap the screen to enable";
    else s = "Sound on" + (p.music && !brAmb ? " · tap to start music" : "");
    if (s !== brSndShown) { brSndShown = s; el.textContent = s; }
  }

  // ---- wake lock ----
  let brWake = null;
  async function brWakeOn() {
    try { if ("wakeLock" in navigator && !brWake && !document.hidden) { brWake = await navigator.wakeLock.request("screen"); brWake.addEventListener("release", () => { brWake = null; }); } } catch (_) { brWake = null; }
  }
  function brWakeOff() { try { if (brWake) brWake.release(); } catch (_) {} brWake = null; }

  // ---- run control ----
  let brTileTick = 0, brInt = null, brRaf = 0, brLastWall = 0, brLastKey = "", brConfirmEnd = false, brResult = null;
  function brNewId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function brStartTier(tier) {
    if (brRun && !brRun.done) return openBreathRun();
    const t = BR_TIERS[tier - 1];
    const ease = t.n === 4 && brPrefs().ease;
    brBegin({ kind: "tier", tier: t.n, tech: t.tech, title: t.tech, kicker: `Tier ${ROMAN[t.n - 1]} · ${t.name}`, sauna: true, segs: brTierSegs(t.n, ease), hint: "Nose in · nose out · nothing forced" });
  }
  function brStartFree(id, ack) {
    if (brRun && !brRun.done) return openBreathRun();
    const tech = BR_TECH.find((x) => x.id === id);
    if (!tech) return;
    const where = brPrefs().where;
    if (!tech.sauna && (where === "sauna" || !ack)) { toast("Outside-the-sauna method: switch to Outside and confirm you're seated or lying down."); return; }
    brBegin({ kind: "free", tier: 0, tech: tech.id, title: tech.name, kicker: tech.sauna ? "Free pick · hold-free" : "Free pick · outside the sauna", sauna: tech.sauna, segs: brFreeSegs(tech), hint: tech.hint });
  }
  function brBegin(o) {
    brAudioStart();
    brRun = Object.assign(o, { id: brNewId(), startAt: Date.now(), pausedAt: 0, pausedMs: 0, easeAt: null, done: false, quote: Math.floor(Math.random() * BR_STOIC.length) });
    brResult = null; brLastKey = ""; brLastWall = Date.now();
    brPersistRun(); brWakeOn(); brEnsureTick();
    openBreathRun();
    const st0 = brStatus();
    if (st0 && st0.ph.ph !== "easy") { brLastKey = st0.i + "|" + st0.ph.key + "|" + brPat(st0.pat); brCueFx(st0.ph); }
  }
  function brPause() {
    if (!brRun || brRun.done) return;
    if (brRun.pausedAt) { brRun.pausedMs += Date.now() - brRun.pausedAt; brRun.pausedAt = 0; brWakeOn(); brLastWall = Date.now(); brAudioStart(); }
    else { brRun.pausedAt = Date.now(); brWakeOff(); brAudioPause(); }
    brPersistRun(); brPaint();
  }
  function brEase() {
    if (!brRun || brRun.done || brRun.easeAt != null) return;
    brRun.easeAt = brElapsed(); brPersistRun(); brPaint(); toast("Eased to 5/5. Same session, still counts.");
  }
  function brEnd() {
    if (!brRun) return;
    if (!brRun.done) {
      if (!brConfirmEnd) { brConfirmEnd = true; brPaint(); setTimeout(() => { brConfirmEnd = false; if (state.screen === "breathrun") brPaint(); }, 3000); return; }
      brLogEntry("stopped");
      toast("Stopped early. Doesn't count, and that's fine. Never push through discomfort.");
    }
    brConfirmEnd = false;
    brAudioEnd(1.5);
    brRun = null; brPersistRun(); brWakeOff(); brStopTick();
    openBreath();
  }
  function brLogEntry(rating) {
    if (!brRun) return null;
    if (brState.log.some((e) => e.id === brRun.id)) return null; // one completion per session id
    const counted = brRun.kind === "tier" && rating === "ok" && brRun.done && brRun.tier === brState.tier;
    const e = { id: brRun.id, at: Date.now(), tier: brRun.tier, tech: brRun.tech, rating, counted, ease: brRun.easeAt != null || undefined };
    brState.log.push(e);
    if (brState.log.length > 400) brState.log = brState.log.slice(-400);
    brSave();
    return e;
  }
  function brRate(rating) {
    if (!brRun || !brRun.done) return;
    const before = brProgress().eligible;
    const e = brLogEntry(rating);
    const p = brProgress();
    brResult = { rating, counted: !!(e && e.counted), kind: brRun.kind, tier: brRun.tier, quote: brRun.quote, eligibleNow: p.eligible && !before };
    brRun = null; brPersistRun(); brStopTick();
    brPaint();
  }
  function brComplete(live) {
    if (!brRun || brRun.done) return;
    brRun.done = true; brRun.doneAt = Date.now();
    brPersistRun(); brWakeOff();
    if (live) brChime();
    brAudioEnd(3);
    brPaint();
    if (state.screen === "home") renderBreathTile();
    else if (state.screen === "breath") { const y = window.scrollY; renderBreath(); window.scrollTo(0, y); }
  }
  function brEnsureTick() { if (!brInt) brInt = setInterval(brTick, 100); if (!brRaf) brRaf = requestAnimationFrame(brFrame); }
  function brStopTick() { clearInterval(brInt); brInt = null; if (brRaf) cancelAnimationFrame(brRaf); brRaf = 0; }
  function brTick() {
    if (!brRun || brRun.done) { if (!brRun) brStopTick(); return; }
    const now = Date.now();
    // Only cue when ticking live; after a background gap or reload, re-sync silently (no catch-up storm).
    const live = !document.hidden && now - brLastWall < 1200;
    brLastWall = now;
    if (brElapsed() >= BR_TOTAL * 1000) return brComplete(live);
    if (brRun.pausedAt) return;
    const st = brStatus();
    if (!st) return;
    const key = st.i + "|" + st.ph.key + "|" + (st.pat ? brPat(st.pat) : "");
    if (key !== brLastKey) { if (brLastKey && live && st.ph.ph !== "easy") brCueFx(st.ph); brLastKey = key; }
    if (state.screen === "breathrun") brPaintText(st);
    else if (state.screen === "home" && Math.floor(now / 5000) !== brTileTick) { brTileTick = Math.floor(now / 5000); renderBreathTile(); }
  }
  function brFrame() {
    brRaf = 0;
    if (!brRun || brRun.done) return;
    if (state.screen === "breathrun" && !document.hidden) {
      const st = brStatus();
      const orb = document.getElementById("br-orb");
      if (st && orb) orb.style.transform = `scale(${st.ph.scale.toFixed(4)})`;
    }
    brRaf = requestAnimationFrame(brFrame);
  }
  document.addEventListener("visibilitychange", () => {
    if (!brRun || brRun.done) return;
    if (document.hidden) { brPersistRun(); return; }
    brLastWall = 0; // force a silent resync
    try { if (audioCtx && audioCtx.state !== "running") audioCtx.resume().catch(() => {}); } catch (_) {}
    brTick();
    if (brRun && !brRun.done) { if (!brRun.pausedAt) brWakeOn(); brEnsureTick(); }
  });
  window.addEventListener("pageshow", () => { if (brRun && !brRun.done) { brLastWall = 0; brTick(); } });
  if (brRun && !brRun.done) { brLastWall = 0; brEnsureTick(); }

  // ---- screens ----
  function openBreath() {
    history.replaceState(null, "", "#breath");
    renderBreath();
  }
  function openBreathRun() {
    history.replaceState(null, "", "#breath/session");
    renderBreathRun();
  }
  function renderBreathTile() {
    const el = document.getElementById("breath-tile");
    if (!el) return;
    const p = brProgress();
    let sub;
    if (brRun && !brRun.done) sub = `Session live · ${formatTime(Math.ceil((BR_TOTAL * 1000 - brElapsed()) / 1000))} left${brRun.pausedAt ? " · paused" : ""}`;
    else if (brRun && brRun.done) sub = "Session complete · rate it";
    else sub = `Tier ${ROMAN[p.t.n - 1]} · ${p.t.name} · ` + (p.t.need ? `${Math.min(p.count, p.t.need.count)}/${p.t.need.count} sessions` : `${p.week} this week`);
    const live = brRun ? " live" : "";
    el.innerHTML = `
      <button class="phase-tile breath-tile${live}" id="open-breath" type="button" style="--god:${GODS.breath.color}">
        <span class="phase-art" style="background-image:url('${GODS.breath.img}')" aria-hidden="true"></span>
        <span class="phase-num breath-num" aria-hidden="true">≋</span>
        <span class="phase-info">
          <span class="phase-name">Breath <em>${GODS.breath.title}</em></span>
          <span class="phase-god">${GODS.breath.god}</span>
          <span class="phase-sub">${esc(sub)}</span>
        </span>
        <span class="phase-state" aria-hidden="true">›</span>
      </button>`;
    $("#open-breath", el).addEventListener("click", () => (brRun ? openBreathRun() : openBreath()));
  }
  function brSegLine(segs) {
    return segs.map((g) => `<span><b>${esc(g.label)}</b> ${formatTime(g.sec)} · ${esc(brPatText(g.pat))}${g.alt ? ` <em>(or ${esc(brPatText(g.alt))})</em>` : ""}</span>`).join("");
  }
  function brBoltHtml() {
    const b = brBolt();
    const last = b.slice(-8);
    const max = Math.max(10, ...last.map((x) => x.sec));
    const avg = (arr) => (arr.length ? Math.round(arr.reduce((a, x) => a + x.sec, 0) / arr.length) : 0);
    const recent = b.filter((x) => x.at >= Date.now() - 7 * 86400000);
    return `
      <details class="lift-card mob-card br-card" id="br-bolt"${brBoltOpen ? " open" : ""}>
        <summary class="lift-header mob-summary">
          <div class="lift-name">BOLT log <span class="mob-tag">optional</span></div>
          <div class="lift-target">A comfortable-pause trend. Not a test, not required to advance.</div>
        </summary>
        <div class="br-pad">
          <ol class="br-steps-list">
            <li>Outside the sauna, cooled down, seated and at rest. No deep or fast breaths first.</li>
            <li>Breathe in and out normally. After a normal exhale, pinch your nose and start.</li>
            <li>Stop at the <b>first</b> clear urge to breathe, not your max. Release and breathe normally.</li>
            <li>If you gasp afterward, you went too long. Skip it if unsure or unwell.</li>
          </ol>
          <div class="br-bolt-run">
            <div class="br-bolt-num" id="br-bolt-num">${brBoltStart ? "0" : "–"}<small>sec</small></div>
            <button type="button" class="btn-heavy br-btn" data-br-act="bolt">${brBoltStart ? "Stop · first urge" : "Start pause"}</button>
          </div>
          <div class="br-bolt-manual">
            <input type="number" inputmode="numeric" min="1" max="120" id="br-bolt-in" placeholder="or type seconds" aria-label="BOLT seconds">
            <button type="button" class="mt-btn" data-br-act="bolt-save">Log</button>
          </div>
          ${last.length ? `
          <div class="br-bolt-stats"><span>Last <b>${last[last.length - 1].sec}s</b></span><span>7-day avg <b>${avg(recent) || "–"}${recent.length ? "s" : ""}</b></span><span>Entries <b>${b.length}</b></span></div>
          <div class="br-bars" aria-label="Recent BOLT entries">${last.map((x, i) => `<div class="br-bar" title="${new Date(x.at).toLocaleDateString()}"><i style="height:${Math.round((x.sec / max) * 100)}%"></i><span>${x.sec}</span><button type="button" class="br-x" data-br-bolt-del="${b.length - last.length + i}" aria-label="Delete entry">×</button></div>`).join("")}</div>` : `<p class="br-note">No entries yet. Once a week is plenty.</p>`}
        </div>
      </details>`;
  }
  let brBoltOpen = false, brFreeOpen = false, brBoltStart = 0, brBoltInt = null, brAck = false;
  function renderBreath() {
    showScreen("breath");
    setHeader("Breath", false, true);
    setBg("breath");
    const p = brProgress();
    const t = p.t;
    const pr = brPrefs();
    const need = t.need;
    const pct = need ? Math.min(100, Math.round((Math.min(p.count, need.count) / need.count) * 100)) : Math.min(100, Math.round((Math.min(p.week, 5) / 5) * 100));
    const live = brRun && !brRun.done;
    const where = pr.where;
    const recent = brState.log.slice(-4).reverse();
    $("#breath-body").innerHTML = `
      <div class="phase-hero br-hero">
        <div class="phase-hero-god">${GODS.breath.god}</div>
        <h2 class="phase-hero-title">${GODS.breath.title}</h2>
        <p class="phase-hero-sub">${GODS.breath.sub}</p>
        <div class="phase-hero-meta">Calm · focus · breath control · recovery</div>
      </div>
      ${live || (brRun && brRun.done) ? `<button type="button" class="br-live" data-br-act="resume-run"><span class="br-live-dot"></span>${brRun.done ? "Session complete · tap to rate" : "Session in progress · " + formatTime(Math.ceil((BR_TOTAL * 1000 - brElapsed()) / 1000)) + " left"}<span>›</span></button>` : ""}
      <div class="lift-card br-card br-current">
        <div class="br-cur-top">
          <div class="phase-num br-tier-num">${ROMAN[t.n - 1]}</div>
          <div class="br-cur-text">
            <div class="br-kick">Current tier</div>
            <div class="br-cur-name">${esc(t.name)} <em>${esc(t.tech)}</em></div>
          </div>
        </div>
        <p class="br-why">${esc(t.why)}</p>
        <div class="br-seglist">${brSegLine(brTierSegs(t.n, t.n === 4 && pr.ease))}</div>
        <div class="br-prog"><i style="width:${pct}%"></i></div>
        <div class="br-prog-meta">${need
          ? `<span><b>${Math.min(p.count, need.count)}/${need.count}</b> comfortable sessions</span><span><b>${Math.min(p.span, need.days)}/${need.days}</b> days</span>`
          : `<span><b>${p.week}</b> this week</span><span>aim for 3 to 5</span>`}</div>
        <div class="br-adv"><b>Advance when:</b> ${esc(t.advance)}</div>
        ${t.n === 4 ? `<label class="br-check"><input type="checkbox" data-br-pref="ease"${pr.ease ? " checked" : ""}> Use the easier 5/5 for the main block</label>` : ""}
        ${p.eligible ? `<button type="button" class="btn-heavy br-btn br-advance" data-br-tier="${t.n + 1}">Advance to Tier ${ROMAN[t.n]} · ${esc(BR_TIERS[t.n].name)}</button>` : ""}
        <button type="button" class="btn-heavy br-btn br-start" data-br-act="start-tier"${live ? " disabled" : ""}>Start 15:00 session</button>
        <p class="br-note">Sauna-safe: nasal, slow, hold-free. Only full sessions you rate comfortable count.</p>
      </div>

      <div class="lift-card br-card br-safety-card">
        <div class="lift-header"><div class="lift-name">Safety</div></div>
        <ul class="br-safe">
          <li><b>In the sauna:</b> every session is gentle and hold-free. No forced depth, no fast breathing, no breath holds.</li>
          <li>${esc(BR_SAFETY)}</li>
          <li>15:00 is a ceiling, not a target. Get out early any time. Phones can overheat in the heat.</li>
          <li>Heart or lung condition, pregnancy, or a history of fainting: check with a clinician first. Chest pain, severe breathlessness or fainting needs medical attention.</li>
          <li>Holds and power breathing are outside-the-sauna only: seated or lying down, never in water, the sauna, or while driving.</li>
        </ul>
      </div>

      <h3 class="br-h">The five tiers</h3>
      <div class="br-tiers">
        ${BR_TIERS.map((x) => {
          const st = x.n === t.n ? "current" : x.n < t.n ? "done" : x.n === t.n + 1 && p.eligible ? "ready" : "locked";
          return `
          <div class="br-tier ${st}">
            <div class="br-tier-head">
              <span class="phase-num">${ROMAN[x.n - 1]}</span>
              <span class="br-tier-name">${esc(x.name)} <em>${esc(x.tech)}</em></span>
              <span class="br-tier-state">${st === "current" ? "Now" : st === "done" ? "✓" : st === "ready" ? "Ready" : "🔒"}</span>
            </div>
            <div class="br-seglist small">${brSegLine(x.segs)}</div>
            <div class="br-adv"><b>${x.need ? "Advance when:" : "Keep it:"}</b> ${esc(x.advance)}</div>
            ${x.extra ? `<div class="br-note">${esc(x.extra)}</div>` : ""}
            ${st === "done" ? `<button type="button" class="mt-btn br-mini" data-br-tier="${x.n}">Step down to Tier ${ROMAN[x.n - 1]}</button>` : ""}
            ${st === "ready" ? `<button type="button" class="mt-btn br-mini on" data-br-tier="${x.n}">Advance to Tier ${ROMAN[x.n - 1]}</button>` : ""}
          </div>`;
        }).join("")}
      </div>

      <details class="lift-card mob-card br-card" id="br-free"${brFreeOpen ? " open" : ""}>
        <summary class="lift-header mob-summary">
          <div class="lift-name">Free pick</div>
          <div class="lift-target">Any technique, 15:00 timer. Practice only; doesn't count toward tiers.</div>
        </summary>
        <div class="br-pad">
          <div class="jr-seg br-where" role="tablist">
            <button type="button" class="jr-opt${where === "sauna" ? " on" : ""}" data-br-where="sauna">In the sauna</button>
            <button type="button" class="jr-opt${where === "outside" ? " on" : ""}" data-br-where="outside">Outside the sauna</button>
          </div>
          ${where === "outside" ? `<div class="br-warn"><b>Outside the sauna only.</b> Seated or lying down. Never in water, in the sauna, or while driving. Stop at any dizziness.
            <label class="br-check"><input type="checkbox" data-br-ack${brAck ? " checked" : ""}> I'm seated or lying down, out of the heat and not driving</label></div>` : `<p class="br-note">Hold-free methods only. Anything with holds is hidden here.</p>`}
          ${BR_TECH.filter((x) => where === "outside" || x.sauna).map((x) => `
            <div class="mob-row br-tech">
              <div class="mob-text">
                <div class="mob-name">${esc(x.name)} <span class="mob-dose">${x.pat ? esc(brPat(x.pat)) : "no pacer"}</span>${x.sauna ? ` <span class="br-tag">hold-free</span>` : ` <span class="br-tag warn">outside only</span>`}</div>
                <div class="mob-cue">${esc(x.desc)}</div>
              </div>
              <button type="button" class="mt-chip br-go-chip" data-br-free="${x.id}"${live || (!x.sauna && !brAck) ? " disabled" : ""}>▶ 15:00</button>
            </div>`).join("")}
          <div class="br-edu">
            <div class="mob-name">Power breathing (Wim Hof-style) <span class="br-tag warn">info only</span></div>
            <p>Rounds of fast, deep breaths followed by breath holds. It can cause fainting, so there's no timer for it here. If you explore it elsewhere: seated or lying down only, never in water, the sauna, or while driving. None of the tiers require it.</p>
          </div>
        </div>
      </details>

      ${brBoltHtml()}

      <details class="lift-card mob-card br-card">
        <summary class="lift-header mob-summary"><div class="lift-name">Settings &amp; history</div><div class="lift-target">Sound, music, voice, recent sessions</div></summary>
        <div class="br-pad">
          ${brSoundHtml(pr)}
          <p class="br-note">The screen stays awake during a session where the browser supports it.</p>
          ${recent.length ? `<div class="br-hist">${recent.map((e) => `<div><span>${new Date(e.at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span><span>${e.tier ? "Tier " + ROMAN[e.tier - 1] : esc((BR_TECH.find((x) => x.id === e.tech) || {}).name || "Free")}</span><span class="${e.counted ? "ok" : ""}">${e.rating === "ok" ? (e.counted ? "Counted" : "Comfortable") : e.rating === "hard" ? "Too difficult" : "Stopped early"}</span></div>`).join("")}</div>` : ""}
          <p class="br-note">Coaching milestones, not a medical protocol. Repeat or step down a tier whenever you like.</p>
        </div>
      </details>`;
    if (brBoltStart) brBoltTick();
  }
  function brBoltTick() {
    clearInterval(brBoltInt);
    brBoltInt = setInterval(() => {
      const n = document.getElementById("br-bolt-num");
      if (!brBoltStart || !n) { clearInterval(brBoltInt); return; }
      n.innerHTML = Math.floor((Date.now() - brBoltStart) / 1000) + "<small>sec</small>";
    }, 250);
  }
  function brBoltAdd(sec) {
    sec = Math.round(sec);
    if (!(sec >= 1 && sec <= 120)) { toast("Enter 1 to 120 seconds."); return; }
    const b = brBolt(); b.push({ at: Date.now(), sec }); brSaveBolt(b);
    brBoltOpen = true; renderBreath(); toast(`Logged ${sec}s. Trend over time is what matters.`);
  }
  function brBindBreath() {
    const root = document.getElementById("breath-body");
    if (!root || root.dataset.bound) return;
    root.dataset.bound = "1";
    root.addEventListener("click", (e) => {
      const a = e.target.closest("[data-br-act]");
      if (a) {
        const act = a.dataset.brAct;
        if (act === "start-tier") brStartTier(brState.tier);
        else if (act === "resume-run") openBreathRun();
        else if (act === "bolt") {
          if (!brBoltStart) { brBoltStart = Date.now(); brBoltOpen = true; vibrate(15); renderBreath(); }
          else { const s = (Date.now() - brBoltStart) / 1000; brBoltStart = 0; clearInterval(brBoltInt); if (s < 1) { renderBreath(); return; } brBoltAdd(s); }
        } else if (act === "bolt-save") { const v = parseFloat(($("#br-bolt-in") || {}).value); brBoltAdd(v); }
        return;
      }
      const del = e.target.closest("[data-br-bolt-del]");
      if (del) { const b = brBolt(); b.splice(parseInt(del.dataset.brBoltDel, 10), 1); brSaveBolt(b); brBoltOpen = true; renderBreath(); return; }
      const tier = e.target.closest("[data-br-tier]");
      if (tier) {
        const n = parseInt(tier.dataset.brTier, 10);
        const up = n > brState.tier;
        if (brSetTier(n)) { vibrate(25); renderBreath(); toast(up ? `Tier ${ROMAN[n - 1]} unlocked. ${BR_TIERS[n - 1].name}.` : `Back to Tier ${ROMAN[n - 1]}. Repetition builds the base.`); }
        return;
      }
      const fr = e.target.closest("[data-br-free]");
      if (fr) { brStartFree(fr.dataset.brFree, brAck); return; }
      const wh = e.target.closest("[data-br-where]");
      if (wh) { const p = brPrefs(); p.where = wh.dataset.brWhere; brSavePrefs(p); brAck = false; brFreeOpen = true; renderBreath(); }
    });
    root.addEventListener("change", (e) => {
      const pf = e.target.closest("[data-br-pref]");
      if (pf) { brOnPref(pf); return; }
      if (e.target.matches("[data-br-ack]")) { brAck = e.target.checked; brFreeOpen = true; renderBreath(); }
    });
    root.addEventListener("toggle", (e) => {
      if (e.target.id === "br-free") brFreeOpen = e.target.open;
      if (e.target.id === "br-bolt") brBoltOpen = e.target.open;
    }, true);
  }

  function renderBreathRun() {
    if (!brRun && !brResult) return openBreath();
    showScreen("breathrun");
    setHeader("Breath", false, true);
    setBg("breath");
    const root = document.getElementById("breath-run");
    if (!root.dataset.bound) {
      root.dataset.bound = "1";
      root.addEventListener("click", (e) => {
        const b = e.target.closest("[data-br-run]");
        if (b) {
          const k = b.dataset.brRun;
          if (k === "pause") brPause();
          else if (k === "end") brEnd();
          else if (k === "ease") brEase();
          else if (k === "back") { brResult = null; openBreath(); }
          return;
        }
        const r = e.target.closest("[data-br-rate]");
        if (r) brRate(r.dataset.brRate);
      });
      root.addEventListener("change", (e) => {
        const pf = e.target.closest("[data-br-pref]");
        if (pf) brOnPref(pf);
      });
    }
    root.dataset.view = "";
    brPaint();
    if (brRun && !brRun.done) { brTick(); brEnsureTick(); if (!brRun.pausedAt) brWakeOn(); }
  }
  function brPaint() {
    const root = document.getElementById("breath-run");
    if (!root || state.screen !== "breathrun") return;
    if (brResult) return brPaintResult(root);
    if (!brRun) return;
    if (brRun.done) return brPaintDone(root);
    if (root.dataset.view !== "run:" + brRun.id) {
      root.dataset.view = "run:" + brRun.id;
      const pr = brPrefs();
      root.innerHTML = `
        <div class="br-run">
          <div class="br-run-head">
            <div class="br-kick">${esc(brRun.kicker)}</div>
            <div class="br-run-title">${esc(brRun.title)}</div>
            <div class="br-tag ${brRun.sauna ? "" : "warn"}">${brRun.sauna ? "Sauna-safe · hold-free" : "Outside the sauna · seated or lying down"}</div>
          </div>
          <div class="br-orb-wrap" aria-hidden="true">
            <div class="br-ring"></div>
            <div class="br-orb" id="br-orb"></div>
            <div class="br-orb-text"><div class="br-cue" id="br-cue">Inhale</div><div class="br-count" id="br-count"></div></div>
          </div>
          <div class="br-live-region" id="br-aria" aria-live="polite"></div>
          <div class="br-hint" id="br-hint">${esc(brRun.hint || "")}</div>
          <div class="br-clock">
            <div><b id="br-total">15:00</b><span>Remaining</span></div>
            <div><b id="br-seg">Settle</b><span id="br-seg-left"></span></div>
          </div>
          <div class="mt-steps br-steps" id="br-steps">${brRun.segs.map(() => "<i></i>").join("")}</div>
          <div class="br-pace" id="br-pace"></div>
          <div class="mt-controls br-controls">
            <button type="button" class="mt-btn" data-br-run="end" id="br-end">End</button>
            <button type="button" class="btn-heavy mt-go" data-br-run="pause" id="br-pause">Pause</button>
          </div>
          <button type="button" class="mt-btn br-ease" data-br-run="ease" id="br-ease" hidden>Ease to 5/5</button>
          <div class="br-snd-state" id="br-snd-state" aria-live="off"></div>
          <details class="br-sound-wrap"><summary>Sound &amp; voice</summary>${brSoundHtml(pr)}</details>
          <p class="br-safety">${esc(BR_SAFETY)} 15:00 is a ceiling, not a target.</p>
        </div>`;
    }
    const st = brStatus();
    if (st) brPaintText(st);
    const pause = document.getElementById("br-pause");
    pause.textContent = brRun.pausedAt ? "Resume" : "Pause";
    document.getElementById("br-end").textContent = brConfirmEnd ? "Tap to end" : "End";
    document.getElementById("br-end").classList.toggle("confirm", brConfirmEnd);
    root.querySelector(".br-run").classList.toggle("paused", !!brRun.pausedAt);
  }
  let brAriaLast = "";
  function brPaintText(st) {
    const cue = document.getElementById("br-cue");
    if (!cue) return;
    const ph = st.ph;
    cue.textContent = brRun.pausedAt ? "Paused" : BR_CUE[ph.ph];
    document.getElementById("br-count").textContent = ph.len && !brRun.pausedAt ? `${ph.count}` : "";
    document.getElementById("br-total").textContent = formatTime(Math.ceil(st.left / 1000));
    document.getElementById("br-seg").textContent = st.seg.label;
    document.getElementById("br-seg-left").textContent = formatTime(Math.ceil(st.segLeft / 1000)) + " left";
    brSndState();
    document.getElementById("br-pace").textContent = st.pat ? brPatText(st.pat) + (st.pat.length === 2 ? ` · ${(60 / (st.pat[0].s + st.pat[1].s)).toFixed(1).replace(".0", "")} breaths/min` : "") : "No pacer · quiet nasal breathing";
    $$("#br-steps i").forEach((el, i) => (el.className = i < st.i ? "on" : i === st.i ? "now" : ""));
    const wrap = document.querySelector(".br-orb-wrap");
    if (wrap) wrap.dataset.ph = ph.ph;
    const orb = document.getElementById("br-orb");
    if (orb) orb.style.transform = `scale(${ph.scale.toFixed(4)})`;
    const ease = document.getElementById("br-ease");
    if (ease) ease.hidden = !(st.seg.alt && brRun.easeAt == null);
    const aria = BR_CUE[ph.ph];
    if (aria !== brAriaLast) { brAriaLast = aria; const a = document.getElementById("br-aria"); if (a) a.textContent = aria; }
  }
  function brPaintDone(root) {
    if (root.dataset.view === "done:" + brRun.id) return;
    root.dataset.view = "done:" + brRun.id;
    const [q, a] = BR_STOIC[brRun.quote % BR_STOIC.length];
    root.innerHTML = `
      <div class="br-done">
        <div class="br-done-ring">≋</div>
        <div class="br-done-title">15:00 complete</div>
        <div class="held-rule br-rule"></div>
        <blockquote class="held-quote">\u201C${esc(q)}\u201D</blockquote>
        <p class="held-author">${esc(a)}</p>
        <p class="br-ask">${brRun.kind === "tier" ? "How did it feel? Only comfortable sessions count toward the next tier." : "How did it feel?"}</p>
        <div class="br-rate">
          <button type="button" class="btn-heavy br-btn" data-br-rate="ok">Comfortable</button>
          <button type="button" class="mt-btn" data-br-rate="hard">Too difficult</button>
        </div>
        <p class="br-note">Drink some water. Leave the heat if you feel at all unwell.</p>
      </div>`;
  }
  function brPaintResult(root) {
    root.dataset.view = "result";
    const r = brResult;
    const p = brProgress();
    const [q, a] = BR_STOIC[r.quote % BR_STOIC.length];
    let msg;
    if (r.kind !== "tier") msg = r.rating === "ok" ? "Practice logged." : "Logged. Pick an easier pattern next time.";
    else if (r.rating === "hard") msg = `Logged, not counted. Repeat Tier ${ROMAN[r.tier - 1]} or step down a tier. Easier is how you progress.`;
    else if (!r.counted) msg = "Logged as practice.";
    else if (p.eligible) msg = `Criteria met. Tier ${ROMAN[p.t.n]} · ${BR_TIERS[p.t.n].name} is ready when you are.`;
    else if (p.t.need) msg = `Counted. ${Math.min(p.count, p.t.need.count)}/${p.t.need.count} sessions · ${Math.min(p.span, p.t.need.days)}/${p.t.need.days} days toward Tier ${ROMAN[p.t.n]}.`;
    else msg = `Counted. ${p.week} this week. Aim for 3 to 5.`;
    root.innerHTML = `
      <div class="br-done">
        <div class="br-done-ring">${r.counted ? "✓" : "≋"}</div>
        <div class="br-done-title">${r.rating === "ok" ? "Well breathed." : "Noted."}</div>
        <p class="br-result">${esc(msg)}</p>
        <div class="held-rule br-rule"></div>
        <blockquote class="held-quote">\u201C${esc(q)}\u201D</blockquote>
        <p class="held-author">${esc(a)}</p>
        <button type="button" class="btn-heavy br-btn" data-br-run="back">Back to Breath</button>
      </div>`;
  }

  function renderSession() {
    const day = getDay(state.dayId);
    if (!day) return renderHome();

    showScreen("session");
    $("#header-back").classList.remove("hidden");
    $("#header-title").textContent = day.name;
    $("#header-title").classList.remove("wordmark");
    const badge = $("#header-badge");
    badge.classList.remove("hidden", "push", "pull", "legs");
    badge.classList.add(day.type);
    badge.textContent = day.focus;
    $("#header-gear").classList.add("hidden");

    const b = blockInfo(state.week);
    const lifts = liftsFor(day, state.week);
    const sk = GODS[day.type] && GODS[day.type].img ? day.type : "phase" + (((b.weekInBlock - 1) % 3) + 1);
    setBg(sk);
    $("#block-status").innerHTML = blockLabelHtml(state.week);
    const weekRow = $("#week-row");
    const weeks = [];
    for (let w = b.firstWeek; w <= b.lastWeek; w++) weeks.push(w);
    weekRow.innerHTML =
      `<button type="button" class="week-btn block-jump" data-week="${b.firstWeek - 1}" aria-label="Previous rotation"${b.firstWeek <= 1 ? " disabled" : ""}>‹</button>` +
      weeks
        .map(
          (w) =>
            `<button type="button" class="week-btn${w === state.week ? " active" : ""}" data-week="${w}" aria-label="Phase ${ROMAN[w - b.firstWeek] || w - b.firstWeek + 1}">${ROMAN[w - b.firstWeek] || w - b.firstWeek + 1}</button>`
        )
        .join("") +
      `<button type="button" class="week-btn block-jump" data-week="${b.lastWeek + 1}" aria-label="Next rotation">›</button>`;
    $$(".week-btn", weekRow).forEach((btn) => {
      btn.addEventListener("click", () => {
        setWeek(parseInt(btn.dataset.week, 10));
        renderSession();
      });
    });

    const liftsEl = $("#lifts");
    liftsEl.innerHTML = warmupHtml(day, state.week) + lifts
      .map((lift, li) => {
        const last = lastPerformance(lift.name, state.week);
        let lastHtml = `<div class="lift-last new">New lift — no history yet</div>`;
        if (last) {
          const parts = Object.keys(last.sets)
            .sort((a, b2) => a - b2)
            .map((si) => {
              const s = last.sets[si];
              return s.weight && s.reps ? `${s.weight}×${s.reps}` : s.weight ? `${s.weight}` : `${s.reps} reps`;
            });
          lastHtml = `<div class="lift-last">Last time (W${last.week}): ${parts.join(", ")}</div>`;
        }
        // If this slot's exercise was swapped, sets logged under the old name still show here, labelled.
        const oldNames = [...new Set(Array.from({ length: lift.sets }, (_, si) => (state.logs[logKey(day.id, state.week, li, si)] || {}).lift)
          .filter((n) => n && n !== lift.name))];
        if (oldNames.length) lastHtml += `<div class="lift-last new">This week's sets were logged as: ${esc(oldNames.join(", "))}</div>`;
        const rows = Array.from({ length: lift.sets }, (_, si) => {
          const log = getSetLog(day.id, state.week, li, si);
          const prevW = last && last.sets[si] && last.sets[si].weight ? last.sets[si].weight : "";
          return `
            <div class="set-row${log.done ? " done" : ""}" data-lift="${li}" data-set="${si}">
              <div class="set-label">S${si + 1}</div>
              <div class="field">
                <label>Reps</label>
                <input type="number" inputmode="numeric" min="0" max="99" step="1"
                  data-field="reps" value="${log.reps}" aria-label="Reps set ${si + 1}">
              </div>
              <div class="field">
                <label>Weight</label>
                <input type="number" inputmode="decimal" min="0" max="9999" step="0.5"
                  data-field="weight" value="${log.weight}" placeholder="${prevW}" aria-label="Weight set ${si + 1}">
              </div>
              <div class="field">
                <label>RIR</label>
                <input type="number" inputmode="numeric" min="0" max="10" step="1"
                  data-field="rir" value="${log.rir}" aria-label="RIR set ${si + 1}">
              </div>
              <button type="button" class="btn-done${log.done ? " checked" : ""}"
                data-lift="${li}" data-set="${si}" aria-label="Mark set ${si + 1} done">
                ${log.done ? "✓" : "○"}
              </button>
            </div>`;
        }).join("");

        return `
          <article class="lift-card">
            <div class="lift-header">
              <div class="lift-name">${lift.name}</div>
              <div class="lift-target">Target ${lift.target} · ${watchHtml(lift.name)}</div>
            </div>
            ${lastHtml}
            ${betweenHtml(day, li)}
            ${rows}
          </article>`;
      })
      .join("") + cooldownHtml(day, state.week);

    bindMobility(liftsEl);

    $$("input[data-field]", liftsEl).forEach((input) => {
      const row = input.closest(".set-row");
      const li = parseInt(row.dataset.lift, 10);
      const si = parseInt(row.dataset.set, 10);
      const field = input.dataset.field;
      const save = () => {
        setSetLog(day.id, state.week, li, si, { [field]: input.value });
      };
      input.addEventListener("change", save);
      input.addEventListener("blur", save);
      input.addEventListener("input", save);
    });

    $$(".btn-done:not(.mob-check)", liftsEl).forEach((btn) => {
      btn.addEventListener("click", () => {
        const li = parseInt(btn.dataset.lift, 10);
        const si = parseInt(btn.dataset.set, 10);
        const log = getSetLog(day.id, state.week, li, si);
        const nowDone = !log.done;
        setSetLog(day.id, state.week, li, si, { done: nowDone });

        const row = btn.closest(".set-row");
        row.classList.toggle("done", nowDone);
        btn.classList.toggle("checked", nowDone);
        btn.textContent = nowDone ? "✓" : "○";

        if (nowDone) {
          ensureAudio();
          if (window.Notification && Notification.permission === "default") {
            Notification.requestPermission().catch(() => {});
          }
          burst(btn);
          vibrate(40);
          startTimer(state.timer.preset || day.defaultRest);
        }
      });
    });
  }

  function bindTimerControls() {
    $("#btn-pause").addEventListener("click", pauseTimer);
    $("#btn-skip").addEventListener("click", skipTimer);
    $("#btn-plus").addEventListener("click", add15);
    $("#btn-minus").addEventListener("click", minus15);
    $$(".preset-btn").forEach((btn) => {
      btn.addEventListener("click", () => setPreset(parseInt(btn.dataset.sec, 10)));
    });
  }

  function init() {
    const gear = $("#header-gear"), extras = $("#extras");
    if (gear && extras) gear.addEventListener("click", () => {
      const open = extras.hidden;
      extras.hidden = !open;
      gear.setAttribute("aria-expanded", String(open));
      gear.classList.toggle("on", open);
      if (open) extras.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
    showCover();
    const sq = document.getElementById("stoic-quote");
    if (sq) sq.addEventListener("click", () => {
      stoicIdx = (stoicIdx + 1) % STOIC.length;
      sq.classList.remove("swap"); void sq.offsetWidth; sq.classList.add("swap");
      renderStoic();
    });
    ["pointerdown", "touchend", "click"].forEach((ev) => document.addEventListener(ev, () => { ensureAudio(); }, { passive: true }));
    document.addEventListener("click", (e) => {
      if (e.target.closest && e.target.closest("[data-br-test]")) { brTestSound(); return; }
      if (brRun && !brRun.done && state.screen === "breathrun" && !e.target.closest("[data-br-run]")) brAudioKick();
    });
    document.addEventListener("input", (e) => { const r = e.target.closest && e.target.closest("[data-br-vol]"); if (r) brOnVol(r); });
    $("#header-back").addEventListener("click", () => {
      if (state.screen === "session") {
        history.replaceState(null, "", "#phase/" + state.week);
        renderPhase();
      } else if (state.screen === "phase" || state.screen === "breath") {
        history.replaceState(null, "", location.pathname + location.search);
        renderHome();
      } else if (state.screen === "breathrun") {
        brResult = null;
        openBreath();
      }
    });
    bindTimerControls();
    bindVideoSheet();
    document.addEventListener("pointerdown", ripple);
    document.addEventListener("visibilitychange", () => (document.hidden ? onHidden() : onVisible()));
    window.addEventListener("pagehide", onHidden);
    window.addEventListener("pageshow", () => resyncTimer(false));
    window.addEventListener("focus", () => resyncTimer(false));

    const hash = (location.hash || "").replace(/^#/, "");
    const m = hash.match(/^session\/([\w-]+)/);
    const mp = hash.match(/^phase\/(\d+)/);
    brBindBreath();
    if (hash === "breath/session" && brRun) {
      openBreathRun();
    } else if (hash.startsWith("breath")) {
      openBreath();
    } else if (m && getDay(m[1])) {
      openDay(m[1]);
    } else if (mp) {
      openPhase(parseInt(mp[1], 10));
    } else {
      renderHome();
    }
    renderTimer();
    resyncTimer(true);
    checkUrge();
    document.addEventListener("visibilitychange", () => { if (!document.hidden) { checkUrge(); renderCheckinBanner(); renderDiscipline(); } ciNotifyIfDue(); });
    const ciTick = () => { renderCheckinBanner(); ciNotifyIfDue(); };
    setInterval(ciTick, 30000);
    ciNotifyIfDue();
    ciSchedule();
    const openCiFromHash = () => {
      if ((location.hash || "") !== "#checkin") return;
      history.replaceState(null, "", location.pathname + location.search);
      if (state.screen !== "home") renderHome();
      const c = ciCfg(), n = nowMin();
      const on = CHECKINS.filter((k) => c.enabled[k.id]);
      const due = dueCheckin();
      const past = on.filter((k) => n >= hm(c.times[k.id])).sort((a, b) => hm(c.times[b.id]) - hm(c.times[a.id]));
      const pickCi = due || past.find((k) => !ciDone(k.id)) || past[0] || on[0] || CHECKINS[0];
      const go = () => openCheckin(pickCi.id);
      if (document.getElementById("cover")) document.getElementById("cover").addEventListener("click", () => setTimeout(go, 700), { once: true });
      else go();
    };
    openCiFromHash();
    window.addEventListener("hashchange", openCiFromHash);

    const params = new URLSearchParams(location.search);
    if (params.get("demo") === "timer" && state.dayId) {
      setTimeout(() => {
        const btn = document.querySelector(".btn-done:not(.mob-check)");
        if (btn) btn.click();
      }, 200);
    }

    if ("serviceWorker" in navigator) {
      const hadController = !!navigator.serviceWorker.controller;
      let reloaded = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!hadController || reloaded) return;
        reloaded = true;
        location.reload();
      });
      navigator.serviceWorker.register("./sw.js").then((r) => r.update()).catch(() => {});
    }
  }

  function boot() {
    hydrateLogs().finally(() => {
      migrate();
      autoAdvance();
      init();
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
