export const MOCK_PROGRESS_TASKS = [
  {
    page: 1,
    size: 5,
    data: [
      {
        id: 'card_001',
        projectName: 'Project Manager',
        projectColor: '#FF0004',
        sectionName: 'Design',
        title: 'Homepage Redesign',
        content: '메인 페이지 UI/UX 개선',
        startDate: '2025-01-01',
        endDate: '2025-01-29',
        category: 'Frontend',
      },
      {
        id: 'card_002',
        projectName: 'Project Manager',
        projectColor: '#FF0004',
        sectionName: 'Backend',
        title: '로그인 기능 구현',
        content: '소셜 로그인 연동',
        startDate: '2025-01-01',
        endDate: '2025-01-30',
        category: 'User',
      },
    ],
  },
  {
    page: 2,
    size: 5,
    data: [
      {
        id: 'card_003',
        projectName: 'Project Manager',
        projectColor: '#FF0004',
        sectionName: 'Backend',
        title: 'API 구현',
        content: 'REST API 개발',
        startDate: '2025-01-10',
        endDate: '2025-01-30',
        category: 'API',
      },
    ],
  },
]

export const MOCK_COMPLETED_TASKS = [
  {
    page: 1,
    size: 5,
    data: [
      {
        id: 'card_004',
        projectName: 'Project Manager',
        projectColor: '#FF0004',
        sectionName: 'Frontend',
        title: '게시판 구현',
        content: 'CRUD 기능 개발',
        startDate: '2025-01-01',
        endDate: '2025-01-10',
        completeDate: '2025-01-08',
        category: 'Feature',
      },
      {
        id: 'card_005',
        projectName: 'Project Manager',
        projectColor: '#FF0004',
        sectionName: 'Backend',
        title: '인증 시스템',
        content: 'JWT 인증',
        startDate: '2025-01-05',
        endDate: '2025-01-15',
        completeDate: '2025-01-13',
        category: 'Auth',
      },
    ],
  },
]

export const MOCK_USER = {
  username: '강나연',
  stats: {
    totalProjects: 5,
    totalCards: 10,
  },
}
