import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, FileCheck, X, AlertCircle } from 'lucide-react';

export interface DroppedFileInfo {
  file: File;
  name: string;
  sizeFormatted: string;
  type: string;
}

interface FileDropzoneProps {
  onFileSelect: (fileInfo: DroppedFileInfo | null) => void;
  selectedFile?: DroppedFileInfo | null;
  acceptedFormats?: string; // e.g. ".pdf,.dcm,.jpg,.jpeg,.png"
  maxSizeMB?: number;
  label?: string;
  helperText?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileSelect,
  selectedFile,
  acceptedFormats = '.pdf,.dcm,.jpg,.jpeg,.png',
  maxSizeMB = 25,
  label = 'Drop a file or browse files',
  helperText = 'Supports PDF, DICOM, JPG, PNG up to 25 MB',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const processFile = (file: File) => {
    setErrorMessage(null);

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`File exceeds maximum size of ${maxSizeMB} MB`);
      return;
    }

    const info: DroppedFileInfo = {
      file,
      name: file.name,
      sizeFormatted: formatFileSize(file.size),
      type: file.type || 'application/octet-stream',
    };

    onFileSelect(info);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
    // reset input so same file can be re-selected if removed
    e.target.value = '';
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMessage(null);
    onFileSelect(null);
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') {
      return <FileText className="w-6 h-6 text-rose-500" />;
    }
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
      return <ImageIcon className="w-6 h-6 text-[#5C24FF]" />;
    }
    return <FileCheck className="w-6 h-6 text-emerald-500" />;
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleInputChange}
        className="hidden"
      />

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 group ${
            isDragOver
              ? 'border-[#5C24FF] bg-purple-50/70 scale-[0.99] shadow-inner'
              : 'border-slate-200/90 hover:border-[#5C24FF]/60 bg-gradient-to-b from-purple-50/30 to-white hover:bg-purple-50/40'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                isDragOver
                  ? 'bg-[#5C24FF] text-white shadow-md scale-110'
                  : 'bg-purple-100 text-[#5C24FF] group-hover:scale-105'
              }`}
            >
              <UploadCloud className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <p className="font-sora font-semibold text-xs sm:text-sm text-slate-800">
                <span className="text-[#5C24FF] underline decoration-[#5C24FF]/40 group-hover:decoration-[#5C24FF]">
                  {label}
                </span>
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                {helperText}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                PDF
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                DICOM (.dcm)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                JPG / PNG
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3.5 bg-gradient-to-r from-purple-50/60 to-white rounded-2xl border border-purple-200/80 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white border border-purple-100 shadow-2xs flex items-center justify-center flex-shrink-0">
              {getFileIcon(selectedFile.name)}
            </div>
            <div className="min-w-0">
              <p className="font-sora font-semibold text-xs text-slate-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-[11px] text-slate-500 flex items-center gap-2">
                <span>{selectedFile.sizeFormatted}</span>
                <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  ✓ Ready to upload
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[11px] font-semibold text-[#5C24FF] hover:underline px-2 py-1"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 flex items-center justify-center transition-colors"
              title="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
