import reactCompilerImage from '../assets/images/blog/reactcompiler1.png';
import bannerImage from '../assets/images/banner.jpg';
import skiingImage from '../assets/images/skiing.png';
import { BlogPost } from '../shared/types/types';

const blogPosts: BlogPost[] = [
  {
    slug: 'react-compiler',
    img: reactCompilerImage,
    tag: 'Engineering',
    title: 'The Future of the React Compiler',
    description:
      'The React Compiler is the shift that changes how we think about performance and how we structure day to day React work on a team. Here is how I have been thinking about it as a senior engineer.',
    markdownPath: '/blog/react-compiler.md',
    authors: [{ name: 'Zach Brown', avatar: '/static/images/avatar/1.jpg' }],
    date: 'July 9 2025',
    media: [
      {
        type: 'image',
        src: reactCompilerImage,
        alt: 'React Compiler Overview',
      },
    ],
  },
  {
    slug: 'engineering-leadership',
    img: bannerImage,
    tag: 'Leadership',
    title: 'Engineering Leadership: The Shift from Writing Code to Leading Systems',
    description:
      'Making the transition from individual contributor to technical lead is one of the most significant inflection points in a software engineering career. Here is what I wish I knew earlier.',
    markdownPath: '/blog/engineering-leadership.md',
    authors: [{ name: 'Zach Brown', avatar: '/static/images/avatar/1.jpg' }],
    date: 'March 9 2026',
    media: [
      {
        type: 'image',
        src: bannerImage,
        alt: 'Engineering leadership',
      },
    ],
  },
  {
    slug: 'gopro-ski-season',
    img: skiingImage,
    tag: 'Photography',
    title: 'GoPro Ski Season Compilation',
    description:
      'Some of my favorite shots from this ski season',
    markdownPath: '/blog/gopro-ski-season.md',
    authors: [{ name: 'Zach Brown', avatar: '/static/images/avatar/1.jpg' }],
    date: 'March 10 2026',
    media: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/watch?v=zB-bKCzcRvY',
      },
      {
        type: 'youtube',
        src: 'https://www.youtube.com/watch?v=fmZIYJMRGY0',
      },
    ],
  },
];

export default blogPosts;
