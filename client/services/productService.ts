import { ProductType } from './../types/product.d';
import { createAxiosGraphql } from '@/utils/contains';

const productService = {
  async getAll(params?: any): Promise<ProductType[]> {
    const graphqlQuery = {
      query: `
        query getAllProducts($params: ProductParamsInput!) {
          getAllProducts(params: $params) {
            _id
            productName
            imageUrlList
            warranteeYear
            originPrice
            salePercent
            description
            generateCpu
            cpu
            seriesCpu
            chip
            ramName
            ramSize
            screen
            storageName
            storageSize
            storagePortName
            storagePortNum
            storagePortMaximum
            supportM2slotType
            screenOutputPortName
            screenOutputPortNum
            bluetooth
            keyboard
            operationSystem
            size
            pin
            weight
            seriesLaptop
            partNumber
            color
            accessoriesIncluded
            led
            touchScreen
            soldNum
            isHidden
            remain
            brand {
                _id
                name
                iconUrl
                thumbUrl
            }
          }
        }`,
      variables: {
        params: {
          sort: '',
          ...params,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response.getAllProducts;
  },
  async getById(id: string): Promise<ProductType> {
    const graphqlQuery = {
      query: `
        query getProduct($id: String!) {
          getProduct(id: $id) {
            _id
            productName
            imageUrlList
            warranteeYear
            originPrice
            salePercent
            description
            generateCpu
            cpu
            seriesCpu
            chip
            ramName
            ramSize
            screen
            storageName
            storageSize
            storagePortName
            storagePortNum
            storagePortMaximum
            supportM2slotType
            screenOutputPortName
            screenOutputPortNum
            bluetooth
            keyboard
            operationSystem
            size
            pin
            weight
            seriesLaptop
            partNumber
            color
            accessoriesIncluded
            led
            touchScreen
            soldNum
            isHidden
            remain
            brand {
                _id
                name
                iconUrl
                thumbUrl
            }
          }
        }`,
      variables: {
        id,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response.getProduct;
  },
  async add(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewProduct($createNewProduct: CreateNewProductInput!){
          createNewProduct(createNewProduct: $createNewProduct) {
            _id
            productName
            imageUrlList
            warranteeYear
            originPrice
            salePercent
            description
            generateCpu
            cpu
            seriesCpu
            chip
            ramName
            ramSize
            screen
            storageName
            storageSize
            storagePortName
            storagePortNum
            storagePortMaximum
            supportM2slotType
            screenOutputPortName
            screenOutputPortNum
            bluetooth
            keyboard
            operationSystem
            size
            pin
            weight
            seriesLaptop
            partNumber
            color
            accessoriesIncluded
            led
            touchScreen
            soldNum
            isHidden
            remain
            brand {
                _id
                name
                iconUrl
                thumbUrl
            }
          }
        }`,
      variables: {
        createNewProduct: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateProduct($updateProduct: UpdateProductInput!){
          updateProduct(updateProduct: $updateProduct) {
            _id
          }
        }`,
      variables: {
        updateProduct: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async remove(id: string) {
    const graphqlQuery = {
      query: `
        mutation deleteProduct($deleteProduct: DeleteProductInput!){
          deleteProduct(deleteProduct: $deleteProduct) {
            _id
          }
        }`,
      variables: {
        deleteProduct: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default productService;
