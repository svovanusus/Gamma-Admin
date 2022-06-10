export default interface Site {
  id: number;
  name: string;
  lastUpdate: Date;
  description: string;
  domainId: number;
  isPublished: boolean;
}