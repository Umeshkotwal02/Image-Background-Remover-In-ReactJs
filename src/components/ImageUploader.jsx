import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

export default function ImageUploader({ onImageSelect, isProcessing }) {
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        if (isProcessing) return;

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            onImageSelect(file);
        }
    }, [onImageSelect, isProcessing]);

    const handleChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            onImageSelect(file);
        }
    }, [onImageSelect]);

    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`
        relative group cursor-pointer
        border-2 border-dashed border-gray-600 rounded-2xl
        h-96 w-full max-w-2xl mx-auto
        flex flex-col items-center justify-center
        transition-all duration-300
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-surface/50'}
        bg-surface/30 backdrop-blur-sm
      `}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                disabled={isProcessing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />

            <div className="flex flex-col items-center space-y-4 text-center p-6">
                <div className="p-4 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">Upload an Image</h3>
                    <p className="text-gray-400">Drag & drop or click to browse</p>
                </div>
                <div className="text-xs text-gray-500 mt-4">
                    Supports PNG, JPG, WEBP up to 10MB
                </div>
            </div>
        </div>
    );
}
