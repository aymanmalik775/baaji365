import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { UserType } from '../../../components/UI/UserTable';
import { connectToDB } from '../../../DB/conntection';
import User, { IUser } from '../../../DB/models/UserSchema';
import { nextAuthOptions } from '../auth/[...nextauth]';

export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PATCH?: Function;
  DELETE?: Function;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  await connectToDB();

  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
  const userType = req.query.userType as UserType;

  const catcher = (error: Error) => res.status(400).json({ error });

  const filter: Partial<IUser> = {};
  if (userType) filter.role = userType;

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const response = await User.find<IUser[]>(filter).catch(catcher);
      return res.status(200).json({
        status: 'success',
        data: response
      });
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      if (!session) {
        res.status(401).json('You are not allowed to perform this action.');
      }
      const user: IUser = await User.create(req.body).catch(catcher);
      return res.status(200).json({
        status: 'success',
        data: user
      });
    }
  };

  const response = handleCase[method];
  if (response) return response(req, res);
  else return res.status(400).json({ error: 'No Response for This Request' });
};

export default handler;
