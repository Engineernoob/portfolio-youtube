export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  teaser: string;
  channel: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  category: 'ml' | 'backend' | 'fullstack';
  tags: string[];
  repoUrl: string;
  preview: {
    type: 'iframe' | 'code' | 'image';
    content: string;
  };
  comments: {
    author: string;
    text: string;
  }[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Building a Neural Network for Image Recognition',
    thumbnail: '/thumbnails/ml-model.jpg',
    teaser: 'Explore my ML model that achieves 95% accuracy on CIFAR-10 dataset. Trained using TensorFlow.',
    channel: 'Taahirah Denmark - Software Engineer',
    duration: '5:42',
    views: 1200,
    likes: 150,
    dislikes: 5,
    category: 'ml',
    tags: ['ml', 'neural-networks', 'tensorflow', 'computer-vision'],
    repoUrl: 'https://github.com/yourusername/image-recognition-ml',
    preview: {
      type: 'iframe',
      content: 'https://your-demo-iframe.com/ml-demo'
    },
    comments: [
      { author: 'Viewer1', text: 'Great implementation! The accuracy is impressive.' },
      { author: 'Viewer2', text: 'How did you handle overfitting?' }
    ],
  },
  {
    id: '2',
    title: 'RESTful API with Node.js and MongoDB',
    thumbnail: '/thumbnails/backend-api.jpg',
    teaser: 'Scalable backend API handling user authentication and data persistence with JWT and Mongoose.',
    channel: 'Taahirah Denmark - Software Engineer',
    duration: '7:15',
    views: 850,
    likes: 120,
    dislikes: 3,
    category: 'backend',
    tags: ['node', 'express', 'mongodb', 'api', 'jwt'],
    repoUrl: 'https://github.com/yourusername/node-mongo-api',
    preview: {
      type: 'code',
      content: '// Sample endpoint code\nconst express = require("express");\nconst app = express();\napp.get("/api/users", (req, res) => {\n  res.json(users);\n});\napp.listen(3000);'
    },
    comments: [
      { author: 'DevFan', text: 'Solid architecture, love the error handling.' },
      { author: 'APIUser', text: 'Works perfectly with Postman!' }
    ],
  },
  {
    id: '3',
    title: 'Real-Time Chat App with Socket.io',
    thumbnail: '/thumbnails/chat-app.jpg',
    teaser: 'Full-stack chat application with real-time messaging, rooms, and user presence using React and Node.js.',
    channel: 'Taahirah Denmark - Software Engineer',
    duration: '9:30',
    views: 2000,
    likes: 280,
    dislikes: 8,
    category: 'fullstack',
    tags: ['react', 'socket.io', 'typescript', 'websockets', 'fullstack'],
    repoUrl: 'https://github.com/yourusername/realtime-chat-app',
    preview: {
      type: 'iframe',
      content: 'https://your-live-demo.com/chat-app'
    },
    comments: [
      { author: 'ChatLover', text: 'Super responsive, great for team collaboration.' },
      { author: 'TechReview', text: 'Integrating Socket.io was seamless.' }
    ],
  },
];
