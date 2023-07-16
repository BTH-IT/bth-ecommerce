import axiosClient from '@/services/configService';

export async function createAxiosGraphql(graphqlQuery: any) {
  const res: any = await axiosClient.post(
    process.env.NEST_SERVER_URL || '',
    graphqlQuery,
  );

  if (res.statusCode && res.statusCode !== 200) {
    throw new Error(res.message);
  }

  return res.data;
}

export function convertCurrency(value: number): string {
  return value.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
}

export const filterList = [
  {
    ma: 'brand',
    ten: 'Thương hiệu',
  },
  {
    ma: 'seriesLaptop',
    ten: 'Series laptop',
  },
  {
    ma: 'color',
    ten: 'Màu sắc',
  },
  {
    ma: 'seriesCpu',
    ten: 'Series CPU',
  },
  {
    ma: 'chip',
    ten: 'Chip đồ họa rời',
  },
  {
    ma: 'ramSize',
    ten: 'Dung lượng RAM',
  },
  {
    ma: 'size',
    ten: 'Khối lượng',
  },
];
