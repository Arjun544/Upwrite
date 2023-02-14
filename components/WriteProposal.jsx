import React, { useContext } from "react";
import uuid from "react-uuid";
import { RiCloseCircleFill } from "react-icons/ri";
import { HiLightningBolt } from "react-icons/hi";
import { AppContext } from "@/pages";
import { toast } from "react-hot-toast";

const WriteProposal = () => {
  const {
    proposal,
    setProposal,
    about,
    setAbout,
    questions,
    setQuestions,
    setCurrentStep,
  } = useContext(AppContext);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    setQuestions([
      ...questions,
      {
        id: uuid(),
        text: "",
      },
    ]);
  };

  const handleRemoveQuestion = (e, id) => {
    e.preventDefault();
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleUpdateQuestion = (e, index) => {
    const { name, value } = e.target;
    const list = [...questions];
    list[index][name] = value;
    setQuestions(list);
  };

  const handleGenerate = () => {
    if (proposal === "") {
      toast("Proposal can't be empty", {
        icon: "🥺",
      });
    } else if (about === "") {
      toast("Write something about you", {
        icon: "😍",
      });
    } else {
      setCurrentStep(2);
    }
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-dark text-xl tracking-wider mb-8 pt-4">
          Craft winning proposals with ease
        </h1>
        <button
          onClick={handleGenerate}
          className="flex items-center justify-center gap-4 bg-primary w-48 shadow-md text-sm rounded-xl py-3 px-8"
        >
          <HiLightningBolt />
          <h1 className="tracking-wider">Generate</h1>
        </button>
      </div>
      <div className="w-full flex flex-col grow lg:flex-row gap-8">
        <div className="flex flex-col grow bg-white">
          <div className="flex flex-col grow">
            <label
              htmlFor="message"
              className="text-sm tracking-wider text-dark"
            >
              Job Description
            </label>
            <textarea
              id="proposal"
              name="text"
              value={proposal}
              className="block p-4 mt-2 grow text-sm text-dark bg-[#ECF2FF] rounded-xl border-transparent focus:border-transparent focus:ring-2 outline-0"
              placeholder="Copy and paste job description here..."
              onChange={(e) => setProposal(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col grow">
            <label
              htmlFor="message"
              className="text-sm tracking-wider text-dark mt-5"
            >
              About You
            </label>
            <textarea
              id="proposal"
              name="text"
              value={about}
              className="block p-4 mt-2 mb-4 grow text-sm text-dark bg-[#ECF2FF] rounded-xl border-transparent focus:border-transparent focus:ring-2 outline-0"
              placeholder="Copy and paste job description here..."
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="flex grow flex-col bg-white">
          <h1 className="text-dark tracking-wider mb-5 text-sm">
            Additional questions
          </h1>
          {questions.map((question, index) => (
            <div key={question.id} className="flex items-center my-2 gap-4">
              <input
                id="proposal"
                rows={2}
                className="block p-4 w-full text-sm text-white bg-[#ECF2FF] rounded-xl border-transparent focus:border-transparent focus:ring-2 outline-0"
                placeholder={`Question ${index + 1} here...`}
                onChange={(e) => handleUpdateQuestion(e, index)}
              ></input>
              <RiCloseCircleFill
                onClick={(e) => handleRemoveQuestion(e, question.id)}
                size={24}
                className="text-dark cursor-pointer"
              />
            </div>
          ))}
          <button
            onClick={handleAddQuestion}
            className="bg-primary shadow-sm w-52 text-sm rounded-xl py-3 px-8 mt-6"
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteProposal;
