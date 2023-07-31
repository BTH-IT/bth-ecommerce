import { BrandType } from '@/types/brand';
import { createAxiosGraphql } from '@/utils/contains';

const brandService = {
  async getAll(params?: any): Promise<BrandType[]> {
    const graphqlQuery = {
      query: `
        query getAllBrands($params: ParamsBrandInput!) {
          getAllBrands(params: $params) {
            _id
            name
            thumbUrl
            iconUrl
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

    const response = await createAxiosGraphql(graphqlQuery);

    return response.getAllBrands;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getBrand($id: String!) {
          getBrand(id: $id) {
            _id
            name
            thumbUrl
            iconUrl
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

    return response;
  },
  async add(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewBrand($createNewBrand: CreateNewBrandInput!){
          createNewBrand(createNewBrand: $createNewBrand) {
            _id
            name
            thumbUrl
            iconUrl
            isActive
            updatedAt
            createdAt
          }
        }`,
      variables: {
        createNewBrand: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response.createNewBrand;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateBrand($updateBrand: UpdateBrandInput!){
          updateBrand(updateBrand: $updateBrand) {
            _id
          }
        }`,
      variables: {
        updateBrand: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async remove(id: string) {
    const graphqlQuery = {
      query: `
        mutation deleteBrand($deleteBrand: DeleteBrandInput!){
          deleteBrand(deleteBrand: $deleteBrand) {
            _id
          }
        }`,
      variables: {
        deleteBrand: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default brandService;
