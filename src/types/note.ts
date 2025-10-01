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
  title: string;
  emotions: string[];
  content: string;
}

export interface Task {
  id: string;
  name: string;
  date: string;
  isDone?: boolean;
}
