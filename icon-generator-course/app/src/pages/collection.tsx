/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";

const CollectionPage: NextPage = () => {
  const icons = api.icons.getIcons.useQuery();
  return (
    <>
      <Head>
        <title>Your Icons</title>
        <meta name="description" content="Your Icons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-24 min-h-screen flex container mx-auto flex-col gap-4 px-8">
        <h1 className="text-4xl">Your Icons</h1>
        <ul className="gap-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6">          
            {icons.data?.map(icon =>(
              <li key={icon.id}>
                  <Image 
                    className="w-full"
                    width="100"
                    height="100"
                    alt={icon.prompt ?? "an image of an icon"}
                    src={`https://icon-generator-course-2.s3.amazonaws.com/${icon.id}`}
                  />
              </li>
            ))}
        </ul>
      </main>
    </>
  );
};

export default CollectionPage;

