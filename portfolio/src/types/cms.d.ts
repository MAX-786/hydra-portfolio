interface CMSBase {
  '@id': string;
  '@type': string;
  UID: string;
  id: string;
  title: string;
  description: string;
  created: string;
  modified: string;
  review_state: string;
  parent: {
    '@id': string;
    '@type': string;
    title: string;
  };
}

export interface Project extends CMSBase {
  type_title: 'Project';
  date: string;
  effective: string | null;
  expires: string | null;
  live_demo_url: string | null;
  tech_stack: string[];
  items: unknown[];
  language: {
    title: string;
    token: string;
  };
}

export interface Skill extends CMSBase {
  type_title: 'Skill';
  confidence: number;
}

interface BaseItem {
  '@id': string;
  '@type': string;
  title: string;
  description: string;
  review_state: string;
  type_title: string;
}

interface ProjectListItem extends BaseItem {
  '@type': 'project';
  type_title: 'Project';
}

interface SkillListItem extends BaseItem {
  '@type': 'skill';
  type_title: 'Skill';
}

type Image = {
  download: string;
};

export interface ProjectDetails extends ProjectListItem {
  id: string;
  image: Image;
  date: string;
  created: string;
  modified: string;
  effective: string | null;
  expires: string | null;
  live_demo_url: string | null;
  tech_stack: string[];
  items: unknown[];
  language: {
    title: string;
    token: string;
  };
  parent: {
    '@id': string;
    '@type': string;
    title: string;
  };
}

export interface SkillDetails extends SkillListItem {
  name: string;
  id: string;
  level: number;
  status: Array<{
    title: string;
    token: string;
  }>;
  created: string;
  modified: string;
  parent: {
    '@id': string;
    '@type': string;
    title: string;
  };
}

interface ListResponse<T> {
  items: T[];
  items_total: number;
}
