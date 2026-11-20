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
    "subtitle": "A look at the Flutter savings dashboard, where balances, everyday actions and savings goals come together on one mobile screen.",
    "caption": "The Flutter dashboard brings the account balance, quick actions and savings goals together.",
    "quote": {
      "text": "A useful money dashboard makes your balance and next action easy to find.",
      "source": "Designing the Flutter savings home screen"
    },
    "paragraphs": [
      "The image shows the home screen of a Flutter savings app. I wanted the most useful information to be clear as soon as the screen opens: the account balance first, followed by quick actions and the user's savings goals.",
      "The balance card gives the main figure visual priority, while the deposit, withdrawal, lock-savings and auto-savings actions are grouped into easy-to-scan buttons. Keeping these actions close to the balance makes common tasks easier to find.",
      "Savings goals add a sense of progress beyond the current balance. A compact goal preview and a link to view all goals let the dashboard stay focused while still giving users a next step. The bottom navigation keeps the other areas of the app within reach.",
      "Building this screen in Flutter is about more than arranging cards: spacing, readable labels and touch-friendly controls all matter on a real phone. Testing the layout on device helps ensure the dashboard remains clear and usable beyond the emulator."
    ]
  },
  "2": {
    "subtitle": "How I built the React Native dashboard for The Creator Studio.",
    "caption": "A dashboard view from The Creator Studio React Native app.",
    "quote": {
      "text": "A dashboard should make the creator's next decision obvious.",
      "source": "The Creator Studio design principle"
    },
    "paragraphs": [
      "The Creator Studio dashboard started as a React Native interface for creators who need their important information at a glance. Instead of filling the screen with controls, I focused on the metrics, activity and actions a creator uses most.",
      "I organized the screen with reusable components and responsive layouts that work consistently across mobile sizes. Cards, navigation and data sections keep the experience predictable while Expo makes it quick to test the app during development.",
      "Building the dashboard also meant handling real application states: loading data, displaying useful empty states, and showing clear feedback when an action fails. These details make the interface feel dependable rather than merely decorative.",
      "The final dashboard gives The Creator Studio a polished mobile workspace: quick insight, simple navigation and a clear path to the next task. It is a practical example of how React Native can turn a business workflow into a clean creator-focused experience."
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

};