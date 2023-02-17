import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import React, { createContext, useState } from "react";
import NextNProgress from "nextjs-progressbar";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

import { SessionProvider } from "next-auth/react";
import { AppContent, LocalProposal, LocalQuestion } from "../utils/types";
import Layout from "../components/Layout";

export const AppContext = createContext<AppContent>(null);

const App: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [proposal, setProposal] = useState<LocalProposal>();
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [questions, setQuestions] = useState<Array<LocalQuestion>>([]);
  const [isOnlyViewingProposal, setIsOnlyViewingProposal] =
    useState<boolean>(false);
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
            <NextNProgress color="#03C988" height={5} />
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
      </main>
    </SessionProvider>
  );
};

export default App;

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [proposal, setProposal] = useState({});
//   const [descriptionInput, setDescriptionInput] = useState("");
//   const [about, setAbout] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [isOnlyViewingProposal, setIsOnlyViewingProposal] = useState(false);

//   return (
//
//   );
// }
