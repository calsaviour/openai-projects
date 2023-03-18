
import Head from 'next/head';
import BaseLayout from "@/components/BaseLayout";
import styles from '@/styles/Home.module.css'


export default function Home() {
  return (
    <>
		<Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
	  <BaseLayout>
      	<main className={styles.main}>
        	<div className="mt-10 px-4">
              Welcome to Aggregator Bot
        	</div>
		    </main>
      </BaseLayout>
    </>
  )
}
