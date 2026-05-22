export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">

                {/* Spinner */}
                <div className="h-12 w-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

                {/* Loading text */}
                <p className="text-gray-600 text-sm tracking-wide">
                    Loading, please wait...
                </p>

            </div>
        </div>
    );
}