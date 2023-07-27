import { OrderType } from '../types/order';
import { createAxiosGraphql } from '@/utils/contains';

const orderService = {
  async getAll(params?: any): Promise<OrderType[]> {
    const graphqlQuery = {
      query: `
        query getAllOrders($params: ParamsOrderInput!) {
          getAllOrders(params: $params) {
            _id
            boughtProducts {
              _id
              price
              productDetail
              product {
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
              amount
            }
            purchaseForm
            user {
              _id
            }
            status
            totalPay
            isPaid
            fullname
            phone
            address
            createdAt
            updatedAt
          }
        }`,
      variables: {
        params,
      },
    };

    const response: any = await createAxiosGraphql(graphqlQuery);

    return response.getAllOrders;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getOrder($id: String!) {
          getOrder(id: $id) {
            _id
            boughtProducts {
              _id
              price
              productDetail
              product {
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
              amount
            }
            purchaseForm
            user {
              _id
            }
            status
            totalPay
            isPaid
            fullname
            phone
            address
            createdAt
            updatedAt
          }
        }`,
      variables: {
        id,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response.getOrder;
  },
  async add(data: any) {
    const graphqlQuery = {
      query: `
        mutation createNewOrder($createNewOrder: CreateNewOrderInput!) {
          createNewOrder(createNewOrder: $createNewOrder) {
            _id
            boughtProducts {
              _id
              price
              productDetail
              product {
                _id
              }
              amount
            }
            purchaseForm
            user {
              _id
            }
            status
            totalPay
            isPaid
            fullname
            phone
            address
            createdAt
            updatedAt
          }
      }`,
      variables: {
        createNewOrder: data,
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
  async update(data: any) {
    const graphqlQuery = {
      query: `
        mutation updateOrder($updateOrder: UpdateOrderInput!) {
          updateOrder(updateOrder: $updateOrder) {
            _id
          }
        }`,
      variables: {
        updateOrder: {
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
        mutation deleteOrder($deleteOrder: DeleteOrderInput!){
          deleteOrder(deleteOrder: $deleteOrder) {
            _id
          }
        }`,
      variables: {
        deleteOrder: {
          _id: id,
        },
      },
    };

    const response = await createAxiosGraphql(graphqlQuery);

    return response;
  },
};

export default orderService;
