export default function VideoModal({
  isOpen,
  onClose,
  exerciseName,
  videoUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  videoUrl: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0D1117] rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            📹 {exerciseName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Video */}
        <div className="flex-1 overflow-y-auto p-4">
          {videoUrl ? (
            <div className="w-full aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title={exerciseName}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-[#1C2128] rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">
                Video no disponible
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
