import { auth } from ".";

export const getSession = async (request: Request) => {
  return await auth().api.getSession(request);
};
