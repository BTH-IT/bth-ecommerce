import { UserGenreType } from './../types/user-type.d';
import { createAxiosGraphql } from '@/utils/contains';

const userTypeService = {
  async getAll(params?: any): Promise<UserGenreType[]> {
    const graphqlQuery = {
      query: `
        query getAllTypes($params: ParamsTypeInput!) {
          getAllTypes(params: $params) {
            _id
            name
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

    return response.getAllTypes;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getType($id: String!) {
          getType(id: $id) {
            _id
            name
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

    return response.getType;
  },
  async add(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewType($createNewType: CreateNewTypeInput!){
          createNewType(createNewType: $createNewType) {
            _id
            name
            isActive
            createdAt
            updatedAt
          }
        }`,
      variables: {
        createNewType: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateType($updateType: UpdateTypeInput!){
          updateType(updateType: $updateType) {
            _id
          }
        }`,
      variables: {
        updateType: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async remove(id: string) {
    const graphqlQuery = {
      query: `
        mutation deleteType($deleteType: DeleteTypeInput!){
          deleteType(deleteType: $deleteType) {
            _id
          }
        }`,
      variables: {
        deleteType: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default userTypeService;
