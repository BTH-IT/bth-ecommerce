import { toast } from 'react-toastify';
import axiosClient from "@/services/configService";
export async function createAxiosGraphql(graphqlQuery: any) {
  const data: any = await axiosClient.post(
    process.env.NEST_SERVER_URL || "",
    graphqlQuery,
  );

  if (data.statusCode === 403) {
    throw new Error(data.message);
  }

  return data;
}