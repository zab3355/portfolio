import mindexImage1 from '../../assets/images/projects/mindex1.jpg';
import mindexImage2 from '../../assets/images/projects/mindex2.png';
import mindexImage3 from '../../assets/images/projects/mindex3.png';
import mindexImageFullSize from '../../assets/images/projects/mindexfullsize.jpg';
import wegmansImage1 from '../../assets/images/projects/wegmans1.jpg';
import wegmansImage2 from '../../assets/images/projects/wegmans2.png';
import wegmansImage3 from '../../assets/images/projects/wegmans3.png';
import wegmansImage4 from '../../assets/images/projects/wegmans4.png';
import theShoreImage from '../../assets/images/theshore.jpg';
import weatherWatcherImage from '../../assets/images/weatherwatcher.jpg';
import theShoreImage1 from '../../assets/images/projects/theshore1.gif';
import theShoreImage2 from '../../assets/images/projects/thrshore2.png';
import weatherWatcherImage1 from '../../assets/images/projects/weatherwatcher1.jpg';
import weatherWatcherImage2 from '../../assets/images/projects/weatherwatcher2.jpg';
import weatherWatcherImage3 from '../../assets/images/projects/weatherWatcher3.jpg';
import nbcUniImage from '../../assets/images/nbcuniversal.jpg';
import mindexImage from '../../assets/images/mindex.jpg';
import sandboxUnionImage from '../../assets/images/sandbox.jpg';
import sandboxImage1 from '../../assets/images/projects/sandbox1.png';
import sandboxImage2 from '../../assets/images/projects/sandbox2.jpg';
import sandboxImage3 from '../../assets/images/projects/sandboxhalf1.jpg';
import sandboxImage4 from '../../assets/images/projects/sandbox3.png';
import sandboxImage5 from '../../assets/images/projects/sandboxhalf2.jpg';
import wegmansImage from '../../assets/images/wegmans.jpg';
import osmoseImage from '../../assets/images/osmose.jpg';
import siImage from '../../assets/images/si.jpg';

export const splashText = {
  title: "Zachary Brown",
  typewriterTexts: ["I am a web developer", "Check out my projects"],
};

export const projectText = {
  title: "Latest Work",
}

export const contactText = {
  title: "Send a Message!",
  about: "If you wish to send me a message, contact me here!",
  location: "Boston, MA",
};
export const aboutText = {
  heading: "Hi, I’m Zach Brown!",
  body: `I'm a Boston-based full-stack developer with a passion for building web applications for NBCUniversal, where I architect and develop complex applications using cutting-edge technologies. I graduated from the Rochester Institute of Technology with a Bachelor of Science in New Media Interactive Development, a minor in Web & Mobile Development, and an immersion in Advertising and Public Relations.
  
  My full-stack expertise includes:`,
  expertise: [
    "<strong>Front-End Development:</strong> Advanced experience with React, Angular, and Vue, including server-side rendering, reusable UI component architecture, and modern design systems (Material UI, Ant Design).",
    "<strong>Back-End Engineering:</strong> Proficient in Node.js, Java Spring Boot, and C# .NET, with extensive database design and optimization using MySQL, PostgreSQL, DynamoDB, and MongoDB.",
    "<strong>Cloud & DevOps:</strong> Skilled in AWS (Lambda, EC2, DynamoDB, IAM), Docker, Kubernetes, and CI/CD pipelines (GitHub Actions, Jenkins).",
    "<strong>Design & UX:</strong> Experienced in UI/UX design with Figma and Adobe Creative Suite."
  ],
  conclusion: `
I thrive on turning complex challenges into streamlined, impactful solutions. If you're a recruiter seeking a versatile, results-driven developer or a business looking for a freelance partner, I’d love to connect. Feel free to reach out via my contact form — let's build something incredible together!`
};

export const projectBoxes = [
  { id: 1, type: 'Work', content: 'NBCUniversal', imageUrl: nbcUniImage, link: '/nbcuniversal' },
  { id: 2, type: 'Work', content: 'Mindex', imageUrl: mindexImage, link: '/mindex' },
  { id: 3, type: 'Work', content: 'Sandbox Union', imageUrl: sandboxUnionImage, link: '/sandboxUnion' },
  { id: 4, type: 'Work', content: 'Wegmans', imageUrl: wegmansImage, link: '/wegmans' },
  { id: 5, type: 'Work', content: 'Osmose', imageUrl: osmoseImage, link: '/osmose' },
  { id: 6, type: 'Work', content: 'Supplemental Instruction', imageUrl: siImage, link: '/si', },
  { id: 7, type: 'Personal', content: 'The Shore', imageUrl: theShoreImage, link: '/theShore' },
  { id: 8, type: 'Personal', content: 'Weather Watcher', imageUrl: weatherWatcherImage, link: '/weatherWatcher' },
];

/**
 * Work Project constants
 */
export const nbcUniversalConstants = {
  title: 'NBCUniversal',
  title2: 'Senior Software Engineer',
  description: [
    "<strong>Project URL:</strong> <a href='https://designed.cad.rit.edu/nmcapstone/project/the-shore'>Click here to interact!</a>",
    "<strong>Project Type:</strong>Team",
    "<strong>Technologies:</strong>Angular CLI, Heroku, MongoDB, Adobe Creative Cloud, Figma",
    "<strong>Languages:</strong> Typescript, JavaScript, HTML, SCSS"
  ],
  images: ['', theShoreImage2, theShoreImage1],
  titleSection2: 'The Shore',
  descriptionSection2: ['The Shore is an interactive web experience that will help connect and uplift people who feel disconnected, alone, or detached as a result of these difficult times by creating a space for users to release their emotions in a safe environment and see the impact that their words can have.'],
  titleSection3: 'The Shore',
  descriptionSection3: ["Our team created a webpage where you can view more details on this project and the live application! Click the project link above for more."],
};
export const mindexConstants = {
  title: 'Mindex',
  title2: 'Software Engineer',
  description: [
    "<strong>Web Links:</strong> <a href='https://www.mindex.com/'>https://mindex.com</a><br> <a href='https://www.paychex.com/'>https://paychex.com</a>",
    "<strong>Agile:</strong> Jira",
    "<strong>Languages & Technologies:</strong> Angular CLI, TypeScript, JavaScript, HTML, CSS, C#, SQL, Java, OpenShift, Figma",
    "<strong>Time Frame:</strong> Feburary 2021 - August 2022"
  ],
  images: [mindexImage1, '', mindexImage2, mindexImage3, '', mindexImageFullSize],
  titleSection2: '',
  descriptionSection2: ["I was a Full Stack Developer for Mindex Technologies Inc. working on Paychex Adminstrative internal applications. One of these applications is an Employee Assignment & Scheduling Engine (EASE). This is written with an Angular CLI frontend and a C# API with a SQL database deployed using OpenShift. I work with two other developers on this project as well as two testers to detail issues with user stories we work on or finding defects. In this position I gain exposure through talking to employers from the Paychex business, and beyond through developing unique ways to make sure our applications run smoothly."],
  titleSection3: 'The Process',
  descriptionSection3: ["Our team works within an Agile environment using Jira. I'm involved in daily standups, sprint cycles, corporate meetings, and discussing ideas with developers, designers and business analysts from Paychex and Mindex."],
  titleSection4: 'Application Development',
  descriptionSection4: ["Through developing this application we use a variety of technologies. We used Jenkins, OpenShift and Docker, as well as an Angular CLI frontend. Our API is run using C# with SQL Queries embedded, that connects to various services that allow data to be referenced throughout Paychex applications. We also use OptaPlanner, which is a JDK AI Constraint solver that optimizes and schedules data and solves optimization issues."],
  descriptionSectionFull: ["I worked full time remote in the middle of the COVID-19 pandemic while finishing my studies at the Rochester Institute of Technology. This was a unique challenge for me as at the time I was finishing up my Capstone project and finishing essential courses for my major. I was able to use what I was learning on the job within this project. I linked some screenshots of the application we're building. For more questions about any development for this application/other applications please contact me."]
};
export const sandboxUnionConstants = {
  title: 'Sandbox Union',
  title2: 'Full Stack Development Co-Op',
  description: [
    "<strong>Website:</strong> <a href='https://www.sandboxunion.com/'>https://sandboxunion.com</a>",
    "<strong>Agile:</strong>Jira",
    "<strong>Languages & Technologies:</strong>AngularJS & CLI, TypeScript, JavaScript, SQL, AWS, PHP, HTML, CSS",
    "<strong>Time Frame:</strong> August 2020 - Feburary 2021"
  ],
  images: [sandboxImage1, sandboxImage2, sandboxImage3, sandboxImage4, sandboxImage5],
  titleSection2: "What's Sandbox Union?",
  descriptionSection2: ["SandBox Union is a team of software developers, designers and technology experts that specialize in custom web and mobile application development. They work with everyone from startups, government and the enterprise; focusing on people-oriented solutions. During my time at Sandbox Union, I was involved with developing various web applications."],
  titleSection3: 'Angular Leaderboard',
  descriptionSection3: ["During our first week at Sandbox Union, Dana and I were tasked with creating a leaderboard for a gaming tournament at the gaming bar PlayerzZone for their Madden tournament. We decided to use Google Firebase as our Database and have an AngularJS frontend. Our scoreboard also had an admin section, where a user could adjust their scores, add new teams, and edit their teams. Below I've linked our Github project as well as blog posts relating to our project.",
    "<h5>Github Link:</h5><p><a href='https://github.com/zab3355/angularleaderboard'> https://github.com/zab3355/angularleaderboard</a></p>"],
  titleSection4: 'Angular Leaderboard',
  descriptionSection4: ["During our first week at Sandbox Union, Dana and I were tasked with creating a leaderboard for a gaming tournament at the gaming bar PlayerzZone for their Madden tournament. We decided to use Google Firebase as our Database and have an AngularJS frontend. Our scoreboard also had an admin section, where a user could adjust their scores, add new teams, and edit their teams. Below I've linked our Github project as well as blog posts relating to our project."],
  titleSection5: 'Angular Leaderboard',
  descriptionSection5: ["During our first week at Sandbox Union, Dana and I were tasked with creating a leaderboard for a gaming tournament at the gaming bar PlayerzZone for their Madden tournament. We decided to use Google Firebase as our Database and have an AngularJS frontend. Our scoreboard also had an admin section, where a user could adjust their scores, add new teams, and edit their teams. Below I've linked our Github project as well as blog posts relating to our project."],

};
export const wegmansConstants = {
  title: 'Wegmans',
  title2: 'Web Application Developer Co-Op',
  description: [
    "<strong>Project Links:</strong> <a href='https://wegmans.com'>https://wegmans.com</a> <a href='https://shop.wegmans.com'>https://shop.wegmans.com</a>",
    "<strong>Agile:</strong> Azure",
    "<strong>Languages:</strong> JavaScript, PHP, HTML, CSS, C#",
    "<strong>Time Frame:</strong>June 2019 - January 2020",
  ],
  images: [wegmansImage1, wegmansImage2, wegmansImage3, wegmansImage4],
  descriptionSection2: ["I was a part of the Wegmans Web Application Development Team. I was involved within the front-end development team where we developed the Wegmans.com pages through developing a custom Wordpress theme using PHP and JavaScript, login functionality using Azure B2C, and working to communicate with Wegmans UX designers on the website. At points of the project when resources were needed, I moved to the back-end development team to work on JSON databases and C# sorting algorithms for Shop.Wegmans.com. Towards the end of the project, I was involved within Quality Assurance for the website, mobile app, and IT Support for Wegmans Employees having trouble with any Wegmans software/finding bugs."],
  titleSection3: 'The Process',
  descriptionSection3: ["Our team worked within an Agile environment using Microsoft Azure DevOps. I was involved in daily standups, sprint cycles, corporate meetings, and discussing ideas with developers/designers from companies including Instacart, Unata, and Solu. We also had access to all the other team's development boards using Jira. Our team heavily relied on communication, as we used Slack and Microsoft Teams to communication with fellow developers, designers, Wegmans Administrators, Instacart, Unata, and Solu."],
  titleSection4: 'Wordpress Development',
  descriptionSection4: ["I was tasked with helping the front end development team build their custom WordPress theme using primarily PHP, JavaScript, HTML and CSS. I was also required to create and use custom plugins that would help the Wegmans.com website be more efficient, while making it easy for anyone with little knowledge to create a blog post or change banners/images on the website. We also worked on helping improve Wegmans SEO. I also helped develop off of Zeplin Prototypes from professional Wegmans UX Designers, which took a lot of communication from our development and design team to make both sides satisfied."],
  descriptionSectionFull: ["Through working at a corporation that's so large, I gained connections with other interns, Wegmans employees, Wegmans corporate higher-ups, and even designers and developers from other companies. We were able to collaborate on various ideas to improve our projects, from people working on the Wegmans employee portal, to accountant work, to environmental preservation efforts that Wegmans was enforcing. Through these connections I brought back valuable information and knowledge to my team to improve on our project. These connections were irreplaceable, and these were more solidified by having activities outside the office as well to build these connections further by having a volleyball league, going out for lunch, and getting breakfast pizza!"],
};
/**
 * Personal Project constants
 */
export const theShoreConstants = {
  title: 'The Shore',
  title2: 'Personal Project',
  description: [
    "<strong>Project URL:</strong> <a href='https://designed.cad.rit.edu/nmcapstone/project/the-shore'>Click here to interact!</a>",
    "<strong>Project Type:</strong> Team",
    "<strong>Technologies:</strong> Angular CLI, Heroku, MongoDB, Adobe Creative Cloud, Figma",
    "<strong>Languages:</strong> Typescript, JavaScript, HTML, SCSS"
  ],
  images: ['', theShoreImage2, theShoreImage1],
  titleSection2: 'The Shore',
  descriptionSection2: ['The Shore is an interactive web experience that will help connect and uplift people who feel disconnected, alone, or detached as a result of these difficult times by creating a space for users to release their emotions in a safe environment and see the impact that their words can have.'],
  titleSection3: 'The Shore',
  descriptionSection3: ["Our team created a webpage where you can view more details on this project and the live application! Click the project link above for more."],
  videoHeaderUrl: 'https://www.youtube.com/embed/hZF0-wsWT6g'
};

export const weatherWatcherConstants = {
  title: 'Weather Watcher',
  title2: 'Personal Project',
  description: [
    "<strong>Project URL:</strong> <a style='color: #F47C01; text-decoration: none;' href='https://people.rit.edu/~zab5957/141/cs/project3/map-simple.html'>Click here to interact!</a>",
    "<strong>Project Type:</strong> Individual",
    "<strong>Technologies:</strong> Front End Development",
    "<strong>Languages:</strong> JavaScript, JQuery, Node.JS, HTML, CSS."
  ],
  images: [weatherWatcherImage1, weatherWatcherImage2, weatherWatcherImage3],
  titleSection2: 'Weather Watcher',
  descriptionSection2: ['Created a Node.JS application called Weather Watcher. This figured out what a user should wear depending on precipitation, and temperature. I used the Google Maps API and OpenWeatherMaps API. Included is a list of clothing based upon specific weather conditions (below 40 degrees long sleeve, above 40 degrees short sleeve shirt, to wear a heavy jacket or a snow/ice storm.)  Fontawesome icons included to show weather changes.'],
  titleSection3: 'How it Works',
  descriptionSection3: ["This application is able to track what you should wear based upon location. You can either search by city or current location. Due to this being hosted on Heroku, it might take around 10-15 seconds initially for you to receive any results. You can also view the screenshots below."]
};