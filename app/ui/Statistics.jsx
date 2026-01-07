const Statistics = ({ statistics }) => {
  if (!statistics) return null;

  const {
    watching,
    completed,
    on_hold,
    dropped,
    plan_to_watch,
    scores,
  } = statistics;

  const totalVotes = scores.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-xl font-bold mb-4 text-indigo-900">
          Status Distribution
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <h5 className="text-sm text-gray-600 font-semibold">Watching</h5>
            <p className="text-lg font-bold text-blue-600">
              {watching.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <h5 className="text-sm text-gray-600 font-semibold">Completed</h5>
            <p className="text-lg font-bold text-green-600">
              {completed.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <h5 className="text-sm text-gray-600 font-semibold">On Hold</h5>
            <p className="text-lg font-bold text-yellow-600">
              {on_hold.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <h5 className="text-sm text-gray-600 font-semibold">Dropped</h5>
            <p className="text-lg font-bold text-red-600">
              {dropped.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg sm:col-span-2">
            <h5 className="text-sm text-gray-600 font-semibold">
              Plan to Watch
            </h5>
            <p className="text-lg font-bold text-gray-600">
              {plan_to_watch.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-xl font-bold mb-4 text-indigo-900">
          Score Distribution
        </h3>
        <div className="flex flex-col gap-2">
          {scores.slice().reverse().map((scoreItem) => (
            <div key={scoreItem.score} className="flex items-center gap-2">
              <span className="w-4 text-sm font-bold text-gray-700">
                {scoreItem.score}
              </span>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${scoreItem.percentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 w-12 text-right">
                {scoreItem.percentage}%
              </span>
              <span className="text-xs text-gray-400 w-16 text-right">
                ({scoreItem.votes.toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
