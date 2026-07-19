import React from "react";
import useGetSubmissions from "../hooks/Forms/useGetSubmissions";
import { useParams } from "react-router-dom";
import useGetForm from "../hooks/Forms/useGetForm";
import TopBar from "../Components/TopBar/TopBar";
import Loading from "../Loading/Loading";

function ShowSubmissions() {
  const { id } = useParams();
  const { submissionsData, loading } = useGetSubmissions(id);
  const formLabel = useGetForm(id);

  return (
    <>
      <TopBar title="Clients" />
      {loading && <Loading />}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {submissionsData.length < 1 && !loading && <p>لا يوجد اجابات</p>}
        {submissionsData?.map((card) => (
          <div
            key={card.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                {Object.values(card.data)[0]?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {Object.values(card.data)[0]}
                </h2>

                <p className="text-sm text-gray-500">Submission #{card.id}</p>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(card.data).map(([key, value]) => {
                const field = formLabel?.fields?.find(
                  (item) => item.id === key,
                );

                return (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                  >
                    <span className="font-medium text-gray-600">
                      {field?.label}
                    </span>

                    <span className="max-w-[170px] break-words text-right font-semibold text-gray-800">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>

            <button className="mt-6 cursor-pointer w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
              👁 View Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ShowSubmissions;
