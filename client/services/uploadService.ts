import { UploadType } from '@/types/upload';
import { createAxiosGraphql } from '@/utils/contains';

const uploadService = {
  async getAll(params?: any): Promise<UploadType[]> {
    const graphqlQuery = {
      query: `
        query {
          getAllUploads {
            _id
            name
            thumbUrl
            iconUrl
            isActive
            createdAt
            updatedAt
          }
        }`,
      variables: {},
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response.getAllUploads;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getUpload($id: String!) {
          getUpload(id: $id) {
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
        mutation createNewUpload($createNewUpload: CreateNewUploadInput!){
          createNewUpload(createNewUpload: $createNewUpload) {
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
        createNewUpload: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateUpload($updateUpload: UpdateUploadInput!){
          updateUpload(updateUpload: $updateUpload) {
            _id
          }
        }`,
      variables: {
        updateUpload: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async remove(id: string) {
    const graphqlQuery = {
      query: `
        mutation deleteUpload($deleteUpload: DeleteUploadInput!){
          deleteUpload(deleteUpload: $deleteUpload) {
            _id
          }
        }`,
      variables: {
        deleteUpload: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default uploadService;
