import { Transaction } from 'sequelize';
import { FileDTO } from '../dtos/file.dto';
interface Relation {
  belongsTo: string;
  belongsToColumn: string;
  belongsToId: string;
}

// interface FileObject {
//   id?: string;
//   new?: boolean;
//   name: string;
//   sizeInBytes: number;
//   privateUrl: string;
//   publicUrl: string;
// }

// Options interface used in all methods
interface Options {
  transaction?: Transaction;
  currentUser?: { id: string | null };
}

// Interface for the FileDBApi class methods
interface IFileDBApi {
  replaceRelationFiles(
    relation: Relation,
    rawFiles: FileDTO[],
    options?: Options,
  ): Promise<void>;
  _addFiles(
    relation: Relation,
    files: FileDTO[],
    options?: Options,
  ): Promise<void>;
  _removeLegacyFiles(
    relation: Relation,
    files: FileDTO[],
    options?: Options,
  ): Promise<void>;
}

export { IFileDBApi };
