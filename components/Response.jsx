import React, { useContext, useEffect } from "react";
import { TbCopy } from "react-icons/tb";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-hot-toast";
import { AppContext } from "@/pages/_app";
import { useSession } from "next-auth/react";
import uuid from "react-uuid";
import { supabase } from "@/utils/supabase";

const Response = () => {
  const {
    proposal,
    isOnlyViewingProposal,
    setIsOnlyViewingProposal,
    setCurrentStep,
  } = useContext(AppContext);
  const { data: session } = useSession();

  useEffect(() => {
    const saveHistory = async () => {
      const { data: records, error } = await supabase
        .from("history")
        .select("*")
        .eq("user_id", session.user.id);
      console.log("hasRecord", records);
      // If has history record, only insert proposal ,else create new record
      if (records.length > 0) {
        console.log("Has record", proposal);
        const { error: proposalError } = await supabase
          .from("proposals")
          .insert({
            id: uuid(),
            history_id: records[0].id,
            user_id: session.user.id,
            proposal: proposal,
          });
      } else {
        console.log("Has no record");
        const { data: historyData, error: historyError } = await supabase
          .from("history")
          .insert({
            id: uuid(),
            user_id: session.user.id,
          })
          .select();
        console.log("history Data", historyData);
        const { error: proposalError } = await supabase
          .from("proposals")
          .insert({
            id: uuid(),
            history_id: historyData[0].id,
            user_id: session.user.id,
            proposal: proposal,
          });
      }
    };
    if (!isOnlyViewingProposal && session) {
      saveHistory();
    }
  }, []);

  const handleBack = () => {
    setCurrentStep(1);
    setIsOnlyViewingProposal(false);
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
        <h1 className="text-dark md:text-xl tracking-wider mb-8 pt-4">
          Craft winning proposals with ease
        </h1>
        <button
          onClick={handleBack}
          className="flex items-center justify-center gap-4 bg-primary w-14 md:w-48 shadow-md text-sm rounded-xl py-3 px-0 md:px-8 "
        >
          <MdArrowBackIos />
          <h1 className="tracking-wider hidden md:flex">Back</h1>
        </button>
      </div>
      <div className="flex flex-col p-4 w-full bg-[#ECF2FF] mb-4 rounded-2xl gap-4">
        <div
          onClick={handleCopy}
          className="flex items-center justify-center w-28 gap-4 h-10 rounded-xl cursor-pointer bg-blue-200 hover:bg-blue-300 transition-all duration-300"
        >
          <TbCopy size={20} />
          <h1 className="text-xs md:text-sm tracking-wider">Copy</h1>
        </div>
        <h1 className="tracking-widest">Proposal</h1>
        <p className="text-sm whitespace-pre-wrap">{proposal.text}</p>
      </div>

      {/* Answers */}
      {proposal.answers?.length !== 0 && (
        <h1 className="tracking-wider">Additional Answers</h1>
      )}
      {proposal.answers?.map((question, index) => (
        <div key={index} className="flex flex-col gap-2 mt-4">
          <h1 className="text-sm pl-2 tracking-wider">{`Q ${index + 1} : ${
            question.question
          }`}</h1>
          <h1 className="tracking-wider text-sm bg-[#ECF2FF] px-2 py-2 rounded-xl">
            {`Ans : ${question.answer}`}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Response;
