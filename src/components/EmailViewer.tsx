'use client'

import React from 'react'
import { Star, Reply, ReplyAll, Forward, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { EmailMessage } from '@/types/email'
import { formatFileSize, getFileIcon } from '@/lib/utils'

interface EmailViewerProps {
  email: EmailMessage
  onReply: (email: EmailMessage) => void
  onReplyAll: (email: EmailMessage) => void
  onForward: (email: EmailMessage) => void
  onDelete: (email: EmailMessage) => void
  onToggleStar: (email: EmailMessage) => void
}

export function EmailViewer({
  email,
  onReply,
  onReplyAll,
  onForward,
  onDelete,
  onToggleStar
}: EmailViewerProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const downloadAttachment = (attachment: EmailMessage['attachments'][0]) => {
    // In a real app, this would download the file
    console.log('Downloading:', attachment.name)
    alert(`Downloading ${attachment.name}`)
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold">{email.subject}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleStar(email)}
                className={email.isStarred ? 'text-yellow-500' : 'text-gray-400'}
              >
                <Star className={`h-4 w-4 ${email.isStarred ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <div>
                <span className="font-medium">From:</span> {email.sender}
              </div>
              <div>
                <span className="font-medium">To:</span> {email.recipient}
              </div>
              <div>
                <span className="font-medium">Date:</span> {formatDate(email.timestamp)}
              </div>
            </div>
            
            {email.labels.length > 0 && (
              <div className="flex gap-1 mt-3">
                {email.labels.map((label) => (
                  <span
                    key={label}
                    className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onReply(email)}>
              <Reply className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onReplyAll(email)}>
              <ReplyAll className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onForward(email)}>
              <Forward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(email)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="prose max-w-none mb-6">
          <div className="whitespace-pre-wrap text-gray-800">
            {email.content}
          </div>
        </div>
        
        {email.attachments.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Attachments ({email.attachments.length})
            </h3>
            <div className="space-y-2">
              {email.attachments.map((attachment) => (
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
                    variant="outline"
                    size="sm"
                    onClick={() => downloadAttachment(attachment)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}