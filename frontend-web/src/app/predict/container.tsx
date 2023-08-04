"use client";
import React from "react";
import _ from "lodash";
import {
  SunIcon,
  MoonIcon,
  ArrowUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import * as idb from "idb-keyval";
import { useRouter } from "next/navigation";
import { predict } from "@/clients/frontend_client";

export interface Card {
  icon?: React.ReactNode;
  title: string;
  description: string;
}
export interface TableRow {
  sign: string;
  planets: string[];
  houses: number[];
}

export interface Description {
  header: string;
  short_summary: string;
  long_description: string;
}

export interface Asepect {
  first_planet: string;
  second_planet: string;
  name: string;
  direction: string;
}

export interface PredictResponse {
  astro_table: TableRow[];
  aspects: Asepect[];
  descriptions: Description[];
}

export interface PredictRequest {
  birthday: string;
  birthtime: string;
  birthplace: string;
}

export interface ChatRequest {
  question: string;
  astro_table: AstroTable;
  aspect: Aspect;
}

export interface AstroTable {
  astro_table: TableRow[];
}

export interface Aspect {
  aspects: Asepect[];
}

export interface ChatResponse {
  short_summary: string;
  long_description: string;
}

const icons = [
  <SunIcon className="w-10 h-10" />,
  <MoonIcon className="w-10 h-10" />,
  <ArrowUpIcon className="w-10 h-10" />,
];

export function PredictPageContainer({
  prediction,
}: {
  prediction: PredictRequest;
}) {
  const [predictRes, setPredictRes] = React.useState({} as PredictResponse);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('table');

  const router = useRouter();
  React.useEffect(() => {
    setIsLoading(true);
    predict(prediction).then((res: PredictResponse) => {
      setIsLoading(false);
      setPredictRes(res);
      idb.set("horoscopeAI", res).catch((e) => console.error(e));
    });
  }, []);

  const processTable = (): (string | number)[][] => {
    var rows = [];
    for (var i = 0; i < predictRes.astro_table.length; i++) {
      var row = predictRes.astro_table[i];
      var rowCount = _.max([row.planets.length, 1]) || 0;
      for (var j = 0; j < rowCount; j++) {
        var gong = row.planets[j];
        var house = row.houses[j];
        if (j == 0) {
          rows.push([row.sign, j, rowCount, gong, house]);
        } else {
          rows.push(["", j, rowCount, gong, ""]);
        }
      }
    }
    return rows;
  };

  const onClickChatButton = () => {
    router.push("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      {!isLoading && (
        <div>
          <button className="w-32 h-12" onClick={() => setActiveTab('table')}>Table</button>
          <button className="w-32 h-12" onClick={() => setActiveTab('circle')}>Circle</button>
        </div>
      )}

      {isLoading && (
        <>
          <span className="loading loading-spinner loading-lg mt-60"></span>
          <h2 className="text-2xl font-semibold mt-8">Analyzing..</h2>
        </>
      )}
      {!_.isEmpty(predictRes) && !isLoading && (
        <>
        {activeTab === 'table' && 
      <div style={{ overflowX: 'auto' }}>
          <div className="px-6 sm:px-8 lg:px-10 w-full border">
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle ">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th className="text-center py-2 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                          Signs
                        </th>
                        <th className="text-center py-2 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                          Planets
                        </th>
                        <th className="text-center py-2 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                          Houses
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {processTable().map((row, index) => {
                        const rowCount = row[2] as number;
                        var rowSpan = 1;
                        if (rowCount > 1 && row[1] == 0) {
                          rowSpan = rowCount;
                        }
                        return (
                          <tr key={index} className="">
                            {row[0] !== "" && (
                              <td
                                className="text-center capitalize py-2 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0"
                                rowSpan={rowSpan}
                              >
                                {row[0]}
                              </td>
                            )}
                            <td className="text-center border-x py-2 text-sm bg-gray-200 capitalize">
                              {row[3]}
                            </td>
                            {row[4] !== "" && (
                              <td
                                className="text-center capitalize py-2 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0"
                                rowSpan={rowSpan}
                              >
                                {row[4]}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>  
      </div>}
      {activeTab === 'circle' && <img src="chart.png" alt="Description of Image" style={{width: '50%', height: 'auto'}}/>}
          <div className="flex flex-col space-y-8">
            {predictRes.descriptions.map((card, index) => {
              return (
                <div
                  key={`short-summary-${index}`}
                  className="flex flex-col justify-center items-center space-y-2 text-center"
                >
                  {icons[index]}
                  <h2 className="text-2xl font-semibold">{card.header}</h2>
                  <p className="text-lg">{card.short_summary}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-full sm:w-1/2 mx-auto space-y-8 mt-4">
            {predictRes.descriptions.map((detail, index) => {
              return (
                <div
                  key={`long-summary-${index}`}
                  className="flex flex-col space-y-4 border p-8 "
                >
                  <h2 className="text-2xl font-bold">{detail.header}</h2>
                  <p>{detail.long_description}</p>
                </div>
              );
            })}
          </div>

          <div className="fixed flex flex-row left-0 w-full bottom-16">
            <button
              className="btn btn-circle btn-primary rounded-full font-bold py-2 px-4 justify-center mx-auto"
              onClick={onClickChatButton}
            >
              <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
