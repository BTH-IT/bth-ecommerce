import { SupplierType } from './../types/supplier.d';
import { createAxiosGraphql } from '@/utils/contains';

const supplierService = {
  async getAll(params?: any): Promise<SupplierType[]> {
    const graphqlQuery = {
      query: `
        query getAllSuppliers($params: ParamsSupplierInput!) {
          getAllSuppliers(params: $params) {
            _id
            name
            isActive
            updatedAt
            createdAt
          }
        }`,
      variables: {
        params: {
          ...params,
        },
      },
    };

    const response: any = await createAxiosGraphql(graphqlQuery);

    return response.getAllSuppliers;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getSupplier($id: String!) {
          getSupplier(id: $id) {
            _id
            name
            isActive
            updatedAt
            createdAt
          }
        }`,
      variables: {
        id,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response.getSupplier;
  },
  async add(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewSupplier($createNewSupplier: CreateNewSupplierInput!) {
          createNewSupplier(createNewSupplier: $createNewSupplier) {
            _id
            name
            isActive
            updatedAt
            createdAt
          }
      }`,
      variables: {
        createNewSupplier: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateSupplier($updateSupplier: UpdateSupplierInput!) {
          updateSupplier(updateSupplier: $updateSupplier) {
            _id
          }
        }`,
      variables: {
        updateSupplier: {
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
        mutation deleteSupplier($deleteSupplier: DeleteSupplierInput!){
          deleteSupplier(deleteSupplier: $deleteSupplier) {
            _id
          }
        }`,
      variables: {
        deleteSupplier: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default supplierService;
