import { BannerType } from '@/types/banner';
import { createAxiosGraphql } from '@/utils/contains';

const bannerService = {
  async getAll(params?: any): Promise<BannerType[]> {
    const graphqlQuery = {
      query: `
        query {
          getAllBanners {
            _id
            name
            thumbUrl
            description
            isShow
            createdAt
            updatedAt
          }
        }`,
      variables: {},
    };

    const response: any = await createAxiosGraphql(graphqlQuery);

    return response.getAllBanners;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getBanner($id: String!) {
          getBanner(id: $id) {
            _id
            name
            thumbUrl
            description
            isShow
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
        mutation createNewBanner($createNewBanner: CreateNewBannerInput!){
          createNewBanner(createNewBanner: $createNewBanner) {
            _id
            name
            thumbUrl
            description
            isShow
            createdAt
            updatedAt
          }
        }`,
      variables: {
        createNewBanner: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateBanner($updateBanner: UpdateBannerInput!){
          updateBanner(updateBanner: $updateBanner) {
            _id
          }
        }`,
      variables: {
        updateBanner: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async remove(id: string) {
    const graphqlQuery = {
      query: `
        mutation deleteBanner($deleteBanner: DeleteBannerInput!){
          deleteBanner(deleteBanner: $deleteBanner) {
            _id
          }
        }`,
      variables: {
        deleteBanner: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default bannerService;
