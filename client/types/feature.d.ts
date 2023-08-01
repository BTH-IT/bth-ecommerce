export interface RoleAndFeatureType {
  feature: FeatureType;
  actions: string[];
}

export interface FeatureType {
  _id: string;
  name: string;
  isActive: boolean;
}
