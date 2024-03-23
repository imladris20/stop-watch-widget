export default function StopWatchApp() {
  return (
    <main className="w-96 mx-auto flex flex-col justify-center items-center pt-12 gap-6">
      {/* Put your components here */}
      <h2 className="text-lightSalmon font-medium text-7xl ">00:00.00</h2>
      <div className="flex justify-between w-72">
        <button className="text-2xl w-32 h-32 bg-rosyBrown text-white border-4 border-solid border-gray-200 rounded-full">
          Lap
        </button>
        <button className="text-2xl w-32 h-32 bg-goldenRod text-white border-4 border-solid border-gray-200 rounded-full">
          Start
        </button>
      </div>
    </main>
  );
}
