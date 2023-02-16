import WriteProposal from "@/components/WriteProposal";
import Response from "@/components/Response";
import Head from "next/head";
import { useContext } from "react";
import { AppContext } from "./_app";
import { getSession } from "next-auth/react";
import nookies from "nookies";


export default function Home() {
  const { currentStep, setCurrentStep } = useContext(AppContext);

  return (
    <>
      <Head>
        <title>Upwrite</title>
        <meta
          name="description"
          content="Craft winning proposals with ease"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full min-h-screen gap-8 pr-4 pl-[70px] md:pl-28 overflow-hidden">
        {currentStep === 1 ? (
          <WriteProposal setCurrentStep={setCurrentStep} />
        ) : (
          <Response />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session) {
    nookies.set(ctx, "supabaseAccessToken", session.supabaseAccessToken, {
      path: "/",
    });
  }

  return {
    props: {
      session,
    },
  };
}
