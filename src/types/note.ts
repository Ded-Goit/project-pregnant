export interface BabyData {
  image: string;
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  momDailyTips: string;
  categoryIconUrl: string;
}

export interface DashboardResponse {
  name: string;
  weekNumber: number;
  daysLeft: number;
  baby: BabyData;
}

export interface DiaryEntry {
  id?: string;
  title: string;
  categories: string[];
  content: string;
  createdAt?: string;
}

export interface Task {
  id?: string;
  text: string;
  date: string;
  completed?: boolean;
}
