import { v4 as uuidv4 } from "uuid";

interface GetUniqueIdParams {
  prefix?: string;
  delimiter?: string;
}

const getUniqueId = ({
  prefix = "",
  delimiter = "-",
}: GetUniqueIdParams = {}): string => {
  const uuid = uuidv4();
  return prefix ? `${prefix}${delimiter}${uuid}` : uuid;
};

export default getUniqueId;
