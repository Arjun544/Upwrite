import { AppContext } from "@/pages";
import moment from "moment";
import React, { useContext } from "react";
import { RiTimeFill } from "react-icons/ri";
import { TbCopy } from "react-icons/tb";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-hot-toast";

const Response = () => {
  const {
    proposal,
    proposalInput,
    about,
    questions,
    setQuestions,
    setCurrentStep,
  } = useContext(AppContext);

  const handleBack = () => {
    setCurrentStep(1);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(proposal.text);
    toast("Copied", {
      icon: "🚀",
    });
  };
  return (
    <div className="flex flex-col grow overflow-y-scroll">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-dark text-xl tracking-wider mb-8 pt-4">
          Craft winning proposals with ease
        </h1>
        <button
          onClick={handleBack}
          className="flex items-center justify-center gap-4 bg-primary w-38 shadow-md text-sm rounded-xl py-3 px-8"
        >
          <MdArrowBackIos />
          <h1 className="tracking-wider">Back</h1>
        </button>
      </div>
      <div className="flex flex-col p-4 w-full bg-[#ECF2FF] mb-4 rounded-2xl gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center px-4 gap-2 h-10 rounded-xl bg-slate-300">
            <RiTimeFill size={20} />
            <h1 className="text-sm">
              {moment(Date.parse(Date(proposal.created * 1000)))
                .startOf("hour")
                .fromNow()}
            </h1>
          </div>
          <div
            onClick={handleCopy}
            className="flex items-center px-4 gap-4 h-10 rounded-xl cursor-pointer bg-blue-200 hover:bg-blue-300 transition-all duration-300"
          >
            <TbCopy size={20} />
            <h1 className="text-sm">Copy</h1>
          </div>
        </div>
        <h1 className="tracking-widest">Proposal</h1>
        <p className="text-sm whitespace-pre-wrap">{proposal.text}</p>
      </div>

      {/* Answers */}
      {proposal.answers && (
        <h1 className="tracking-wider">Additional Answers</h1>
      )}
      {proposal.answers?.map((question, index) => (
        <div key={index} className="flex flex-col gap-2 mt-4">
          <h1 className="text-sm pl-2 tracking-wider">{`Q ${index+1} : ${question.question}`}</h1>
          <h1 className="tracking-wider text-sm bg-[#ECF2FF] px-2 py-2 rounded-xl">
            {`Ans : ${question.answer}`}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Response;
