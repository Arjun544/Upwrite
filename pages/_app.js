import "@/styles/globals.css";
import { Poppins } from "@next/font/google";
import Layout from "../components/Layout.jsx";
import { createContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

import { SessionProvider } from "next-auth/react";
export const AppContext = createContext(null);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [proposal, setProposal] = useState({});
  const [proposalInput, setProposalInput] = useState("");
  const [about, setAbout] = useState("");
  const [questions, setQuestions] = useState([]);
  const { supabaseAccessToken } = session || {};

  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken ?? ""}`,
        },
      },
    }
  );

  return (
    <SessionProvider session={session}>
      <main className={poppins.className}>
        <AppContext.Provider
          value={{
            setCurrentStep,
            currentStep,
            proposal,
            setProposal,
            proposalInput,
            setProposalInput,
            about,
            setAbout,
            questions,
            setQuestions,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
      </main>
    </SessionProvider>
  );
}
