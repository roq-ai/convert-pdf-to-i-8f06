import { FileInterface } from 'interfaces/file';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ConversionInterface {
  id?: string;
  input_file_id?: string;
  output_file_id?: string;
  format: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  file_conversion_input_file_idTofile?: FileInterface;
  file_conversion_output_file_idTofile?: FileInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ConversionGetQueryInterface extends GetQueryInterface {
  id?: string;
  input_file_id?: string;
  output_file_id?: string;
  format?: string;
  user_id?: string;
}
