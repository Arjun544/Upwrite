import "@/styles/globals.css";
import { Poppins } from "@next/font/google";
import Layout from "../components/Layout.jsx";
import { createContext, useState } from "react";

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
  const [descriptionInput, setDescriptionInput] = useState("");
  const [about, setAbout] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isOnlyViewingProposal, setIsOnlyViewingProposal] = useState(false);

  return (
    <SessionProvider session={session}>
      <main className={poppins.className}>
        <AppContext.Provider
          value={{
            setCurrentStep,
            currentStep,
            proposal,
            setProposal,
            descriptionInput,
            setDescriptionInput,
            about,
            setAbout,
            questions,
            setQuestions,
            isOnlyViewingProposal,
            setIsOnlyViewingProposal,
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
