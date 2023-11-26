import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "https://cdn.jsdelivr.net/npm/kysely/dist/esm/index.js";

export interface Database {
  projects: ProjectTable;
  time_slots: TimeSlotTable;
}

export interface ProjectTable {
  id: Generated<string>; // uuid, 由数据库自动生成
  name: string;
  description: string;
  advance_booking_days: number;
  booking_duration: number;
  push_endpoint: string;
  created_at: ColumnType<Date, string | undefined, never>; // 由数据库自动生成
  updated_at: ColumnType<Date, string | undefined, never>; // 由数据库自动生成
}

export interface TimeSlotTable {
  id: Generated<string>; // uuid, 由数据库自动生成
  project_id: string; // 外键，连接到 Project
  day: number;
  start_time: string; // Time
  end_time: string; // Time
  reservation_capacity: number;
  created_at: ColumnType<Date, string | undefined, never>; // 由数据库自动生成
  updated_at: ColumnType<Date, string | undefined, never>; // 由数据库自动生成
}

// 可选择类型
export type Project = Selectable<ProjectTable>;
export type NewProject = Insertable<ProjectTable>;
export type ProjectUpdate = Updateable<ProjectTable>;

export type TimeSlot = Selectable<TimeSlotTable>;
export type NewTimeSlot = Insertable<TimeSlotTable>;
export type TimeSlotUpdate = Updateable<TimeSlotTable>;
