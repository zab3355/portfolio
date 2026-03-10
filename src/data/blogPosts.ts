import reactCompilerImage from '../assets/images/blog/reactcompiler1.png';
import { BlogPost } from '../shared/types/types';

const blogPosts: BlogPost[] = [
  {
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
        src: '/static/images/blog/react-compiler-overview.jpg',
        alt: 'React Compiler Overview',
      },
    ],
  },
];

export default blogPosts;
