export interface FileDTO {
  id?: string;
  new?: boolean;
  name: string;
  sizeInBytes: number;
  privateUrl: string;
  publicUrl: string;
}
