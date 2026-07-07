// NBCUniversal section images
import nbcUniImage from '../assets/images/nbcuniversal.jpg';
import nbc0 from '../assets/images/projects/nbc0.png';
import nbc1 from '../assets/images/projects/nbc1.webp';
import nbc2 from '../assets/images/projects/nbc2.png';
import nbc3 from '../assets/images/projects/nbc3.png';

import constructionImage from '../assets/images/construction.png';
import miseBannerSvg from '../assets/images/mise-banner.svg';

// Mindex section images
import mindexImage1 from '../assets/images/projects/mindex1.jpg';
import mindexImage2 from '../assets/images/projects/mindex2.png';
import mindexImage3 from '../assets/images/projects/mindex3.png';

// Sandbox section images
import sandboxImage1 from '../assets/images/projects/sandbox1.webp';
import sandboxImage2 from '../assets/images/projects/sandbox2.jpg';
import sandboxImage3 from '../assets/images/projects/sandboxhalf1.jpg';
import sandboxImage4 from '../assets/images/projects/sandbox3.png';

// Wegmans section images
import wegmansImage1 from '../assets/images/projects/wegmans1.webp';
import wegmansImage2 from '../assets/images/projects/wegmans2.png';
import wegmansImage3 from '../assets/images/projects/wegmans3.webp';
import wegmansImage4 from '../assets/images/projects/wegmans4.webp';

// Osmose section images
import osmose1 from '../assets/images/projects/osmose1.png';
import osmose2 from '../assets/images/projects/osmose2.webp';
import osmose3 from '../assets/images/projects/osmose3.png';
import osmose4 from '../assets/images/projects/osmose4.png';

// SI section images
import si1 from '../assets/images/projects/si1.webp';
import si2 from '../assets/images/projects/si2.webp';
import si3 from '../assets/images/projects/si3.webp';
import si4 from '../assets/images/projects/si4.jpg';

// The Shore section images
import theShoreImage1 from '../assets/images/projects/theshore1.webm';
import theShoreImage2 from '../assets/images/projects/thrshore2.webp';

// Weather Watcher section images
import weatherWatcherImage1 from '../assets/images/projects/weatherwatcher1.jpg';
import weatherWatcherImage2 from '../assets/images/projects/weatherwatcher2.webp';
import weatherWatcherImage3 from '../assets/images/projects/weatherWatcher3.webp';

export interface ProjectSection {
  title?: string;
  /** string = paragraph, string[] = bullet list */
  body: string | string[];
  image?: string;
  imageAlt?: string;
  videoUrl?: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  subtitle: string;
  tag: 'Work' | 'Personal';
  heroImage?: string;
  videoUrl?: string;
  /** Bullet points shown in the first overview column alongside heroImage */
  overviewBullets: string[];
  sections?: ProjectSection[];
  closingText?: string;
}

// ─────────────────────────────────────────────────────────────────
// WORK PROJECTS
// ─────────────────────────────────────────────────────────────────

export const nbcUniversalData: ProjectData = {
  slug: 'nbcUniversal',
  title: 'NBCUniversal',
  subtitle: 'Senior Software Engineer',
  tag: 'Work',
  heroImage: nbcUniImage,
  overviewBullets: [
    '<strong>Time Frame:</strong> August 2022 – Present',
    '<strong>Role:</strong> Senior Software Engineer / Engineering Lead',
    '<strong>Teams:</strong> 4 cross-functional engineering teams, 16+ developers',
    '<strong>Stack:</strong> React 18, Angular, .NET Core, Java Spring Boot, AWS, Docker, Kubernetes',
    '<strong>Platforms:</strong> Live broadcast, scheduling, digital asset management',
  ],
  sections: [
    {
      title: 'Engineering Leadership',
      body: [
        'Project Lead for four cross-functional engineering teams across live broadcast, scheduling, and asset management platforms.',
        'Drive agile ceremonies including sprint planning, backlog refinement, retrospectives; maintain technical roadmap execution while ensuring on-time delivery.',
        'Partner with executive leadership, VP-level stakeholders, QA teams, and product managers to align engineering efforts with delivery timelines per business requirements.',
        'Mentor junior and mid-level engineers on architecture decisions, code quality standards, and best practices; conducted 15+ technical interviews for team expansion.',
      ],
      image: nbc0,
      imageAlt: 'NBCUniversal Engineering — placeholder, replace with screenshot',
    },
    {
      title: 'Digital Assets Library (DALI)',
      body: [
        'Technical lead for enterprise graphics management platform serving 2,000+ NBC users for managing file management, graphic storage and distribution with 100% uptime.',
        'Architected and delivered V1 platform migration supporting NBC/Versant Media corporate spinoff. Executed complex data migration scripts transferring 500k+ assets between production environments with zero downtime.',
        'Built dual-platform solution: Angular/Kendo UI web application and .NET Windows Forms desktop client with DevExpress library. Designed backend microservices in C# (.NET Core) with PostgreSQL databases; implemented OpenSearch/ElasticSearch for fast asset search.',
        'Designed application architecture for deploying containerized infrastructure; collaborated with DevOps on Docker, Kubernetes, Helm charts, AWS S3, SQS, and Redis caching.',
        'Engineered notification system integrating SmtpClient class with Slack and Microsoft Teams based on user preference management.',
        '<strong>Impact:</strong> Eliminated legacy AngularJS/SQL Server dependency; improved search performance 10x; enabled seamless spinoff of 40% of user base.',
      ],
      image: nbc1,
      imageAlt: 'DALI application — placeholder, replace with screenshot',
    },
    {
      title: 'Media Acquisition Portal (MAP)',
      body: [
        'Applications handle scheduling and coordinating all aspects of TV-News broadcasts, which reduced cost in production logistics.',
        'Architected full stack React 18 application using Material UI and FullCalendar integration for responsive scheduling interface.',
        'Applied React 18 best practices: Context API, custom hooks for component state management, minimal code-reuse, and minimal re-renders for optimal performance.',
        'Designed role-based access control (RBAC) system integrated with Active Directory group-based authentication using JWT SSO supporting 500+ users.',
        'Built AWS Lambda serverless APIs with DynamoDB backend; leveraged VPC endpoints, IAM policies, and EC2 instances prioritizing scalability and security.',
        '<strong>Recognition:</strong> Selected as organization-wide reference architecture for modern web applications.',
      ],
      image: nbc2,
      imageAlt: 'MAP scheduling interface — placeholder, replace with screenshot',
    },
    {
      title: 'Live Shot Manager (LSM)',
      body: [
        'Control room management system for live broadcast coordination across 50+ NBC studios.',
        'Features include drag-and-drop interface, scheduling, and export capabilities (PDF, Excel).',
        'Led architecture of React 18 frontend with Ant Design; Java Spring Boot microservices backend with MySQL 8.0 database.',
        'Integrated external systems: SIP/PIN telephony, live broadcast scheduling, and communications platforms.',
        'Executed MySQL 5.6 to 8.0 upgrade, significantly improving database transaction performance.',
        '<strong>Impact:</strong> Streamlined live broadcast setup for producers; eliminated scheduling conflicts and reduced amount of time required for production.',
      ],
      image: nbc3,
      imageAlt: 'LSM control room interface — placeholder, replace with screenshot',
    },
    {
      title: 'Additional Contributions',
      body: [
        '<strong>VPCR & Outage Portal</strong> — Technical Advisor for multi-cloud resource management platform integrating with 38+ AWS EC2 instances utilizing Go (Golang) REST API.',
        '<strong>Guest Tracker</strong> — Delivered SSO authentication system and mock user framework for QA automation.',
        '<strong>PSE Notifications Portal</strong> — Built email templating system and notification UI components.',
        '<strong>Security & DevOps</strong> — Addressed 50+ Snyk critical vulnerabilities; upgraded ESLint configurations; participated in multi-environment deployment strategies (dev/qa/stage/prod).',
        '<strong>On-Call Support</strong> — Providing 24/7 production support; resolved outages with average MTTR under 30 minutes.',
      ],
    },
  ],
};

export const mindexData: ProjectData = {
  slug: 'mindex',
  title: 'Mindex',
  subtitle: 'Software Engineer',
  tag: 'Work',
  heroImage: mindexImage1,
  overviewBullets: [
    "<strong>Web Links:</strong> <a href='https://www.mindex.com/'>https://mindex.com</a><br> <a href='https://www.paychex.com/'>https://paychex.com</a>",
    '<strong>Agile:</strong> Jira',
    '<strong>Languages & Technologies:</strong> Angular CLI, TypeScript, JavaScript, HTML, CSS, C#, SQL, Java, OpenShift, Figma',
    '<strong>Time Frame:</strong> February 2021 - August 2022',
  ],
  sections: [
    {
      title: 'Software Engineer',
      body: "I was a Full Stack Developer for Mindex Technologies Inc. working on Paychex Adminstrative internal applications. One of these applications is an Employee Assignment & Scheduling Engine (EASE). This is written with an Angular CLI frontend and a C# API with a SQL database deployed using OpenShift. I work with two other developers on this project as well as two testers to detail issues with user stories we work on or finding defects. In this position I gain exposure through talking to employers from the Paychex business, and beyond through developing unique ways to make sure our applications run smoothly.",
      image: mindexImage2,
      imageAlt: 'Mindex EASE application',
    },
    {
      title: 'The Process',
      body: "Our team works within an Agile environment using Jira. I'm involved in daily standups, sprint cycles, corporate meetings, and discussing ideas with developers, designers and business analysts from Paychex and Mindex.",
      image: mindexImage3,
      imageAlt: 'Mindex development process',
    },
    {
      title: 'Application Development',
      body: 'Through developing this application we use a variety of technologies. We used Jenkins, OpenShift and Docker, as well as an Angular CLI frontend. Our API is run using C# with SQL Queries embedded, that connects to various services that allow data to be referenced throughout Paychex applications. We also use OptaPlanner, which is a JDK AI Constraint solver that optimizes and schedules data and solves optimization issues.',
    },
  ],
  closingText: "I worked full time remote in the middle of the COVID-19 pandemic while finishing my studies at the Rochester Institute of Technology. This was a unique challenge for me as at the time I was finishing up my Capstone project and finishing essential courses for my major. I was able to use what I was learning on the job within this project. I linked some screenshots of the application we're building. For more questions about any development for this application/other applications please contact me.",
};

export const sandboxUnionData: ProjectData = {
  slug: 'sandboxUnion',
  title: 'Sandbox Union',
  subtitle: 'Full Stack Development Co-Op',
  tag: 'Work',
  heroImage: sandboxImage1,
  overviewBullets: [
    "<strong>Website:</strong> <a href='https://www.sandboxunion.com/'>https://sandboxunion.com</a>",
    '<strong>Agile:</strong> Jira',
    '<strong>Languages & Technologies:</strong> AngularJS & CLI, TypeScript, JavaScript, SQL, AWS, PHP, HTML, CSS',
    '<strong>Time Frame:</strong> August 2020 - February 2021',
  ],
  sections: [
    {
      title: "What's Sandbox Union?",
      body: 'SandBox Union is a team of software developers, designers and technology experts that specialize in custom web and mobile application development. They work with everyone from startups, government and the enterprise; focusing on people-oriented solutions. During my time at Sandbox Union, I was involved with developing various web applications.',
      image: sandboxImage2,
      imageAlt: 'Sandbox Union office',
    },
    {
      title: 'Angular Leaderboard',
      body: [
        "During our first week at Sandbox Union, Dana and I were tasked with creating a leaderboard for a gaming tournament at the gaming bar PlayerzZone for their Madden tournament. We decided to use Google Firebase as our Database and have an AngularJS frontend. Our scoreboard also had an admin section, where a user could adjust their scores, add new teams, and edit their teams. Below I've linked our Github project as well as blog posts relating to our project.",
        "<strong>Github Link:</strong> <a href='https://github.com/zab3355/angularleaderboard'>https://github.com/zab3355/angularleaderboard</a>",
      ],
      image: sandboxImage3,
      imageAlt: 'Angular Leaderboard',
    },
    {
      title: 'Additional Projects',
      body: 'During my time at Sandbox Union, I was involved with developing various web applications for a range of clients — from startups to government agencies. This included AngularJS frontends, PHP backends, SQL databases, and AWS infrastructure.',
      image: sandboxImage4,
      imageAlt: 'Sandbox Union project work',
    },
  ],
};

export const wegmansData: ProjectData = {
  slug: 'wegmans',
  title: 'Wegmans',
  subtitle: 'Web Application Developer Co-Op',
  tag: 'Work',
  heroImage: wegmansImage1,
  overviewBullets: [
    "<strong>Project Links:</strong> <a href='https://wegmans.com'>https://wegmans.com</a> <a href='https://shop.wegmans.com'>https://shop.wegmans.com</a>",
    '<strong>Agile:</strong> Azure',
    '<strong>Languages:</strong> JavaScript, PHP, HTML, CSS, C#',
    '<strong>Time Frame:</strong> June 2019 - January 2020',
  ],
  sections: [
    {
      title: 'Web Application Developer Co-Op',
      body: "I was a part of the Wegmans Web Application Development Team. I was involved within the front-end development team where we developed the Wegmans.com pages through developing a custom Wordpress theme using PHP and JavaScript, login functionality using Azure B2C, and working to communicate with Wegmans UX designers on the website. At points of the project when resources were needed, I moved to the back-end development team to work on JSON databases and C# sorting algorithms for Shop.Wegmans.com. Towards the end of the project, I was involved within Quality Assurance for the website, mobile app, and IT Support for Wegmans Employees having trouble with any Wegmans software/finding bugs.",
      image: wegmansImage2,
      imageAlt: 'Wegmans.com development',
    },
    {
      title: 'The Process',
      body: "Our team worked within an Agile environment using Microsoft Azure DevOps. I was involved in daily standups, sprint cycles, corporate meetings, and discussing ideas with developers/designers from companies including Instacart, Unata, and Solu. We also had access to all the other team's development boards using Jira. Our team heavily relied on communication, as we used Slack and Microsoft Teams to communicate with fellow developers, designers, Wegmans Administrators, Instacart, Unata, and Solu.",
      image: wegmansImage3,
      imageAlt: 'Agile development process',
    },
    {
      title: 'Wordpress Development',
      body: "I was tasked with helping the front end development team build their custom WordPress theme using primarily PHP, JavaScript, HTML and CSS. I was also required to create and use custom plugins that would help the Wegmans.com website be more efficient, while making it easy for anyone with little knowledge to create a blog post or change banners/images on the website. We also worked on helping improve Wegmans SEO. I also helped develop off of Zeplin Prototypes from professional Wegmans UX Designers, which took a lot of communication from our development and design team to make both sides satisfied.",
      image: wegmansImage4,
      imageAlt: 'WordPress custom theme',
    },
  ],
  closingText: "Through working at a corporation that's so large, I gained connections with other interns, Wegmans employees, Wegmans corporate higher-ups, and even designers and developers from other companies. We were able to collaborate on various ideas to improve our projects, from people working on the Wegmans employee portal, to accountant work, to environmental preservation efforts that Wegmans was enforcing. Through these connections I brought back valuable information and knowledge to my team to improve on our project. These connections were irreplaceable, and these were more solidified by having activities outside the office as well to build these connections further by having a volleyball league, going out for lunch, and getting breakfast pizza!",
};

export const osmoseData: ProjectData = {
  slug: 'osmose',
  title: 'Osmose Utilities Services',
  subtitle: 'Software Engineer Co-Op',
  tag: 'Work',
  heroImage: osmose1,
  overviewBullets: [
    '<strong>Website:</strong> Reach out for details.',
    '<strong>Agile:</strong> Azure',
    '<strong>Languages & Technologies:</strong> JavaScript, PHP, HTML, CSS, C#',
    '<strong>Time Frame:</strong> January 2019 - May 2019',
  ],
  sections: [
    {
      title: "What's Osmose?",
      body: 'Osmose is a corporation composed of field technicians, professional engineers, wood scientists, and corrosion experts, that identify and solve structural issues that help provide safe, reliable, affordable service.',
      image: osmose2,
      imageAlt: 'Osmose utilities',
    },
    {
      title: 'Internal Application Development',
      body: 'Through my time at Osmose I built a internal administration tool using JavaScript/JQuery, HTML, & CSS. In doing this, I was also responsible for building endpoints for the application to access our extensive SQL database through using Ajax calls and connecting endpoints with C#.',
      image: osmose3,
      imageAlt: 'Internal application',
    },
    {
      title: 'Tutorial - Bootstrap Tour Library',
      body: 'Through being on the web development team at Osmose, I helped modify, customize and develop tutorial overlays and implementation using various tour overlay plugins. These included using Bootstrap Tour, Hopscotch, Shepherd, and Enjoyhint as a start and heavily editing these to be practical for an easy to use tutorial of our various front-end applications. I also had to modify functionality and aspects of each front end application I worked on to get these tutorials to function properly and customize them to exactly how we wanted them.',
      image: osmose4,
      imageAlt: 'Bootstrap Tour overlay',
    },
  ],
};

export const siData: ProjectData = {
  slug: 'si',
  title: 'Supplemental Instruction at RIT',
  subtitle: 'Java Instructor - Part Time',
  tag: 'Work',
  heroImage: si1,
  overviewBullets: [
    "<strong>Website:</strong> <a href='https://www.rit.edu/academicsuccesscenter/supplemental-instruction'>https://www.rit.edu/academicsuccesscenter/supplemental-instruction</a>",
    '<strong>Agile:</strong> Azure',
    '<strong>Languages & Technologies:</strong> JavaScript, PHP, HTML, CSS, C#',
    '<strong>Time Frame:</strong> January 2019 - May 2019',
  ],
  sections: [
    {
      title: "What's Supplemental Instruction?",
      body: "Supplemental Instruction defined by RIT is facilitated by peer leaders who have previously completed the course, through structured, one-hour sessions encourage collaboration to identify what to learn and how to learn it. International data suggests that students who regularly attend SI sessions are more likely to earn a higher grade in the course.",
      image: si2,
      imageAlt: 'Supplemental Instruction session',
    },
    {
      title: 'Collaboration and Learning',
      body: "Throughout my time as a Supplemental Instructor, I learned the importance of collaboration when it comes to how certain people may learn something better and how to create a variety of activities. Lots of times other Supplemental Instructors focused on sharing games/activities we created to engage students to come to sessions including matching games, more of a variety of programming challenges and more! Even if another student wasn't helping with a Java course, it would be for a course that contains similar concepts, which in the long run would help the students in my sessions. Overall you can learn a lot from your team!",
      image: si3,
      imageAlt: 'Collaborative learning',
    },
    {
      title: 'Communication',
      body: "Explaining code or complicated processes to your peers can be difficult especially if someone is not familiar with a specific topic. As an Supplemental Instructor, we're faced with this challenge everyday to strive to teach people with a friendly and open attitude. This has and will continue to help me throughout my career as through my work experiences, I've had to explain what I have worked on multiple occasions. It's important to keep concepts simplistic and your thoughts organized when coming up with explanations. It's also essential to be a role model for your students and represent a model student to them. This was how I was able to recruit multiple Supplemental Instructors to our program to continue helping students!",
      image: si4,
      imageAlt: 'Communication and teaching',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// PERSONAL PROJECTS
// ─────────────────────────────────────────────────────────────────

export const theShoreData: ProjectData = {
  slug: 'theShore',
  title: 'The Shore',
  subtitle: 'Personal Project',
  tag: 'Personal',
  videoUrl: 'https://www.youtube.com/embed/hZF0-wsWT6g',
  overviewBullets: [
    "<strong>Project URL:</strong> <a href='https://designed.cad.rit.edu/nmcapstone/project/the-shore'>Click here to interact!</a>",
    '<strong>Project Type:</strong> Team',
    '<strong>Technologies:</strong> Angular CLI, Heroku, MongoDB, Adobe Creative Cloud, Figma',
    '<strong>Languages:</strong> Typescript, JavaScript, HTML, SCSS',
  ],
  sections: [
    {
      title: 'The Shore',
      body: 'The Shore is an interactive web experience that will help connect and uplift people who feel disconnected, alone, or detached as a result of these difficult times by creating a space for users to release their emotions in a safe environment and see the impact that their words can have.',
      image: theShoreImage2,
      imageAlt: 'The Shore web experience',
    },
    {
      title: 'The Project',
      body: 'Our team created a webpage where you can view more details on this project and the live application! Click the project link above for more.',
      image: theShoreImage1,
      imageAlt: 'The Shore interactive demo',
    },
  ],
};

export const weatherWatcherData: ProjectData = {
  slug: 'weatherWatcher',
  title: 'Weather Watcher',
  subtitle: 'Personal Project',
  tag: 'Personal',
  heroImage: weatherWatcherImage1,
  overviewBullets: [
    "<strong>Project URL:</strong> <a style='color: #F47C01; text-decoration: none;' href='https://people.rit.edu/~zab5957/141/cs/project3/map-simple.html'>Click here to interact!</a>",
    '<strong>Project Type:</strong> Individual',
    '<strong>Technologies:</strong> Front End Development',
    '<strong>Languages:</strong> JavaScript, JQuery, Node.JS, HTML, CSS.',
  ],
  sections: [
    {
      title: 'Weather Watcher',
      body: 'Created a Node.JS application called Weather Watcher. This figured out what a user should wear depending on precipitation, and temperature. I used the Google Maps API and OpenWeatherMaps API. Included is a list of clothing based upon specific weather conditions (below 40 degrees long sleeve, above 40 degrees short sleeve shirt, to wear a heavy jacket or a snow/ice storm.) Fontawesome icons included to show weather changes.',
      image: weatherWatcherImage2,
      imageAlt: 'Weather Watcher interface',
    },
    {
      title: 'How it Works',
      body: 'This application is able to track what you should wear based upon location. You can either search by city or current location. Due to this being hosted on Heroku, it might take around 10-15 seconds initially for you to receive any results. You can also view the screenshots below.',
      image: weatherWatcherImage3,
      imageAlt: 'Weather Watcher results',
    },
  ],
};

export const miseData: ProjectData = {
  slug: 'mise',
  title: 'Mise',
  subtitle: 'Personal Project',
  tag: 'Personal',
  heroImage: miseBannerSvg,
  overviewBullets: [
    "<strong>Live Site:</strong> <a href='https://mise.zabrown.com/' target='_blank'>mise.zabrown.com</a>",
    "<strong>GitHub:</strong> <a href='https://github.com/zab3355/mise' target='_blank'>github.com/zab3355/mise</a>",
    '<strong>Project Type:</strong> Individual',
    '<strong>Stack:</strong> React 19, TypeScript, Material-UI, Express, Groq API, Docker',
  ],
  sections: [
    {
      title: 'What is Mise?',
      body: "Mise is a recipe app that uses Groq's LLM API to take any recipe name and generate a detailed, user-friendly version of it. What makes it different is that it doesn't just give you one recipe — it generates four variants at once: a base version, a meat version, a vegan version, and a gluten-free version. You can also scale ingredient quantities dynamically for any serving size. Unsplash integration pulls in a beautiful food photo to go with every recipe.",
      image: constructionImage,
      imageAlt: 'Mise recipe app — placeholder, replace with screenshot',
    },
    {
      title: 'How It Works',
      body: [
        'Type any recipe name into the search bar and the Express backend sends a structured prompt to the Groq LLM.',
        'Groq returns a JSON response that is validated end-to-end using Zod schemas to guarantee data integrity before it ever hits the UI.',
        'A 24-hour caching layer on the server means popular recipes return instantly without hitting the API again.',
        'The React frontend renders the recipe with variant tabs (Base, Meat, Vegan, Gluten-Free) and a servings selector that scales every ingredient automatically.',
      ],
      image: constructionImage,
      imageAlt: 'Mise recipe generation — placeholder, replace with screenshot',
    },
    {
      title: 'Architecture',
      body: [
        '<strong>Frontend:</strong> React 19 + TypeScript, Material-UI 7, Vite 7, Zod 4 for client-side validation.',
        '<strong>Backend:</strong> Express 5 + TypeScript, Groq API (llama-3.1-8b-instant), Unsplash API, Node-fetch, Zod 4.',
        '<strong>DevOps:</strong> Docker Compose for local and production deployments, Nginx for serving static files.',
        'The server and frontend each run in their own Docker container. Docker Compose wires them together with container networking so the frontend talks to the API at http://api:3001.',
      ],
    },
  ],
};
