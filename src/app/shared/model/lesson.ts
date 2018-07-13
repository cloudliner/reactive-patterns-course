export interface Lesson {
  id: number;
  description: string;
  duration?: string;
  url?: string;
  tags?: string;
  pro?: boolean;
  longDescription?: string;
  courseId?: string;
  videoUrl?: string;
  completed?: boolean;
}
