import React, { useState } from "react";
import uuid from "react-uuid";
import { RiCloseCircleFill } from "react-icons/ri";

const WriteProposal = () => {
  const [questions, setQuestions] = useState([]);
  console.log(questions);

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

  return (
    <div className="w-3/4 h-full">
      <h1 className="text-white text-xl tracking-wider mb-4">
        Craft winning proposals with ease
      </h1>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm tracking-wider text-white mt-10"
        >
          Job Description
        </label>
        <textarea
          id="proposal"
          name="text"
          rows={10}
          className="block p-2 m-2 text-sm text-white bg-[#2D4263] rounded-xl border-transparent focus:border-transparent focus:ring-2 outline-0"
          placeholder="Copy and paste job description here..."
        ></textarea>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm tracking-wider text-white mt-10"
        >
          About you
        </label>
        <textarea
          id="About you"
          rows={10}
          className="block p-2 text-sm text-white bg-[#2D4263] rounded-xl border-transparent focus:border-transparent focus:ring-2 outline-0"
          placeholder="Write about yourself in details, like introduction, work experience and projects"
        ></textarea>
      </div>
      <h1 className="text-white tracking-wider mt-10 mb-5">
        Additional questions
      </h1>
      {questions.map((question, index) => (
        <div key={question.id} className="flex items-center my-4 gap-4">
          <input
            id="proposal"
            rows={2}
            className="block p-4 text-sm text-white bg-[#2D4263] rounded-xl border-transparent focus:border-transparent focus:ring-2 outline-0"
            placeholder={`Question ${index + 1} here...`}
            onChange={(e) => handleUpdateQuestion(e, index)}
          ></input>
          <RiCloseCircleFill
            onClick={(e) => handleRemoveQuestion(e, question.id)}
            size={24}
            className="text-white cursor-pointer"
          />
        </div>
      ))}
      <button
        onClick={handleAddQuestion}
        className="bg-primary rounded-xl py-3 px-8"
      >
        Add Question
      </button>
    </div>
  );
};

export default WriteProposal;
