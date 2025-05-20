export interface MockUser {
  id: string;
  name: string;
  image?: string;
}

export interface MockVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoId: string;
  thumbnailUrl: string;
  visibility: 'public' | 'private';
  userId: string;
  views: number;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockVideoEntry {
  video: MockVideo;
  user: MockUser;
}

export interface MockPagination {
  currentPage: number;
  totalPages: number;
  totalVideos: number;
  pageSize: number;
}

export interface GetAllVideosMockResponse {
  videos: MockVideoEntry[];
  pagination: MockPagination;
}

export const mockVideoData: MockVideoEntry[] = [
  {
    video: {
      id: 'mock-uuid-1',
      title: 'Exploring the Alps',
      description: 'A breathtaking journey through the Swiss Alps, showcasing stunning landscapes and challenging hikes.',
      videoUrl: 'https://example.com/videos/alps.mp4',
      videoId: 'alps123',
      thumbnailUrl: 'https://example.com/thumbnails/alps.jpg',
      visibility: 'public',
      userId: 'user-alpha-123',
      views: 1500,
      duration: 1200, // 20 minutes
      createdAt: new Date('2023-01-15T10:00:00Z'),
      updatedAt: new Date('2023-01-16T11:30:00Z'),
    },
    user: {
      id: 'user-alpha-123',
      name: 'Alice Wonderland',
      image: 'https://example.com/avatars/alice.png',
    }
  },
  {
    video: {
      id: 'mock-uuid-2',
      title: 'Cooking Masterclass: Italian Pasta',
      description: 'Learn to make authentic Italian pasta from scratch with renowned chef Giovanni.',
      videoUrl: 'https://example.com/videos/pasta.mp4',
      videoId: 'pasta789',
      thumbnailUrl: 'https://example.com/thumbnails/pasta.jpg',
      visibility: 'private',
      userId: 'user-beta-456',
      views: 500,
      duration: 1800, // 30 minutes
      createdAt: new Date('2023-02-20T14:00:00Z'),
      updatedAt: new Date('2023-02-21T16:45:00Z'),
    },
    user: {
      id: 'user-beta-456',
      name: 'Bob The Builder',
      image: 'https://example.com/avatars/bob.png',
    }
  },
  {
    video: {
      id: 'mock-uuid-3',
      title: 'Introduction to Quantum Computing',
      description: 'A beginner-friendly overview of the principles of quantum computing and its potential applications.',
      videoUrl: 'https://example.com/videos/quantum.mp4',
      videoId: 'quantum01',
      thumbnailUrl: 'https://example.com/thumbnails/quantum.jpg',
      visibility: 'public',
      userId: 'user-gamma-789',
      views: 25000,
      duration: 2400, // 40 minutes
      createdAt: new Date('2023-03-10T09:00:00Z'),
      updatedAt: new Date('2023-03-10T09:00:00Z'),
    },
    user: {
      id: 'user-gamma-789',
      name: 'Charlie Chaplin',
      image: 'https://example.com/avatars/charlie.png',
    }
  },
  {
    video: {
      id: 'mock-uuid-4',
      title: 'Yoga for Beginners',
      description: 'A gentle introduction to yoga, focusing on basic poses and breathing techniques.',
      videoUrl: 'https://example.com/videos/yoga.mp4',
      videoId: 'yoga42',
      thumbnailUrl: 'https://example.com/thumbnails/yoga.jpg',
      visibility: 'public',
      userId: 'user-delta-101',
      views: 800,
      duration: 900, // 15 minutes
      createdAt: new Date('2024-01-01T12:00:00Z'),
      updatedAt: new Date('2024-01-02T10:30:00Z'),
    },
    user: {
      id: 'user-delta-101',
      name: 'Diana Prince',
      // No image for this user
    }
  }
];

export const getAllVideosMock = (
  searchQuery: string = '',
  sortFilter?: string,
  pageNumber: number = 1,
  pageSize: number = 8
): GetAllVideosMockResponse => {
  let filteredVideos = [...mockVideoData];

  // Filter
  if (searchQuery) {
    filteredVideos = filteredVideos.filter(entry =>
      entry.video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort
  const [sortField, sortOrder] = sortFilter?.split('_') || ['createdAt', 'desc'];

  filteredVideos.sort((a, b) => {
    if (sortField === 'createdAt') {
      const dateA = new Date(a.video.createdAt).getTime();
      const dateB = new Date(b.video.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'views') {
      return sortOrder === 'asc' ? a.video.views - b.video.views : b.video.views - a.video.views;
    }
    // Default sort (createdAt_desc) if sortFilter is invalid
    const dateA = new Date(a.video.createdAt).getTime();
    const dateB = new Date(b.video.createdAt).getTime();
    return dateB - dateA;
  });

  // Paginate
  const totalVideos = filteredVideos.length;
  const totalPages = Math.ceil(totalVideos / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedVideos = filteredVideos.slice(startIndex, endIndex);

  return {
    videos: paginatedVideos,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalVideos,
      pageSize,
    },
  };
};
