import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const allowedEmails = [
        'nahidhasan830@gmail.com',
        'aymanmalik775@gmail.com'
      ];
      return allowedEmails.includes(user?.email ?? '');
    }
  }
});
