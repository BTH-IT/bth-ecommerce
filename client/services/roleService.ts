import { RoleType } from '../types/role';
import { createAxiosGraphql } from '@/utils/contains';

const roleService = {
  async getAll(params?: any): Promise<RoleType[]> {
    const graphqlQuery = {
      query: `
        query getAllRoles($params: ParamsRoleInput!) {
          getAllRoles(params: $params) {
            _id
            name
            description
            createdAt
            updatedAt
            isActive
            features {
              feature {
                _id
                name
              }
              actions
              isActive
            }
          }
        }`,
      variables: {
        params: {
          ...params,
        },
      },
    };

    const response: any = await createAxiosGraphql(graphqlQuery);

    return response.getAllRoles;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getRole($id: String!) {
          getRole(id: $id) {
            _id
            email
            password
            picture
            role {
              _id
              name
              description
              features {
                feature {
                  _id
                  name
                  isActive
                }
                actions
              }
              isActive
            }
            isActive
            createdAt
            updatedAt
          }
        }`,
      variables: {
        id,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response.getRole;
  },
  async add(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewRole($createNewRole: CreateNewRoleInput!) {
          createNewRole(createNewRole: $createNewRole) {
            _id
            email
            password
            picture
            role {
              _id
              name
              description
              features {
                feature {
                  _id
                  name
                  isActive
                }
                actions
              }
              isActive
            }
            isActive
            createdAt
            updatedAt
          }
      }`,
      variables: {
        createNewRole: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateRole($updateRole: UpdateRoleInput!) {
          updateRole(updateRole: $updateRole) {
            _id
          }
        }`,
      variables: {
        updateRole: {
          ...data,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async remove(id: string) {
    const graphqlQuery = {
      query: `
        mutation deleteRole($deleteRole: DeleteRoleInput!){
          deleteRole(deleteRole: $deleteRole) {
            _id
          }
        }`,
      variables: {
        deleteRole: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default roleService;
