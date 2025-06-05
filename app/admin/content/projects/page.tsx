'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  MoreHorizontal,
  ExternalLink,
  Github,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

// Mock projects data
const initialProjects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description:
      'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
    image: '/placeholder.svg?height=400&width=600',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 1,
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'A productivity app that helps users organize tasks, set priorities, and track progress.',
    image: '/placeholder.svg?height=400&width=600',
    tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description:
      'A responsive portfolio website showcasing projects and skills with a modern design.',
    image: '/placeholder.svg?height=400&width=600',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    order: 3,
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description:
      'A weather application that provides real-time forecasts and historical weather data.',
    image: '/placeholder.svg?height=400&width=600',
    tags: ['React', 'OpenWeather API', 'Chart.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    order: 4,
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Handle search
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Handle sorting
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortConfig) return a.order - b.order; // Default sort by order

    const { key, direction } = sortConfig;

    if (a[key as keyof typeof a] < b[key as keyof typeof b]) {
      return direction === 'asc' ? -1 : 1;
    }
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
    toast({
      title: 'Project deleted',
      description: 'The project has been deleted successfully',
    });
  };

  const handleToggleFeatured = (id: number) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, featured: !project.featured }
          : project
      )
    );

    const project = projects.find((project) => project.id === id);
    toast({
      title: project?.featured ? 'Project unfeatured' : 'Project featured',
      description: project?.featured
        ? 'The project has been removed from featured projects'
        : 'The project has been added to featured projects',
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Projects</h1>
        <Button asChild>
          <Link href='/admin/content/projects/new'>
            <Plus className='mr-2 h-4 w-4' /> New Project
          </Link>
        </Button>
      </div>

      <div className='flex items-center'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input
            placeholder='Search projects...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[300px]'>
                  <Button
                    variant='ghost'
                    onClick={() => requestSort('title')}
                    className='flex items-center'
                  >
                    Project
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>
                  <Button
                    variant='ghost'
                    onClick={() => requestSort('order')}
                    className='flex items-center'
                  >
                    Order
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>Links</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-center py-8'>
                    <div className='flex justify-center'>
                      <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
                    </div>
                    <div className='mt-2 text-sm text-muted-foreground'>
                      Loading projects...
                    </div>
                  </TableCell>
                </TableRow>
              ) : sortedProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-center py-8'>
                    <div className='text-muted-foreground'>
                      No projects found
                    </div>
                    <Button
                      variant='outline'
                      className='mt-4'
                      onClick={() => setSearchTerm('')}
                    >
                      Clear search
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                sortedProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 rounded overflow-hidden flex-shrink-0'>
                          <img
                            src={project.image || '/placeholder.svg'}
                            alt={project.title}
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div>
                          <div className='font-medium'>{project.title}</div>
                          <div className='text-sm text-muted-foreground truncate max-w-[250px]'>
                            {project.description}
                          </div>
                          {project.featured && (
                            <Badge variant='secondary' className='mt-1'>
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-wrap gap-1'>
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant='outline'>
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 2 && (
                          <Badge variant='outline'>
                            +{project.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline'>#{project.order}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <Button variant='ghost' size='sm' asChild>
                          <a
                            href={project.liveUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLink className='h-4 w-4' />
                          </a>
                        </Button>
                        <Button variant='ghost' size='sm' asChild>
                          <a
                            href={project.githubUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Github className='h-4 w-4' />
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='h-4 w-4' />
                            <span className='sr-only'>Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/content/projects/${project.id}`}
                            >
                              <Edit className='mr-2 h-4 w-4' /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <a
                              href={project.liveUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <Eye className='mr-2 h-4 w-4' /> View Live
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleFeatured(project.id)}
                          >
                            {project.featured ? 'Unfeature' : 'Feature'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className='text-red-600'
                              >
                                <Trash2 className='mr-2 h-4 w-4' /> Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the project "
                                  {project.title}". This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteProject(project.id)
                                  }
                                  className='bg-red-600 hover:bg-red-700'
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}
