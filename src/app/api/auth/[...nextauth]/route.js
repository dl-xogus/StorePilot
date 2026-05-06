
import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import clientPromise from '@/lib/mongodb';

export const authOption = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const account = await client
          .db('store_pilot')
          .collection('account')
          .findOne({ id: credentials.email });

        if (account && account.password === credentials.password) {
          return { id: account.id, email: account.id, name: account.name ?? '' };
        }
        return null;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // 일반 로그인은 authorize에서 이미 검증 완료
      if (account.provider === 'credentials') return true;

      const res = await axios.post('http://localhost:3000/api/user',{email:user.email});

      if(!res.data.result){
       return '/welcome';
      }else{
        return '/main'
      }
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.id;
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.user.id = token.id

      return session
    }
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
