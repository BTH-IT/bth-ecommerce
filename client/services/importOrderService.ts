import { OrderType } from '../types/order';
import { createAxiosGraphql } from '@/utils/contains';

const importOrderService = {
  async getAll(params?: any): Promise<OrderType[]> {
    const graphqlQuery = {
      query: `
        query getAllImportOrders($params: ParamsImportOrderInput!) {
          getAllImportOrders(params: $params) {
            _id
            importProducts {
              _id
              price
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
            employee {
              _id
            }
            supplier {
              _id
            }
            totalPay
            benefitPercent
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

    return response.getAllImportOrders;
  },
  async getById(id: string) {
    const graphqlQuery = {
      query: `
        query getImportOrder($id: String!) {
          getImportOrder(id: $id) {
            _id
            importProducts {
              _id
              price
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
            employee {
              _id
            }
            supplier {
              _id
            }
            totalPay
            benefitPercent
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
        mutation createNewImportOrder($createNewImportOrder: CreateNewImportOrderInput!) {
          createNewImportOrder(createNewImportOrder: $createNewImportOrder) {
            _id
            importProducts {
              _id
              price
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
            employee {
              _id
            }
            supplier {
              _id
            }
            totalPay
            benefitPercent
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
        mutation updateImportOrder($updateImportOrder: UpdateImportOrderInput!) {
          updateImportOrder(updateImportOrder: $updateImportOrder) {
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
        mutation deleteImportOrder($deleteOrder: DeleteImportOrderInput!){
          deleteImportOrder(deleteImportOrder: $deleteImportOrder) {
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

export default importOrderService;
