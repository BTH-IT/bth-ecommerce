import { RoleAndFeatureType } from './feature';

export interface RoleType {
  _id: string;
  name: string;
  description: string;
  features: RoleAndFeatureType[];
  isActive: boolean;
}
