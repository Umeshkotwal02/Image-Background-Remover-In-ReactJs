import React, { useState } from 'react';
import { removeBackground } from '@imgly/background-removal';
import { Loader2, Wand2 } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import ResultViewer from './components/ResultViewer';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState('Initializing...');

  const processImage = async (file) => {
    try {
      setIsProcessing(true);
      setOriginalImage(URL.createObjectURL(file));

      // Cleanup previous processed image
      if (processedImage) URL.revokeObjectURL(processedImage);

      setProgress('Loading AI Model (This may take a moment first time)...');

      // Configure with progress callback if supported or just await
      // imgly doesn't easily support granular progress in v1 public API easily without config, 
      // but we will just show loading state.

      const blob = await removeBackground(file, {
        progress: (key, current, total) => {
          const percent = Math.round((current / total) * 100);
          setProgress(`Processing: ${key} ${percent}%`);
        }
      });

      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (error) {
      console.error('Removal failed:', error);
      alert('Failed to remove background: ' + error.message);
      setOriginalImage(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">

      {/* Header */}
      <header className="border-b border-white/5 bg-surface/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-500 to-cyan-400 p-2 rounded-lg">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Antigravity AI
            </span>
          </div>
          <div className="text-sm font-medium text-gray-400">
            Local Processing • 100% Privacy
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 pb-1">
              Remove Backgrounds Instantly
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Professional grade background removal running directly in your browser.
              No images are ever uploaded to a server.
            </p>
          </div>

          <div className="min-h-[400px]">
            {!originalImage && (
              <ImageUploader onImageSelect={processImage} isProcessing={isProcessing} />
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-300">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                </div>
                <h3 className="mt-8 text-xl font-semibold">Removing Background...</h3>
                <p className="text-gray-400 mt-2 text-sm">{progress}</p>
                <div className="mt-6 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-progress-indeterminate"></div>
                </div>
              </div>
            )}

            {originalImage && !isProcessing && processedImage && (
              <ResultViewer
                original={originalImage}
                processed={processedImage}
                onReset={reset}
              />
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto py-8 text-center text-gray-600 text-sm">
        <p>© 2025 Antigravity AI. Powered by @imgly/background-removal.</p>
      </footer>
    </div>
  );
}

export default App;
