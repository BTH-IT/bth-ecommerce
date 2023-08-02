import { FeatureType } from './../types/feature.d';
import { createAxiosGraphql } from '@/utils/contains';

const featureService = {
  async getAll(params?: any): Promise<FeatureType[]> {
    const graphqlQuery = {
      query: `
        query getAllFeatures($params: ParamsFeatureInput!) {
          getAllFeatures(params: $params) {
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

    return response.getAllFeatures;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getFeature($id: String!) {
          getFeature(id: $id) {
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

    return response.getFeature;
  },
  async add(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewFeature($createNewFeature: CreateNewFeatureInput!) {
          createNewFeature(createNewFeature: $createNewFeature) {
            _id
            name
            isActive
            updatedAt
            createdAt
          }
      }`,
      variables: {
        createNewFeature: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateFeature($updateFeature: UpdateFeatureInput!) {
          updateFeature(updateFeature: $updateFeature) {
            _id
          }
        }`,
      variables: {
        updateFeature: {
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
        mutation deleteFeature($deleteFeature: DeleteFeatureInput!){
          deleteFeature(deleteFeature: $deleteFeature) {
            _id
          }
        }`,
      variables: {
        deleteFeature: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default featureService;
