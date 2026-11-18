// Article text for the blog details page, keyed by post id (the ?id= value).
// Replace the sample writing with your own. Posts without an entry use FALLBACK_ARTICLE.

export interface BlogArticle {
  subtitle: string;
  caption: string;
  quote: { text: string; source: string };
  /** [intro, second paragraph, then two paragraphs that appear after the quote] */
  paragraphs: [string, string, string, string];
}

export const FALLBACK_ARTICLE: BlogArticle = {
  subtitle: "Notes from building, breaking and fixing real projects.",
  caption: "Replace this cover with a screenshot from your own project.",
  quote: { text: "Write down what happened, then change one thing.", source: "My debugging rule" },
  paragraphs: [
    "This article is on its way. Check back soon for the full write-up.",
    "Every piece published here goes through iterative revisions, careful debugging and honest review.",
    "More detail will appear here once the article is published.",
    "Thank you for reading.",
  ],
};

export const BLOG_ARTICLES: Record<string, BlogArticle> = {
  "1": {
    "subtitle": "How a Flutter app goes from a working emulator build to a signed release that installs on a real phone.",
    "caption": "Replace this cover with a screenshot from your own project.",
    "quote": {
      "text": "A build that only works on your laptop is a draft, not a release.",
      "source": "Lesson from my first deployment"
    },
    "paragraphs": [
      "Most Flutter tutorials end the moment the app runs on an emulator. That is where the real work starts: signing keys, build flavors, environment variables, and a pipeline that must succeed without you watching it.",
      "My first Codemagic build failed seven times in a row, and every failure taught me something the documentation assumed I already knew. This write-up keeps those failures in, in the order they happened.",
      "The first fundamental is reproducibility: pin the Flutter version, commit the lockfile, and treat the signing keystore like a password. Everything else in the pipeline depends on those three decisions being made early.",
      "Next, I walk through the exact workflow file I use, the environment variables that must never reach the repository, and the checklist I run before tagging a release."
    ]
  },
  "2": {
    "subtitle": "When a lightweight Flask dashboard beats a Streamlit prototype, and when it does not.",
    "caption": "Replace this cover with a screenshot from your own project.",
    "quote": {
      "text": "Choose the tool that fails gracefully in front of an audience.",
      "source": "Notes from a supervisor demo"
    },
    "paragraphs": [
      "Supervisor demos reward clarity over cleverness. Streamlit gets a data idea on screen in an afternoon, while Flask gives you routes, templates and control over exactly what the audience sees.",
      "I built the same small project twice to compare them honestly: setup time, deployment effort, and how each one behaved when the demo wifi was slow.",
      "Streamlit wins on speed to first screen and interactive widgets. Flask wins when you need authentication, custom layouts, or an API that other clients will call later.",
      "My rule now: prototype in Streamlit, then move to Flask only when the prototype starts needing things a notebook-style app was never meant to do."
    ]
  },
  "3": {
    "subtitle": "Designing a Laravel API for a mobile client, with an admin panel that stays maintainable.",
    "caption": "Replace this cover with a screenshot from your own project.",
    "quote": {
      "text": "An API is a promise to every phone that has already installed your app.",
      "source": "Lesson from a client project"
    },
    "paragraphs": [
      "A mobile app is only as stable as the API behind it. Before writing any screens, I design the resources, the error format and the authentication flow, because changing them later breaks every installed client.",
      "Filament made the admin side almost free, which is exactly why it needs discipline: a fast panel can hide a messy data model until it is too late.",
      "The first decision is versioning. Even for a student project, prefix routes with a version and keep response shapes boring, so the Flutter client never has to guess.",
      "Then come resources, policies and Filament tables: how I structure them, which relationships I eager-load, and the two mistakes that slowed my dashboard to a crawl."
    ]
  },
  "4": {
    "subtitle": "A practical checklist for tracing a broken React Native bundle back to its real cause.",
    "caption": "Replace this cover with a screenshot from your own project.",
    "quote": {
      "text": "Change one thing, rebuild, and write down what happened.",
      "source": "My debugging rule"
    },
    "paragraphs": [
      "When Metro refuses to bundle, the red error screen rarely names the true culprit. It points at the symptom, usually a module that failed to resolve, and leaves the cause for you to find.",
      "After an SDK upgrade broke my project, I wrote down every check in the order that actually saved time, instead of the order that felt logical at three in the morning.",
      "Start by clearing the cache and reinstalling dependencies, then compare package versions against what the SDK expects. Most bundling failures are version mismatches in disguise.",
      "If that fails, bisect: remove recent packages one at a time. It feels slow, but it is faster than guessing, and it leaves you with a clear record of the cause."
    ]
  },
  "5": {
    "subtitle": "What changes between localhost and production when you deploy Flask and Laravel apps.",
    "caption": "Replace this cover with a screenshot from your own project.",
    "quote": {
      "text": "Production is just your laptop with all the shortcuts removed.",
      "source": "From my deployment notes"
    },
    "paragraphs": [
      "A project that runs perfectly on my laptop has never once deployed perfectly on the first try. Production differs in small, boring ways: environment variables, file paths, databases and permissions.",
      "Render makes the first deploy approachable, but it will not warn you about the assumptions your code quietly makes about the machine it runs on.",
      "Keep configuration out of the code and in environment variables, and make the app read them at startup. If a value is missing, fail loudly with a clear message.",
      "I finish with the order I now deploy things in: database first, secrets second, the app third, and a smoke test before I tell anyone the link."
    ]
  },
  "6": {
    "subtitle": "Structuring models, routes and charts for a small operations dashboard that stays readable as it grows.",
    "caption": "Replace this cover with a screenshot from your own project.",
    "quote": {
      "text": "Make the boring parts boring, so the interesting parts can change.",
      "source": "Principle behind the dashboard"
    },
    "paragraphs": [
      "A dashboard looks simple until the third data source arrives. Then every shortcut taken in the first week turns into a template nobody wants to touch.",
      "For a Flask and SQLAlchemy dashboard, I settled on a few structural rules early, and they paid for themselves every time the requirements changed.",
      "Models stay thin, queries live in one module, and routes only translate between requests and those queries. Charts receive plain data and know nothing about the database.",
      "The rest covers pagination, filtering that survives a page refresh, and the small caching layer that kept the dashboard fast without hiding stale data."
    ]
  }
};