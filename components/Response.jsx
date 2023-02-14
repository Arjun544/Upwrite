import { AppContext } from "@/pages";
import moment from "moment";
import React, { useContext } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { RiTimeFill } from "react-icons/ri";
import { TbCopy } from "react-icons/tb";


const Response = () => {
  const { questions, setQuestions, setCurrentStep } = useContext(AppContext);

  const handleBack = () => {
    setCurrentStep(1);
  };
  return (
    <div className="flex flex-col grow">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-dark text-xl tracking-wider mb-8 pt-4">
          Craft winning proposals with ease
        </h1>
        <button
          onClick={handleBack}
          className="flex items-center justify-center gap-4 bg-primary w-48 shadow-md text-sm rounded-xl py-3 px-8"
        >
          <MdArrowBackIos />
          <h1 className="tracking-wider">Back</h1>
        </button>
      </div>
      <div className="flex flex-col p-4 w-full bg-[#ECF2FF] mb-4 rounded-2xl gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center px-4 gap-2 h-10 rounded-xl bg-slate-300">
            <RiTimeFill size={20} />
            <h1 className="text-sm">{moment().calendar()}</h1>
          </div>
          <div className="flex items-center px-4 gap-4 h-10 rounded-xl cursor-pointer bg-blue-200 hover:bg-blue-300 transition-all duration-300">
            <TbCopy size={20} />
            <h1 className="text-sm">Copy</h1>
          </div>
        </div>
        <h1 className="font-semibold tracking-widest">Proposal</h1>
        <p className="text-sm">
          Subject: Proposal for Mobile App Monetization Expert Dear [Client], I
          hope this proposal finds you in good health and high spirits. I am
          writing to express my interest in the job of exploring your news
          mobile app and deciding the best monetization strategy for it. With 3
          years of experience in software development, I believe I have the
          necessary skills and expertise to help you achieve your goals. As a
          mobile app monetization expert, I have a deep understanding of various
          ad networks, ad units, and their implementation. I can help you decide
          which ad networks to use and what type of ad units to implement to
          maximize your revenue. I am well-versed in placing the ad units in the
          most effective locations to maximize their impact and increase
          revenue. My expertise extends to a wide range of software development
          areas, including web and mobile app development, frontend and backend
          development, SQL and NoSQL databases, Restful API development,
          real-time events, and highly organized and reusable code. I am
          confident that my experience and skills can help you achieve the
          desired results for your news mobile app. I would love the opportunity
          to discuss your project further and demonstrate my abilities in
          person. Please let me know if there is a convenient time for us to
          talk and if you need any additional information from me. I look
          forward to hearing from you soon. Best regards, [Your Name]
        </p>
      </div>

      {/* Answers */}
      <h1 className="tracking-wider">Additional Answers</h1>
      
    </div>
  );
};

export default Response;
