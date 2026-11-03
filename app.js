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
      toast(`Week ${start} complete. Mission accomplished. Now Block ${b.block} • Week ${b.weekInBlock} of ${b.blockLen}` + (fresh ? " · New lifts" : "") + " · \u201C" + pick(STOIC)[0] + "\u201D");
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
    return `<span class="block-label">Block ${b.block} • Week ${b.weekInBlock} of ${b.blockLen}</span>` +
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
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === "suspended") audioCtx.resume();
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

  function renderSettings() {
    const el = $("#settings-card");
    if (!el) return;
    const notif = !("Notification" in window) ? "unsupported" : Notification.permission;
    el.innerHTML = `
      <details class="lift-card mob-card">
        <summary class="lift-header mob-summary">
          <div class="lift-name">Settings</div>
          <div class="lift-target">Timer and alerts</div>
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
      </details>`;
    $("#set-bg").addEventListener("change", (e) => {
      settings.bgTimer = e.target.checked;
      saveSettings();
      persistTimer();
      vibrate(15);
    });
    const nb = $("#set-notif");
    if (nb) nb.addEventListener("click", () => {
      Notification.requestPermission().then(renderSettings).catch(() => {});
    });
  }

  function showScreen(name) {
    state.screen = name;
    $$(".screen").forEach((s) => s.classList.toggle("active", s.dataset.screen === name));
    window.scrollTo(0, 0);
  }

  function renderHome() {
    renderStoic();
    showScreen("home");
    $("#header-back").classList.add("hidden");
    $("#header-title").textContent = "ARETE";
    $("#header-title").classList.add("wordmark");
    $("#header-badge").classList.add("hidden");

    const b = blockInfo(state.week);
    const banner = $("#block-banner");
    banner.innerHTML = `
      <button type="button" class="block-nav" id="week-prev" aria-label="Previous week"${state.week <= 1 ? " disabled" : ""}>‹</button>
      <div class="block-text">
        <div class="block-title">${blockLabelHtml(state.week)}</div>
        <div class="block-sub">Program week ${state.week}${b.cycle > 1 ? ` · cycle ${b.cycle}` : ""} · new lifts every 3 weeks</div>
      </div>
      <button type="button" class="block-nav" id="week-next" aria-label="Next week">›</button>`;
    $("#week-prev").addEventListener("click", () => { setWeek(state.week - 1); renderHome(); });
    $("#week-next").addEventListener("click", () => { setWeek(state.week + 1); renderHome(); });

    const grid = $("#day-grid");
    grid.innerHTML = DAYS.map((d) => {
      const lifts = liftsFor(d, state.week);
      return `
      <button class="day-card" data-day="${d.id}" type="button">
        <div class="day-icon ${d.type}">${d.short}</div>
        <div class="day-info">
          <div class="name">${d.name}</div>
          <div class="meta">${d.focus} · ${lifts.length} lifts · rest ${d.defaultRest}s · +${MOBILITY[d.id].minutes}m mob</div>
          <div class="meta lead">${lifts[0].name}</div>
        </div>
        <div class="day-arrow">›</div>
      </button>`;
    }).join("");

    $$(".day-card", grid).forEach((btn) => {
      btn.addEventListener("click", () => openDay(btn.dataset.day));
    });
    renderScreens();
    renderSettings();
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
    return `
      <div class="mob-row${on ? " done" : ""}">
        <div class="mob-text">
          <div class="mob-name">${esc(d.name)} <span class="mob-dose">${esc(d.dose)}</span></div>
          <div class="mob-cue">${esc(d.cue)} ${watchHtml(d.name)}</div>
        </div>
        <button type="button" class="btn-done mob-check${on ? " checked" : ""}" data-mob="${esc(k)}" aria-label="Mark ${esc(d.name)} done">${on ? "✓" : "○"}</button>
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
  function bindMobility(root) {
    $$(".mob-check", root).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const k = btn.dataset.mob;
        const on = !mobState[k];
        setMob(k, on);
        btn.classList.toggle("checked", on);
        btn.textContent = on ? "✓" : "○";
        btn.closest(".mob-row").classList.toggle("done", on);
        const card = btn.closest(".mob-card");
        const all = $$(".mob-check", card);
        const prog = $(".mob-progress", card);
        if (prog) prog.textContent = `${all.filter((b) => mobState[b.dataset.mob]).length}/${all.length}`;
        if (on) { burst(btn); vibrate(20); }
      });
    });
  }
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

    const b = blockInfo(state.week);
    const lifts = liftsFor(day, state.week);
    $("#block-status").innerHTML = blockLabelHtml(state.week);
    const weekRow = $("#week-row");
    const weeks = [];
    for (let w = b.firstWeek; w <= b.lastWeek; w++) weeks.push(w);
    weekRow.innerHTML =
      `<button type="button" class="week-btn block-jump" data-week="${b.firstWeek - 1}" aria-label="Previous block"${b.firstWeek <= 1 ? " disabled" : ""}>‹</button>` +
      weeks
        .map(
          (w) =>
            `<button type="button" class="week-btn${w === state.week ? " active" : ""}" data-week="${w}">W${w}</button>`
        )
        .join("") +
      `<button type="button" class="week-btn block-jump" data-week="${b.lastWeek + 1}" aria-label="Next block">›</button>`;
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
    showCover();
    const sq = document.getElementById("stoic-quote");
    if (sq) sq.addEventListener("click", () => {
      stoicIdx = (stoicIdx + 1) % STOIC.length;
      sq.classList.remove("swap"); void sq.offsetWidth; sq.classList.add("swap");
      renderStoic();
    });
    document.addEventListener("pointerdown", ensureAudio);
    $("#header-back").addEventListener("click", () => {
      if (state.screen === "session") {
        history.replaceState(null, "", location.pathname + location.search);
        renderHome();
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
    if (m && getDay(m[1])) {
      openDay(m[1]);
    } else {
      renderHome();
    }
    renderTimer();
    resyncTimer(true);

    const params = new URLSearchParams(location.search);
    if (params.get("demo") === "timer" && state.dayId) {
      setTimeout(() => {
        const btn = document.querySelector(".btn-done:not(.mob-check)");
        if (btn) btn.click();
      }, 200);
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
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
