import React from 'react';
import { Download, RefreshCw, Check } from 'lucide-react';

export default function ResultViewer({ original, processed, onReset }) {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = processed;
        link.download = 'removed-bg.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">

            {/* Action Bar */}
            <div className="flex justify-between items-center bg-surface/50 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Upload New</span>
                </button>

                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 font-medium"
                >
                    <Download className="w-4 h-4" />
                    <span>Download HD</span>
                </button>
            </div>

            {/* Comparison View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Original */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-400 px-1">
                        <span>Original</span>
                        <span className="bg-gray-800 px-2 py-0.5 rounded text-xs">JPG/PNG</span>
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 border border-white/10 group">
                        <img
                            src={original}
                            alt="Original"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* Processed */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-blue-400 px-1">
                        <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5" />
                            Background Removed
                        </span>
                        <span className="bg-blue-500/10 px-2 py-0.5 rounded text-xs">PNG</span>
                    </div>
                    {/* Checkerboard background for transparency */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-primary/50 bg-[url('https://res.cloudinary.com/practicaldev/image/fetch/s--_MCEk7P0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/1wwdyw5de8avrdkgtz5n.png')] bg-repeat group">
                        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[1px]" />
                        {/* Just generic checkerboard pattern via CSS or image */}
                        <div
                            className="absolute inset-0 z-0"
                            style={{
                                backgroundImage: `
                    linear-gradient(45deg, #1e293b 25%, transparent 25%), 
                    linear-gradient(-45deg, #1e293b 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #1e293b 75%), 
                    linear-gradient(-45deg, transparent 75%, #1e293b 75%)`,
                                backgroundSize: '20px 20px',
                                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                            }}
                        />
                        <img
                            src={processed}
                            alt="Processed"
                            className="relative z-10 w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
