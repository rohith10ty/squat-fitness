export const WORKOUT_CATEGORIES = ['All', 'Cardio', 'Strength Training', 'Yoga', 'HIIT'];

export const INITIAL_WORKOUTS = [
  {
    id: 'w1',
    title: 'High-Volume Hypertrophy',
    category: 'Strength Training',
    difficulty: 'Intermediate',
    duration: 45, // mins
    calories: 380,
    progress: 75,
    completed: false,
    image: '/img/strength.jpg',
    description: 'Targeted compound lifts focusing on barbell back squats, Romanian deadlifts, and bench press for dense muscular development.',
    exercises: [
      { name: 'Barbell Back Squat', sets: '4 sets x 8 reps', rest: '90s' },
      { name: 'Dumbbell Bench Press', sets: '4 sets x 10 reps', rest: '60s' },
      { name: 'Romanian Deadlift', sets: '3 sets x 10 reps', rest: '75s' },
      { name: 'Cable Overhead Extension', sets: '3 sets x 12 reps', rest: '45s' },
    ]
  },
  {
    id: 'w2',
    title: 'Zone 2 Endurance Run',
    category: 'Cardio',
    difficulty: 'Beginner',
    duration: 35,
    calories: 310,
    progress: 100,
    completed: true,
    image: '/img/cardio.jpg',
    description: 'Steady-state aerobic conditioning designed to build mitochondrial density and cardiac stroke volume.',
    exercises: [
      { name: 'Dynamic Warmup', sets: '5 mins', rest: 'None' },
      { name: 'Zone 2 Steady Cadence', sets: '25 mins @ 135-145 BPM', rest: 'None' },
      { name: 'Stride Cool-down', sets: '5 mins walking', rest: 'None' },
    ]
  },
  {
    id: 'w3',
    title: 'Tabata MetCon Burner',
    category: 'HIIT',
    difficulty: 'Advanced',
    duration: 25,
    calories: 420,
    progress: 40,
    completed: false,
    image: '/img/hiit.jpg',
    description: 'High-intensity intervals pushing lactic threshold with battle ropes, burpees, and kettlebell snatches.',
    exercises: [
      { name: 'Heavy Battle Ropes', sets: '20s on / 10s off x 8 rounds', rest: '60s' },
      { name: 'Plyometric Burpees', sets: '20s on / 10s off x 8 rounds', rest: '60s' },
      { name: 'Kettlebell Russian Swings', sets: '20s on / 10s off x 8 rounds', rest: '60s' },
    ]
  },
  {
    id: 'w4',
    title: 'Mobility & Spinal Flow',
    category: 'Yoga',
    difficulty: 'Beginner',
    duration: 30,
    calories: 160,
    progress: 60,
    completed: false,
    image: '/img/yoga.jpg',
    description: 'Deep myofascial release, thoracic spine rotation, and mindful breath control for recovery days.',
    exercises: [
      { name: 'Cat-Cow into Child’s Pose', sets: '3 mins gentle breathing', rest: 'None' },
      { name: 'World’s Greatest Stretch', sets: '8 reps per side', rest: '30s' },
      { name: 'Downward Dog to Cobra', sets: '5 slow transitions', rest: '30s' },
      { name: 'Pigeon Pose Hip Opener', sets: '90s hold per side', rest: 'None' },
    ]
  },
  {
    id: 'w5',
    title: 'Sprint Interval Protocol',
    category: 'HIIT',
    difficulty: 'Advanced',
    duration: 20,
    calories: 340,
    progress: 20,
    completed: false,
    image: '/img/hiit.jpg',
    description: 'Maximum explosive output sprints on treadmill or track with short recovery periods.',
    exercises: [
      { name: 'Acceleration Drills', sets: '4 reps x 30m', rest: '45s' },
      { name: 'Full Sprint (95% effort)', sets: '8 x 15s sprint', rest: '45s' },
      { name: 'Passive Recovery Walk', sets: '5 mins', rest: 'None' },
    ]
  },
  {
    id: 'w6',
    title: 'Upper Body Calisthenics',
    category: 'Strength Training',
    difficulty: 'Intermediate',
    duration: 40,
    calories: 310,
    progress: 90,
    completed: false,
    image: '/img/strength.jpg',
    description: 'Strict bodyweight mastery including weighted pull-ups, ring dips, and hollow body holds.',
    exercises: [
      { name: 'Weighted Pull-Ups', sets: '4 sets x 6 reps', rest: '90s' },
      { name: 'Gymnastic Ring Dips', sets: '4 sets x 8 reps', rest: '75s' },
      { name: 'Pike Push-ups', sets: '3 sets x 12 reps', rest: '60s' },
      { name: 'Hollow Body Hold', sets: '4 sets x 40s hold', rest: '45s' },
    ]
  }
];

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', steps: 9420, calories: 620, minutes: 55, active: true },
  { day: 'Tue', steps: 11200, calories: 740, minutes: 65, active: true },
  { day: 'Wed', steps: 8150, calories: 510, minutes: 40, active: true },
  { day: 'Thu', steps: 12400, calories: 830, minutes: 75, active: true },
  { day: 'Fri', steps: 9800, calories: 650, minutes: 50, active: true },
  { day: 'Sat', steps: 14100, calories: 920, minutes: 90, active: true },
  { day: 'Sun', steps: 8450, calories: 590, minutes: 45, active: true, today: true },
];

export const NUTRITION_MEALS = [
  {
    id: 'm1',
    mealType: 'Breakfast',
    name: 'Wild Blueberry Protein Oats',
    image: '/img/breakfast.jpg',
    calories: 460,
    protein: 38,
    carbs: 52,
    fat: 10,
    tags: ['High Protein', 'Antioxidants'],
    ingredients: ['Rolled oats', 'Whey isolate', 'Wild blueberries', 'Almond milk', 'Chia seeds']
  },
  {
    id: 'm2',
    mealType: 'Lunch',
    name: 'Norwegian Salmon & Quinoa Bowl',
    image: '/img/lunch.jpg',
    calories: 620,
    protein: 46,
    carbs: 48,
    fat: 22,
    tags: ['Omega-3', 'Gluten-Free'],
    ingredients: ['Wild-caught salmon', 'Tri-color quinoa', 'Avocado', 'Steamed broccolini', 'Lemon vinaigrette']
  },
  {
    id: 'm3',
    mealType: 'Dinner',
    name: 'Herb-Roasted Chicken Breast',
    image: '/img/dinner.jpg',
    calories: 540,
    protein: 52,
    carbs: 38,
    fat: 14,
    tags: ['Lean Muscle', 'Low Sodium'],
    ingredients: ['Free-range chicken breast', 'Sweet potato mash', 'Grilled asparagus', 'Fresh rosemary']
  },
  {
    id: 'm4',
    mealType: 'Snacks',
    name: 'Greek Yogurt & Almond Crunch',
    image: '/img/snack.jpg',
    calories: 280,
    protein: 24,
    carbs: 18,
    fat: 9,
    tags: ['Probiotic', 'Quick Prep'],
    ingredients: ['0% Greek yogurt', 'Raw crushed almonds', 'Pure honeycomb drizzle', 'Cacao nibs']
  }
];

export const INITIAL_GOALS = [
  {
    id: 'g1',
    title: 'Weekly Distance Target',
    target: '30 km',
    current: '24.5 km',
    percentage: 82,
    category: 'Cardio',
    deadline: 'Sunday',
    completed: false
  },
  {
    id: 'g2',
    title: '4x Strength Sessions',
    target: '4 sessions',
    current: '3 sessions',
    percentage: 75,
    category: 'Strength',
    deadline: 'This week',
    completed: false
  },
  {
    id: 'g3',
    title: 'Daily Hydration Intake',
    target: '3.2 Liters',
    current: '2.8 Liters',
    percentage: 88,
    category: 'Nutrition',
    deadline: 'Today',
    completed: false
  },
  {
    id: 'g4',
    title: 'Sleep Recovery Window',
    target: '8.0 Hours',
    current: '8.2 Hours',
    percentage: 100,
    category: 'Recovery',
    deadline: 'Maintained',
    completed: true
  }
];

export const PROGRESS_TRENDS = [
  { date: 'Oct 01', calories: 2350, weight: 75.8, hours: 1.1 },
  { date: 'Oct 05', calories: 2480, weight: 75.5, hours: 1.3 },
  { date: 'Oct 10', calories: 2600, weight: 75.2, hours: 1.4 },
  { date: 'Oct 15', calories: 2520, weight: 74.9, hours: 1.2 },
  { date: 'Oct 20', calories: 2700, weight: 74.6, hours: 1.6 },
  { date: 'Oct 25', calories: 2850, weight: 74.2, hours: 1.5 },
];
