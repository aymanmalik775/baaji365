import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { ResponseFuncs } from '.';
import { connectToDB } from '../../../DB/conntection';
import User, { IUser } from '../../../DB/models/UserSchema';
import { nextAuthOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  if (!session) {
    res.status(401).json('You are not allowed to perform this action.');
  }
  await connectToDB();

  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
  const userId = req.query.userId as string;

  const catcher = (error: Error) => res.status(400).json({ error });

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const response = await User.findById<IUser>(userId).catch(catcher);
      return res.status(200).json({
        status: 'success',
        data: response
      });
    },
    PATCH: async (req: NextApiRequest, res: NextApiResponse) => {
      const user: IUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true
      }).catch(catcher);
      return res.status(200).json({
        status: 'success',
        data: user
      });
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      await User.findByIdAndDelete(userId).catch(catcher);
      return res.status(200).json({
        status: 'success'
      });
    }
  };

  const response = handleCase[method];
  if (response) return response(req, res);
  else return res.status(400).json({ error: 'No Response for This Request' });
};

export default handler;
