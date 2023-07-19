import { UserType } from './../types/auth.d';
import { createAxiosGraphql } from '@/utils/contains';

const userService = {
  async getAll(params?: any): Promise<UserType[]> {
    const graphqlQuery = {
      query: `
        query {
          getAllUsers {
            _id
            fullname
            birthYear
            gender
            address
            phone
            account {
              _id
              email
              picture
              role {
                _id
                name
                description
                features {
                  feature {
                    _id
                    name
                  }
                  actions
                }
              }
            }
            type {
              _id
              name
            }
            createdAt
            updatedAt
          }
        }`,
      variables: {},
    };

    const response: any = await createAxiosGraphql(graphqlQuery);

    return response.getAllUsers;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getUser($id: String!) {
          getUser(id: $id) {
            _id
            fullname
            birthYear
            gender
            address
            phone
            account {
              _id
              email
              picture
              role {
                _id
                name
                description
                features {
                  feature {
                    _id
                    name
                  }
                  actions
                }
              }
            }
            type {
              _id
              name
            }
            createdAt
            updatedAt
          }
        }`,
      variables: {
        id,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response.getUser;
  },
  async add(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewUser($createNewUser: CreateNewUserInput!){
          createNewUser(createNewUser: $createNewUser) {
            _id
            fullname
            birthYear
            gender
            address
            phone
            account {
              _id
              email
              picture
              role {
                _id
                name
                description
                features {
                  feature {
                    _id
                    name
                  }
                  actions
                }
              }
            }
            type {
              _id
              name
            }
            createdAt
            updatedAt
          }
        }`,
      variables: {
        createNewUser: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateUser($updateUser: UpdateUserInput!){
          updateUser(updateUser: $updateUser) {
            _id
          }
        }`,
      variables: {
        updateUser: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async remove(id: string) {
    const graphqlQuery = {
      query: `
        mutation deleteUser($deleteUser: DeleteUserInput!){
          deleteUser(deleteUser: $deleteUser) {
            _id
          }
        }`,
      variables: {
        deleteUser: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default userService;
