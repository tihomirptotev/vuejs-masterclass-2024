export enum ProjectStatus {
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export type Project = {
  id: string;
  name: string;
  slug: string;
  status: ProjectStatus;
  collaborators: string[];
  created: string;
  updated: string;
}

export type Task = {
  id: string;
  name: string;
  description: string;
  due_date?: string;
  status: ProjectStatus;
  project_id: string;
  collaborators: string[];
  created: string;
  updated: string;
}
