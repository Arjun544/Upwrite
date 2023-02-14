import "@/styles/globals.css";
import { Poppins } from "@next/font/google";
import Layout from "../components/Layout.jsx";
import { createContext, useState } from "react";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const AppContext = createContext(null);

export default function App({ Component, pageProps }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [proposal, setProposal] = useState({});
  const [proposalInput, setProposalInput] = useState("");
  const [about, setAbout] = useState("");
  const [questions, setQuestions] = useState([]);
  return (
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
  );
}
