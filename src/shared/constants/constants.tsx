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
import constructionImage from '../../assets/images/construction.png';
import osmose1 from '../../assets/images/projects/osmose1.png';
import osmose2 from '../../assets/images/projects/osmose2.jpg';
import osmose3 from '../../assets/images/projects/osmose3.png';
import osmose4 from '../../assets/images/projects/osmose4.png';
import si1 from '../../assets/images/projects/si1.png';
import si2 from '../../assets/images/projects/si2.jpg';
import si3 from '../../assets/images/projects/si3.jpg';
import si4 from '../../assets/images/projects/si4.jpg';
import si5 from '../../assets/images/projects/si5.jpeg';

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

export const contactForm = {
  successMessage: "Thank you for your message! I will get back to you as soon as possible :)",
  errorMessage: "There was an error sending your message. Please try again later.",
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

export const blogText = {
  heading: "Read my latest posts!"
}

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

export const underConstructionConstants = {
  title: 'Page under construction',
  title2: 'Oops! This page is under construction, check back later!',
  description: [],
  images: [constructionImage],
}
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
export const OsmoseConstants = {
  title: 'Osmose Utilities Services',
  title2: 'Software Engineer Co-Op',
  description: [
    "<strong>Website:</strong> Reach out for details.",
    "<strong>Agile:</strong>Azure",
    "<strong>Languages & Technologies:</strong>JavaScript, PHP, HTML, CSS, C#",
    "<strong>Time Frame:</strong> January 2019 - May 2019"
  ],
  images: [osmose1, osmose2, osmose3, osmose4],
  titleSection2: "What's Osmose?",
  descriptionSection2: ["Osmose is a corporation composed of field technicians, professional engineers, wood scientists, and corrosion experts, that identify and solve structural issues that help provide safe, reliable, affordable service."],
  titleSection3: 'Internal Application Development',
  descriptionSection3: ["Through my time at Osmose I built a internal administration tool using JavaScript/JQuery, HTML, & CSS. In doing this, I was also responsible for building endpoints for the application to access our extensive SQL database through using Ajax calls and connecting endpoints with C#."],
  titleSection4: 'Tutorial - Bootstrap Tour Library',
  descriptionSection4: ["Through being on the web development team at Osmose, I helped modify, customize and develop tutorial overlays and implementation using various tour overlay plugins. These included using Bootstrap Tour, Hopscotch, Shepherd, and Enjoyhint as a start and heavily editing these to be practical for an easy to use tutorial of our various front-end applications. I also had to modify functionality and aspects of each front end application I worked on to get these tutorials to function properly and customize them to exactly how we wanted them."],
  titleSection5: 'Development Process',
  descriptionSection5: ["This internal was reviewed through daily Scrum meetings, application development meetings, & sprint cycles with Azure DevOps. The application is set to release late March and will create an easy way for employees to be evaluated and inspected during Pole Inspections in real time."],
};

export const SiConstants = {
  title: 'Supplemental Instruction at RIT',
  title2: 'Java Instructor - Part Time',
  description: [
    "<strong>Website:</strong> <p><a href='https://www.rit.edu/academicsuccesscenter/supplemental-instruction'> https://www.rit.edu/academicsuccesscenter/supplemental-instruction</a></p>",
    "<strong>Agile:</strong> Azure",
    "<strong>Languages & Technologies:</strong> JavaScript, PHP, HTML, CSS, C#",
    "<strong>Time Frame:</strong> January 2019 - May 2019"
  ],
  images: [si1, si2, si3, si4, si5],
  titleSection2: "What's Supplemental Instruction?",
  descriptionSection2: ["Supplemental Instruction defined by RIT is facilitated by peer leaders who have previously completed the course, through structured, one-hour sessions encourage collaboration to identify what to learn and how to learn it. International data suggests that students who regularly attend SI sessions are more likely to earn a higher grade in the course."],
  titleSection3: 'Collaboration and Learning',
  descriptionSection3: ["Throughout my time as a Supplemental Instructor, I learned the importance of collaboration when it comes to how certain people may learn something better and how to create a variety of activities. Lots of times other Supplemental Instructors focused on sharing games/activities we created to engage students to come to sessions including matching games, more of a variety of programming challenges and more! Even if another student wasn't helping with a Java course, it would be for a course that contains similar concepts, which in the long run would help the students in my sessions. Overall you can learn a lot from your team!"],
  titleSection4: 'Communication',
  descriptionSection4: ["Explaining code or complicated processes to your peers can be difficult especially if someone is not familiar with a specific topic. As an Supplemental Instructor, we're faced with this challenge everyday to strive to teach people with a friendly and open attitude. This has and will continue to help me throughout my career as through my work experiences, I've had to explain what I have worked on multiple occasions. It's important to keep concepts simplistic and your thoughts organized when coming up with explanations. It's also essential to be a role model for your students and represent a model student to them. This was how I was able to recruit multiple Supplemental Instructors to our program to continue helping students!"],
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