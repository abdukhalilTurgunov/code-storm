

export const members = [
  { id: 1, name: "Khalil", role: "Full-stack", img: 'src/assets/img/profile_ava.jpg', canAssignTasks: true },
  { id: 2, name: "Oybek", role: "Front-end", img: 'src/assets/img/profile_ava-2.jpg', canAssignTasks: true },
  { id: 3, name: "Ruxshona", role: "UI/Ux designer", img: 'src/assets/img/profile_ava-3.jpg', canAssignTasks: true },
];

export const projects = [
  {
    id: 1,
    name: "ProjectFlow Pro",
    desc: "App/Web",
    type: "App",
    status: "active",
    members: [1, 2, 3],
    icon: 'src/assets/img/icons/phone.svg',
    iconBg: '#FFEAF8'
  },
  {
    id: 2,
    name: "CreativeSync Hub",
    desc: "WebApp/ UI Design/ Project",
    type: "WebApp",
    status: "active",
    members: [1, 2],
    icon: 'src/assets/img/icons/pc.svg',
    iconBg: '#FFF8EA'
  },
  {
    id: 3,
    name: "Blueprint Nexus",
    desc: "Project/Website",
    type: "Website",
    status: "on-hold",
    members: [2, 3],
    icon: 'src/assets/img/icons/laptop.svg',
    iconBg: '#DEEDFF'
  }
];
export const tasks = [
  {
    id: 1,
    projectId: 1,
    createdBy: 1,
    assignedTo: [2, 3],
    createdDate: '2025-02-15',
    deadline: '2025-02-16',
    status: "to-do",
    title: "Overall UX Process of full product for first version",
    description: "Разработка UX-процесса для первой версии продукта, включая исследования пользователей, создание прототипов и тестирование дизайна.",
    img: "src/assets/img/task-img-1.svg",
    tag: "UI/UX Design",
    tagBg: '#FFEAF8'
  },
  {
    id: 2,
    projectId: 1,
    createdBy: 1,
    assignedTo: [2, 3],
    createdDate: '2025-02-15',
    deadline: '2025-02-19',
    status: "in-progress",
    title: "Create wireframes for dashboard",
    description: "Разработка вайрфреймов для дашборда, включая основные пользовательские сценарии и адаптивный дизайн.",
    img: "src/assets/img/task-img-2.svg",
    tag: "UI/UX Design",
    tagBg: '#FFEAF8'
    
  },
  {
    id: 3,
    projectId: 2,
    createdBy: 2,
    assignedTo: [3],
    createdDate: '2025-02-15',
    deadline: '2025-02-20',
    status: "completed",
    title: "Build authentication system",
    description: "Настройка аутентификации с использованием JWT, OAuth2 и защитой от атак CSRF.",
    img: "src/assets/img/task-img-3.svg",
    tag: "Backend",
    tagBg: '#DEEDFF'
  },
  {
    id: 4,
    projectId: 3,
    createdBy: 3,
    assignedTo: [1, 2],
    createdDate: '2025-02-15',
    deadline: '2025-02-26',
    status: "to-do",
    title: "Refactor API endpoints",
    description: "Оптимизация и рефакторинг API, включая сокращение дублирующихся запросов и улучшение структуры кодовой базы.",
    img: "",
    tag: "Backend",
    tagBg: '#DEEDFF'
  },

];
