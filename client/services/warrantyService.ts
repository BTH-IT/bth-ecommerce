import { WarrantyType } from './../types/warranty.d';
import { createAxiosGraphql } from '@/utils/contains';

const warrantyService = {
  async getAll(params?: any): Promise<WarrantyType[]> {
    const graphqlQuery = {
      query: `
        query getAllWarranties($params: ParamsWarrantyInput!) {
          getAllWarranties(params: $params) {
            _id
            productDetail
            product {
                _id
                productName
            }
            warrantyYear
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

    return response.getAllWarranties;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getWarranty($id: String!) {
          getWarranty(id: $id) {
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

    return response;
  },
  async add(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewWarranty($createNewWarranty: CreateNewWarrantyInput!){
          createNewWarranty(createNewWarranty: $createNewWarranty) {
            _id
            name
            isActive
            createdAt
            updatedAt
          }
        }`,
      variables: {
        createNewWarranty: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateWarranty($updateWarranty: UpdateWarrantyInput!){
          updateWarranty(updateWarranty: $updateWarranty) {
            _id
          }
        }`,
      variables: {
        updateWarranty: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async remove(id: string) {
    const graphqlQuery = {
      query: `
        mutation deleteWarranty($deleteWarranty: DeleteWarrantyInput!){
          deleteWarranty(deleteWarranty: $deleteWarranty) {
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

export default warrantyService;
