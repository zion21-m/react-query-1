import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { dehydrate, QueryClient, useQuery } from "react-query";

const getSpaceXData = async () =>
  await (await fetch("https://api.spacexdata.com/v4/launches/latest")).json();

export default function Home() {
  const { data, isLoading, isFetching } = useQuery("spacex", getSpaceXData);
  console.log(data);
  if (isLoading) return <h1>Chargement des données ...</h1>;
  if (!data) return <h1>Données non disponibles</h1>;
  return (
    <div className={styles.container}>
      <h1>{data?.name}</h1>
      <Image
        src={data?.links.patch.large}
        alt="patch-image"
        width={500}
        height={500}
      />
    </div>
  );
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery("spacex", getSpaceXData);
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("spacex", getSpaceXData);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
