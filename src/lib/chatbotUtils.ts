const portfolioInfo = {
    name: 'Julius',
    title: 'Software Engineer',
    skills: [
      'Full Stack Development',
      'React', 
      'Next.js', 
      'TypeScript', 
      'JavaScript', 
      'HTML', 
      'CSS', 
      'Node.js',
      'Git'
    ],
    projects: [
      {
        name: 'Portfolio Website',
        description: 'A personal portfolio website showcasing my projects and skills.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS']
      },
    ],
    experience: [
      {
        title: 'Software Engineer',
        company: 'Current Company',
        period: 'Present',
        description: 'Working as a full stack developer creating web applications.'
      }
    ],
    education: {
      degree: 'Engineering Degree',
      institution: 'University of Waterloo',
      year: 'Graduated'
    },
    contact: {
      email: 'contact@example.com',
      linkedin: 'linkedin.com/in/julius',
      github: 'github.com/julius'
    }
  };

  const responses = [
    {
      patterns: ['hello', 'hi', 'hey', 'greetings'],
      responses: [
        `Hi there! I'm ${portfolioInfo.name}'s virtual assistant. How can I help you today?`,
        `Hello! Feel free to ask me anything about ${portfolioInfo.name} or their work.`,
        `Hey! I'm here to tell you all about ${portfolioInfo.name} and their projects.`
      ]
    },
    {
      patterns: ['who are you', 'what are you', 'your name'],
      responses: [
        `I'm ${portfolioInfo.name}'s virtual assistant, designed to help visitors learn more about them and their work.`,
        `I'm a chatbot created to represent ${portfolioInfo.name} and answer questions about their portfolio.`
      ]
    },
    {
      patterns: ['who is julius', 'about julius', 'tell me about julius'],
      responses: [
        `${portfolioInfo.name} is a ${portfolioInfo.title} with expertise in ${portfolioInfo.skills.slice(0, 3).join(', ')} and more.`,
        `${portfolioInfo.name} is a passionate ${portfolioInfo.title} who loves creating elegant solutions to complex problems.`
      ]
    },
    {
      patterns: ['skills', 'technologies', 'tech stack', 'what can you do'],
      responses: [
        `${portfolioInfo.name} is skilled in ${portfolioInfo.skills.join(', ')}.`,
        `${portfolioInfo.name}'s primary technologies include ${portfolioInfo.skills.slice(0, 5).join(', ')}, and more.`
      ]
    },
    {
      patterns: ['project', 'portfolio', 'work', 'created'],
      responses: [
        `${portfolioInfo.name} has worked on several projects including ${portfolioInfo.projects.map(p => p.name).join(', ')}.`,
        `Some notable projects include: ${portfolioInfo.projects[0].name} (${portfolioInfo.projects[0].description}) and ${portfolioInfo.projects[1].name} (${portfolioInfo.projects[1].description}).`
      ]
    },
    {
      patterns: ['experience', 'work history', 'job', 'professional'],
      responses: [
        `${portfolioInfo.name} currently works as a ${portfolioInfo.experience[0].title} at ${portfolioInfo.experience[0].company} and previously worked as a ${portfolioInfo.experience[1].title} at ${portfolioInfo.experience[1].company}.`,
        `${portfolioInfo.name} has experience as a ${portfolioInfo.experience[0].title} at ${portfolioInfo.experience[0].company}, where they ${portfolioInfo.experience[0].description.toLowerCase()}`
      ]
    },
    {
      patterns: ['education', 'study', 'degree', 'university', 'college'],
      responses: [
        `${portfolioInfo.name} holds a ${portfolioInfo.education.degree} from ${portfolioInfo.education.institution}, graduated in ${portfolioInfo.education.year}.`,
        `${portfolioInfo.name} studied at ${portfolioInfo.education.institution} and earned a ${portfolioInfo.education.degree}.`
      ]
    },
    {
      patterns: ['contact', 'email', 'reach', 'get in touch', 'linkedin', 'github'],
      responses: [
        `You can contact ${portfolioInfo.name} via email at ${portfolioInfo.contact.email}, or through LinkedIn: ${portfolioInfo.contact.linkedin}.`,
        `The best way to reach ${portfolioInfo.name} is through email (${portfolioInfo.contact.email}) or by using the contact form on this website.`,
        `Check out ${portfolioInfo.name}'s GitHub at ${portfolioInfo.contact.github} or connect on LinkedIn: ${portfolioInfo.contact.linkedin}.`
      ]
    },
    {
      patterns: ['thanks', 'thank you', 'appreciate'],
      responses: [
        `You're welcome! Feel free to ask if you have any other questions.`,
        `Happy to help! Is there anything else you'd like to know about ${portfolioInfo.name}?`,
        `My pleasure! I'm here anytime you want to learn more.`
      ]
    }
  ];
  
  const defaultResponses = [
    `I'm not sure I understand. Feel free to ask about ${portfolioInfo.name}'s skills, projects, or experience.`,
    `Hmm, I don't have specific information about that. Would you like to know about ${portfolioInfo.name}'s background or projects instead?`,
    `I don't have an answer for that. You can ask me about ${portfolioInfo.name}'s work, skills, or how to contact them.`
  ];
  
  export function getChatbotResponse(userInput: string): string {
    const input = userInput.toLowerCase();
    
    for (const category of responses) {
      if (category.patterns.some(pattern => input.includes(pattern))) {
        const randomIndex = Math.floor(Math.random() * category.responses.length);
        return category.responses[randomIndex];
      }
    }

    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[randomIndex];
  }