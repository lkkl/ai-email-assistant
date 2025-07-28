'use client'

import React from 'react'
import { Star, Paperclip, Mail, MailOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
// Button component not used in this component
import { EmailMessage } from '@/types/email'
import { formatFileSize } from '@/lib/utils'

interface EmailListProps {
  emails: EmailMessage[]
  onEmailSelect: (email: EmailMessage) => void
  selectedEmailId?: string
}

export function EmailList({ emails, onEmailSelect, selectedEmailId }: EmailListProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (days === 1) {
      return 'Yesterday'
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="space-y-2">
      {emails.map((email) => (
        <Card
          key={email.id}
          className={`cursor-pointer transition-colors hover:bg-gray-50 ${
            selectedEmailId === email.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          } ${!email.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
          onClick={() => onEmailSelect(email)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1">
                    {email.isRead ? (
                      <MailOpen className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Mail className="h-4 w-4 text-blue-600" />
                    )}
                    {email.isStarred && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                    {email.attachments.length > 0 && (
                      <Paperclip className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <span className={`font-medium truncate ${!email.isRead ? 'font-bold' : ''}`}>
                    {email.sender}
                  </span>
                </div>
                
                <h3 className={`text-sm truncate mb-1 ${!email.isRead ? 'font-semibold' : ''}`}>
                  {email.subject}
                </h3>
                
                <p className="text-sm text-gray-600 truncate mb-2">
                  {email.content}
                </p>
                
                {email.attachments.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Paperclip className="h-3 w-3" />
                    <span>
                      {email.attachments.length} attachment{email.attachments.length > 1 ? 's' : ''}
                      {email.attachments.length === 1 && (
                        <span> ({formatFileSize(email.attachments[0].size)})</span>
                      )}
                    </span>
                  </div>
                )}
                
                {email.labels.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {email.labels.map((label) => (
                      <span
                        key={label}
                        className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500 ml-4">
                {formatDate(email.timestamp)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {emails.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No emails found</p>
        </div>
      )}
    </div>
  )
}