import { v7 as uuidv7 } from "uuid";

interface GetUniqueIdParams {
  prefix?: string;
  delimiter?: string;
}

const getUniqueId = ({
  prefix = "",
  delimiter = "-",
}: GetUniqueIdParams = {}): string => {
  const uuid = uuidv7();
  return prefix ? `${prefix}${delimiter}${uuid}` : uuid;
};

export default getUniqueId;
