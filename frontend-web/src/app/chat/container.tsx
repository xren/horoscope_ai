"use client";

import _ from "lodash";
import { SunIcon, MoonIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import {
  BarsArrowUpIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { chat } from "@/clients/frontend_client";
import * as idb from "idb-keyval";
import { PredictResponse } from "../predict/container";

const tabs = [
  { name: "SELF", href: "#", current: false },
  { name: "LOVE", href: "#", current: false },
  { name: "WORK", href: "#", current: true },
  { name: "MOOD", href: "#", current: false },
];

const questions = {
  SELF: [
    "WHO AM I REALLY?",
    "WHAT SHOULD I BE DOING WITH MY LIFE?",
    "WHAT ARE MY RED FLAGS?",
  ],
  LOVE: [
    "HAVE I MET MY SOULMATE?",
    "WILL I EVER FIND LOVE?",
    "WHAT'S MY TYPE?",
  ],
  WORK: [
    "WILL I BE SUCCESSFUL?",
    "WHAT GOAL SHOULD I SET FOR MYSELF?",
    "SHOULD I QUIT MY JOB?",
  ],
  MOOD: [
    "WHAT IS A TRUTH THAT I'VE BEEN IGNORING?",
    "SHOULD I START A CULT?",
    "AM I A POET?",
  ],
} as { [key: string]: string[] };

export function ChatContainer() {
  const [section, setSection] = React.useState("SELF");
  const [question, setQuestion] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({} as PredictResponse);

  React.useEffect(() => {
    idb.get("horoscopeAI").then(async (saved: PredictResponse) => {
      if (saved) {
        setPayload(saved);
      }
    });
  }, []);

  const onClickTabs = (name: string) => {
    setSection(name);
  };

  const onClickQuestion = (question: string) => {
    setQuestion(question);
  };

  const onChangePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const onClickAsk = async () => {
    const response = await chat({
      question: question,
      astro_table: payload.astro_table,
      aspect: payload.aspect,
    }).then((res) => {
      setOpen(true);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      <div className="relative pt-40 w-full sm:w-1/2 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-7xl font-bold text-gray-900">
          Hi, Chandler.
        </h1>
        <h1 className="text-4xl sm:text-7xl font-bold text-gray-900">
          What's on your mind?
        </h1>
      </div>
      <div className="px-4 w-full justify-center items-center flex flex-col space-y-8">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-lg"
        />

        <button
          type="button"
          className="btn btn-primary relative -ml-px inline-flex items-center gap-x-1.5  px-3 py-2 text-sm"
          onClick={onClickAsk}
        >
          {isLoading && (
            <span className="loading loading-spinner loading-md"></span>
          )}
          Ask Me
        </button>
      </div>

      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center text-center">
        <div className="relative w-full sm:w-1/2 mt-20 mb-8">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-gray-500">
              Example Questions
            </span>
          </div>
        </div>
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                section == tab.name
                  ? "bg-gray-100 text-gray-700"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-md px-3 py-2 text-sm font-medium flex flex-col justify-center items-center text-center"
              )}
              aria-current={section == tab.name ? "page" : undefined}
              onClick={() => onClickTabs(tab.name)}
            >
              <QuestionMarkCircleIcon className="w-10 h-10" />
              {tab.name}
            </a>
          ))}
        </nav>
        <div className="mt-8">
          <ul className="space-y-8">
            {questions[section].map((question: string) => (
              <li
                key={question}
                className="underline cursor-pointer"
                onClick={() => onClickQuestion(question)}
              >
                {question}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-start sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-chatdetailmodal text-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="flex flex-col text-black border-2 border-black">
                    <div className="flex flex-col items-center justify-center space-y-4 p-4">
                      <h2>You asked</h2>
                      <p>{question}</p>
                    </div>
                    <div className="grid grid-cols-2 text-center items-center p-4 justify-center space-y-4 border-t-2 border-black">
                      <img
                        src="/chat_ill.png"
                        className="w-32 mx-auto h-full"
                      />
                      <p>
                        You are a natural leader and others look to you to lead
                        the way.{" "}
                      </p>
                    </div>
                    <div className="p-4 flex flex-col items-center justify-center space-y-4 border-t-2 border-black">
                      <p>
                        You are a natural leader and others look to you to lead
                        the way. You are independent, loyal and proud. You are
                        very ambitious and usually get what you want. You are
                        generous and warm. You love to be in the limelight and
                        are very creative and attractive. You are a natural
                        leader and others look to you to lead the way. You are
                        independent, loyal and proud. You are very ambitious and
                        usually get what you want. You are generous and warm.
                        You love to be in the limelight and are very creative
                        and attractive. You are a natural leader and others look
                        to you to lead the way. You are independent, loyal and
                        proud. You are very ambitious and usually get what you
                        want. You are generous and warm. You love to be in the
                        limelight and are very creative and attractive. You are
                        a natural leader and others look to you to lead the way.
                        You are independent, loyal and proud. You are very
                        ambitious and usually get what you want. You are
                        generous and warm. You love to be in the limelight and
                        are very creative and attractive.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="btn btn-primary inline-flex w-full justify-center"
                      onClick={() => setOpen(false)}
                    >
                      Dismiss
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
