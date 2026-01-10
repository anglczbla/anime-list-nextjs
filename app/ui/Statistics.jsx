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

  // Calculate Weighted Average Score
  const totalVotes = scores.reduce((acc, curr) => acc + curr.votes, 0);
  const totalWeightedScore = scores.reduce(
    (acc, curr) => acc + curr.score * curr.votes,
    0
  );
  const averageScore =
    totalVotes > 0 ? (totalWeightedScore / totalVotes).toFixed(2) : "0.00";

  const statsList = [
    { label: "Avg Score", value: averageScore },
    { label: "Watching", value: watching },
    { label: "Completed", value: completed },
    { label: "On Hold", value: on_hold },
    { label: "Dropped", value: dropped },
    { label: "Plan to Watch", value: plan_to_watch },
  ];

  const StatCard = ({ label, value }) => (
    <div className="flex flex-col justify-center items-center rounded-lg border dark:border-slate-700 p-2 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">{label}</h4>
      <p className="text-md font-semibold text-slate-800 dark:text-slate-200">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border dark:border-slate-700">
        <h3 className="text-md font-bold mb-2 text-indigo-900 dark:text-indigo-300 border-b dark:border-slate-700 pb-1">
          User Statistics
        </h3>
        <div className="grid grid-cols-2 gap-2 text-center">
          {statsList.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border dark:border-slate-700">
        <h3 className="text-md font-bold mb-2 text-indigo-900 dark:text-indigo-300 border-b dark:border-slate-700 pb-1">
          Score Stats
        </h3>
        <div className="flex flex-col gap-2">
          {scores
            .slice()
            .reverse()
            .map((scoreItem) => (
              <div key={scoreItem.score} className="flex items-center gap-2">
                <span className="w-4 text-xs font-bold text-gray-700 dark:text-gray-300">
                  {scoreItem.score}
                </span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500"
                    style={{ width: `${scoreItem.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 w-10 text-right">
                  {scoreItem.percentage}%
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
