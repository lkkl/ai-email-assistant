'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { Upload, X, File } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmailAttachment } from '@/types/email'
import { formatFileSize, getFileIcon } from '@/lib/utils'

interface AttachmentUploadProps {
  attachments: EmailAttachment[]
  onAttachmentsChange: (attachments: EmailAttachment[]) => void
  maxFiles?: number
  maxSize?: number
}

export function AttachmentUpload({
  attachments,
  onAttachmentsChange,
  maxFiles = 10,
  maxSize = 25 * 1024 * 1024 // 25MB
}: AttachmentUploadProps) {
  const [uploadError, setUploadError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setUploadError(null)

    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0]
      if (error.code === 'file-too-large') {
        setUploadError(`File is too large. Maximum size is ${formatFileSize(maxSize)}.`)
      } else if (error.code === 'too-many-files') {
        setUploadError(`Too many files. Maximum is ${maxFiles} files.`)
      } else {
        setUploadError('File upload failed. Please try again.')
      }
      return
    }

    if (attachments.length + acceptedFiles.length > maxFiles) {
      setUploadError(`Cannot upload more than ${maxFiles} files.`)
      return
    }

    const newAttachments: EmailAttachment[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file
    }))

    onAttachmentsChange([...attachments, ...newAttachments])
  }, [attachments, onAttachmentsChange, maxFiles, maxSize])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: maxFiles - attachments.length,
    maxSize,
    multiple: true
  })

  const removeAttachment = (id: string) => {
    onAttachmentsChange(attachments.filter(att => att.id !== id))
  }

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-blue-600">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">
              Drag and drop files here, or click to select files
            </p>
            <p className="text-sm text-gray-500">
              Maximum {maxFiles} files, up to {formatFileSize(maxSize)} each
            </p>
          </div>
        )}
      </Card>

      {uploadError && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {uploadError}
        </div>
      )}

      {attachments.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">
            Attachments ({attachments.length})
          </h4>
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {getFileIcon(attachment.name)}
                </span>
                <div>
                  <p className="font-medium text-gray-900">
                    {attachment.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(attachment.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAttachment(attachment.id)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}