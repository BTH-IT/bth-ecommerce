import { AccountType } from '../types/account';
import { createAxiosGraphql } from '@/utils/contains';

const accountService = {
  async getAll(params?: any): Promise<AccountType[]> {
    const graphqlQuery = {
      query: `
        query getAllAccounts($params: ParamsAccountInput!) {
          getAllAccounts(params: $params) {
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
        params: {
          ...params,
        },
      },
    };

    const response: any = await createAxiosGraphql(graphqlQuery);

    return response.getAllAccounts;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getAccount($id: String!) {
          getAccount(id: $id) {
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

    return response.getAccount;
  },
  async addAccountWithAvailableUser(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewAccountWithAvailableUser($createNewAccountWithAvailableUser: CreateNewAccountWithAvailableUserInput!) {
          createNewAccountWithAvailableUser(createNewAccountWithAvailableUser: $createNewAccountWithAvailableUser) {
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
        createNewAccountWithAvailableUser: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response.createNewAccountWithAvailableUser;
  },
  async add(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewAccount($createNewAccount: CreateNewAccountInput!) {
          createNewAccount(createNewAccount: $createNewAccount) {
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
        createNewAccount: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateAccount($updateAccount: UpdateAccountInput!) {
          updateAccount(updateAccount: $updateAccount) {
            _id
          }
        }`,
      variables: {
        updateAccount: {
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
        mutation deleteAccount($deleteAccount: DeleteAccountInput!){
          deleteAccount(deleteAccount: $deleteAccount) {
            _id
          }
        }`,
      variables: {
        deleteAccount: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default accountService;
