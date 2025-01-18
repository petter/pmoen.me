import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'mdx'],
  rewrites: async () => {
    return [
      {
        source: '/drone',
        destination: '/drone/UserCertificate.pdf',
      },
    ];
  },
};

export default withMDX()(nextConfig);
