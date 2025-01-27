import axios from 'axios';
import { ListResponse, ProjectDetails, ProjectListItem, SkillDetails, SkillListItem } from '@/types/cms';
const ploneClient = axios.create({
  baseURL: process.env.CMS_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  auth: {
    username: process.env.CMS_USER!,
    password: process.env.CMS_PASSWORD!
  }
});

// Generic fetcher for item details
const getItemDetails = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await ploneClient.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
};

// Project Service
export const getProjectList = async (): Promise<ListResponse<ProjectListItem>> => {
  const response = await ploneClient.get<ListResponse<ProjectListItem>>('/projects');
  return response.data;
};

export const getProjectDetails = async (item: ProjectListItem): Promise<ProjectDetails | null> => {
  return getItemDetails<ProjectDetails>(item["@id"]);
};

export const getFullProjectList = async (): Promise<ProjectDetails[]> => {
  const listResponse = await getProjectList();
  const detailsPromises = listResponse.items.map(item => getProjectDetails(item));
  const detailsResults = await Promise.all(detailsPromises);
  return detailsResults.filter((item): item is ProjectDetails => item !== null);
};

// Skill Service
export const getSkillList = async (): Promise<ListResponse<SkillListItem>> => {
  const response = await ploneClient.get<ListResponse<SkillListItem>>('/skills');
  return response.data;
};

export const getSkillDetails = async (item: SkillListItem): Promise<SkillDetails | null> => {
  return getItemDetails<SkillDetails>(item["@id"]);
};

export const getFullSkillList = async (): Promise<SkillDetails[]> => {
  const listResponse = await getSkillList();
  const detailsPromises = listResponse.items.map(item => getSkillDetails(item));
  const detailsResults = await Promise.all(detailsPromises);
  return detailsResults.filter((item): item is SkillDetails => item !== null);
};