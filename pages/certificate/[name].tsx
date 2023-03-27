import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { promises as fs } from 'fs';
import path from 'path';

export default function Certificate({ name }: { name: string }) {
  return (
    <>
      <Head>
        <title>{name} - Titeenit certificate</title>
      </Head>
      <div className="w-screen h-screen">
        <iframe
          src={`/certificates/${name}.pdf`}
          title="Resume - Petro Silenius"
          height="100%"
          width="100%"
        >
          This browser does not support PDFs. Please download the certificate to
          view it:
          <a href={`/certificates/${name}.pdf`}>Download certificate</a>
        </iframe>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params?.name as string;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  return {
    props: {
      name: capitalizedName,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const certificatesDirectory = path.join(process.cwd(), 'public/certificates');
  const filenames = await fs.readdir(certificatesDirectory);

  const paths = filenames.map((filename) => {
    const name = filename.replace(/\.pdf$/, '').toLowerCase();
    return {
      params: { name },
    };
  });

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};
