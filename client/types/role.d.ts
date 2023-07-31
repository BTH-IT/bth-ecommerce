export interface RoleType {
  _id: string;
  name: string;
  description: string;
  features: {
    feature: {
      _id: string;
      name: string;
      isActive: boolean;
    };
    actions: string[];
  }[];
  isActive: boolean;
}
