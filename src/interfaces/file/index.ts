import { ConversionInterface } from 'interfaces/conversion';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FileInterface {
  id?: string;
  name: string;
  type: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  conversion_conversion_input_file_idTofile?: ConversionInterface[];
  conversion_conversion_output_file_idTofile?: ConversionInterface[];
  user?: UserInterface;
  _count?: {
    conversion_conversion_input_file_idTofile?: number;
    conversion_conversion_output_file_idTofile?: number;
  };
}

export interface FileGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  type?: string;
  user_id?: string;
}
