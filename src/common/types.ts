// 회사 예시 코드 / 이 파일이 무슨 역할을 할 것인지 인지용

// export type Dictionary = {
//   [key: string]: any;
// };

// export type FormDictionary = {
//   [key: string]: FormDataEntryValue | FormDataEntryValue[];
// };

// export type MenuAuth = {
//   [key: string]: number;
// };

// export type UploadFile = {
//   [key: string]: any;
//   id: string;
//   folder: string;
//   ymd: string;
//   name: string;
//   size: number;
//   type: string;  
// }

// export enum PermMethod {
//   read = 0,
//   create,
//   update,
//   delete,
//   admin,
//   etc1,
//   etc2,
//   etc3,
//   etc4,
//   etc5,
//   void,
// };

// export const contentType = {
//   excel: "application/vnd.ms-excel",
//   stream: "application/octet-stream"
// }

// export class GroupMap<T> {
//   private map: { key: any; value: T[] }[] = [];

//   public get maps() {
//     return this.map.map(entry => ({ key: entry.key, value: entry.value }));
//   }

//   private isEqual(obj1: any, obj2: any): boolean {
//     return JSON.stringify(obj1) === JSON.stringify(obj2);
//   }

//   public has(key: any): boolean {
//     return this.map.some(entry => this.isEqual(entry.key, key));
//   }

//   public get(key: any): T[] | undefined {
//     const entry = this.map.find(entry => this.isEqual(entry.key, key));
//     return entry ? entry.value : undefined;
//   }

//   public set(key: any, value: T[]): void {
//     const entry = this.map.find(entry => this.isEqual(entry.key, key));
//     if (entry) {
//       entry.value = value;
//     } else {
//       this.map.push({ key, value });
//     }
//   }
// }

// export const chartColors = [
//   "#008FFB", // Blue
//   "#00E396", // Green
//   "#FEB019", // Yellow
//   "#FF4560", // Red
//   "#775DD0", // Purple
//   "#3F51B5", // Indigo
//   "#03A9F4", // Light Blue
//   "#4CAF50", // Light Green
//   "#F9A3A4", // Light Red
//   "#546E7A", // Dark Gray
//   "#D4526E", // Dark Pink
//   "#8D5B4C", // Brown
//   "#F86624", // Orange
//   "#D7263D", // Dark Red
//   "#1B998B", // Teal
//   "#2E294E", // Dark Blue
//   "#F46036", // Coral
//   "#E2C044", // Gold
//   "#8966ff", // Light Purple
// ];