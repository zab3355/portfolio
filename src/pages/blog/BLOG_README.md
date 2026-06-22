# Adding a New Blog Post

Follow these 3 steps every time you create a new post.

---

## Step 1 — Write the content

Create a Markdown file in `public/blog/`:

```
public/
  blog/
    your-post-slug.md   ← new file here
```

Standard Markdown is supported. Images inside the post should go in `public/blog/images/` and be referenced as relative paths:

```md
# My Post Title

Intro paragraph here.

![Alt text](./images/my-image.png)

More content...
```

---

## Step 2 — Add a card image

Drop a card thumbnail image into `src/assets/images/blog/` (PNG or JPG, ~800×450px recommended for the 16:9 card ratio).

---

## Step 3 — Register the post in `blogPosts.ts`

Open `src/data/blogPosts.ts` and add an entry to the array. New posts appear in the order they are listed.

```ts
import myCardImage from '../assets/images/blog/my-image.png';

{
  slug: 'your-post-slug',        // Must match the filename from Step 1 (without .md)
  img: myCardImage,              // Card thumbnail
  tag: 'Engineering',            // Short label shown on the card chip
  title: 'Your Post Title',
  description: 'A one or two sentence summary shown on the card preview.',
  markdownPath: '/blog/your-post-slug.md',  // Path relative to public/
  authors: [{ name: 'Zach Brown', avatar: '/static/images/avatar/1.jpg' }],
  date: 'June 21 2026',
  media: [
    // Optional — see Media section below
  ],
},
```

That's it. The post will be live at `/blog/your-post-slug`.

---

## Media options

The `media` array controls what appears at the bottom of the post detail page.

### Hero image only (most posts)
```ts
media: [
  { type: 'image', src: myCardImage, alt: 'Description' },
],
```
The first `image` entry becomes the hero banner at the top of the post. No other images appear at the bottom.

### YouTube video(s)
```ts
media: [
  { type: 'youtube', src: 'https://www.youtube.com/watch?v=VIDEO_ID' },
  { type: 'youtube', src: 'https://www.youtube.com/watch?v=ANOTHER_ID' }, // optional second
],
```
Videos render side-by-side on desktop, stacked on mobile. The player is lazy-loaded so it won't slow down initial page load.

### Self-hosted video
```ts
media: [
  { type: 'video', src: '/blog/videos/my-clip.mp4' },
],
```
Place the file in `public/blog/videos/`.

### No media
Omit the field entirely or pass an empty array.

---

## Slug naming convention

- All lowercase, words separated by hyphens: `my-post-title`
- Match the `.md` filename exactly
- Avoid special characters or spaces

---

## TypeScript reference

The full `BlogPost` type lives in `src/shared/types/types.tsx`:

```ts
export interface BlogPost {
  slug: string;
  img: string;
  tag: string;
  title: string;
  description: string;   // Shown as card preview; also used as post content if markdownPath is omitted
  markdownPath: string;  // Path to .md file in public/
  authors: BlogAuthor[];
  date: string;
  media?: BlogMedia[];
}
```
