export const chapters: {id:string;title:string;place:string;caption:string;note:string;icon:string;art?:string}[] = [
  {
    "id": "wish-1",
    "title": "Game night giggles",
    "place": "A FRIENDLY COMPETITION",
    "caption": "A simple game turned into an afternoon of laughter. Nobody remembers who won, but everyone remembers the fun.",
    "note": "Some moments deserve a replay.",
    "icon": "cards",
    "art": "game-night"
  },
  {
    "id": "wish-2",
    "title": "A little flower surprise",
    "place": "A SPLASH OF COLOUR",
    "caption": "A bunch of bright flowers made an ordinary morning feel like a celebration.",
    "note": "A small gesture, a big smile.",
    "icon": "flower",
    "art": "flowers"
  },
  {
    "id": "wish-3",
    "title": "The cookie experiment",
    "place": "SOMETHING SWEET",
    "caption": "Flour on the counter, music in the kitchen, and cookies that disappeared before they cooled.",
    "note": "The secret ingredient was laughter.",
    "icon": "cooking",
    "art": "baking"
  },
  {
    "id": "wish-4",
    "title": "A picnic in the park",
    "place": "A SUNNY AFTERNOON",
    "caption": "A blanket, a basket of snacks, and absolutely no plans. Sometimes that is all a lovely day needs.",
    "note": "A little sunshine to keep.",
    "icon": "food"
  },
  {
    "id": "wish-5",
    "title": "The bookshop detour",
    "place": "BETWEEN THE SHELVES",
    "caption": "One quick visit became an hour of discovering books and sharing favourite lines.",
    "note": "A new chapter waiting to happen.",
    "icon": "magic"
  },
  {
    "id": "wish-6",
    "title": "A playlist for the day",
    "place": "TURN THE MUSIC UP",
    "caption": "Every song brought another smile. Even the off-key singing became part of the fun.",
    "note": "Good music, better company.",
    "icon": "magic"
  },
  {
    "id": "wish-7",
    "title": "A tiny creative mess",
    "place": "COLOURS EVERYWHERE",
    "caption": "Paint, paper, and a very ambitious idea. The result was imperfect and completely wonderful.",
    "note": "Made with a happy heart.",
    "icon": "photo"
  },
  {
    "id": "wish-8",
    "title": "An ice-cream afternoon",
    "place": "ONE EXTRA SCOOP",
    "caption": "Choosing a flavour was the hardest decision of the day. Sprinkles made everything better.",
    "note": "Sweet little moments.",
    "icon": "food"
  },
  {
    "id": "wish-9",
    "title": "Cloud watching",
    "place": "A QUIET LITTLE BREAK",
    "caption": "For a while, the only task was finding shapes in the clouds and enjoying the breeze.",
    "note": "Slow days have their own magic.",
    "icon": "magic"
  },
  {
    "id": "wish-10",
    "title": "The puzzle challenge",
    "place": "ONE PIECE AT A TIME",
    "caption": "The missing piece was under the table all along. Finding it felt like a tiny victory.",
    "note": "Worth celebrating together.",
    "icon": "cards"
  },
  {
    "id": "wish-11",
    "title": "A garden discovery",
    "place": "SOMETHING NEW TO NOTICE",
    "caption": "A colourful butterfly and a winding path made a familiar place feel brand new.",
    "note": "Wonder is often nearby.",
    "icon": "flower"
  },
  {
    "id": "wish-12",
    "title": "Movie night favourites",
    "place": "PASS THE POPCORN",
    "caption": "Comfy cushions, a familiar film, and plenty of snacks made the perfect evening.",
    "note": "The best seat is a cosy one.",
    "icon": "family"
  },
  {
    "id": "wish-13",
    "title": "A homemade card",
    "place": "A LITTLE SOMETHING HANDMADE",
    "caption": "A few kind words and a drawing made this small card feel like a very special gift.",
    "note": "Keep the little things.",
    "icon": "gift"
  },
  {
    "id": "wish-14",
    "title": "More moments ahead",
    "place": "TO BE CONTINUED",
    "caption": "There are still so many little adventures to enjoy. Here is to collecting more reasons to smile.",
    "note": "Happy birthday — let the next chapter begin.",
    "icon": "magic"
  }
];
export type Chapter=typeof chapters[number];
export type StoryPhoto={id:string;title:string;caption:string;date:string;chapter?:string};
