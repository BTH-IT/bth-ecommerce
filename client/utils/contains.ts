import axiosClient from '@/services/configService';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';

export const predefinedRanges = [
  {
    label: 'Today',
    value: [new Date(), new Date()],
    placement: 'left',
  },
  {
    label: 'Yesterday',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: 'left',
  },
  {
    label: 'This week',
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: 'left',
  },
  {
    label: 'Last 7 days',
    value: [subDays(new Date(), 6), new Date()],
    placement: 'left',
  },
  {
    label: 'Last 30 days',
    value: [subDays(new Date(), 29), new Date()],
    placement: 'left',
  },
  {
    label: 'This month',
    value: [startOfMonth(new Date()), new Date()],
    placement: 'left',
  },
  {
    label: 'Last month',
    value: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    placement: 'left',
  },
  {
    label: 'This year',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: 'left',
  },
  {
    label: 'Last year',
    value: [
      new Date(new Date().getFullYear() - 1, 0, 1),
      new Date(new Date().getFullYear(), 0, 0),
    ],
    placement: 'left',
  },
  {
    label: 'All time',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: 'left',
  },
  {
    label: 'Last week',
    closeOverlay: false,
    value: (value: any) => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), -7),
      ];
    },
    appearance: 'default',
  },
  {
    label: 'Next week',
    closeOverlay: false,
    value: (value: any) => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), 7),
      ];
    },
    appearance: 'default',
  },
];

export function numberWithCommas(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export async function createAxiosGraphql(graphqlQuery: any) {
  const res: any = await axiosClient.post(
    process.env.NEST_SERVER_URL || 'http://localhost:5000/graphql',
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

export function checkIfFilesAreTooBig(files?: [File]): boolean {
  let valid = true;
  if (files) {
    files.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 10) {
        valid = false;
      }
    });
  }
  return valid;
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
