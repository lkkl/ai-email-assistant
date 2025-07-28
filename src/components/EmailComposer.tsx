'use client'

import React, { useState } from 'react'
import { Send, Paperclip, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AttachmentUpload } from '@/components/AttachmentUpload'
import { EmailDraft, EmailAttachment } from '@/types/email'

interface EmailComposerProps {
  onSend: (draft: EmailDraft) => void
  onSave: (draft: EmailDraft) => void
  initialDraft?: Partial<EmailDraft>
}

export function EmailComposer({ onSend, onSave, initialDraft }: EmailComposerProps) {
  const [draft, setDraft] = useState<EmailDraft>({
    to: initialDraft?.to || '',
    cc: initialDraft?.cc || '',
    bcc: initialDraft?.bcc || '',
    subject: initialDraft?.subject || '',
    content: initialDraft?.content || '',
    attachments: initialDraft?.attachments || []
  })

  const [showAttachments, setShowAttachments] = useState(false)
  const [isGeneratingReply, setIsGeneratingReply] = useState(false)

  const handleSend = () => {
    if (!draft.to.trim() || !draft.subject.trim()) {
      alert('Please fill in the recipient and subject fields.')
      return
    }
    onSend(draft)
  }

  const handleSave = () => {
    onSave(draft)
  }

  const generateAIReply = async () => {
    setIsGeneratingReply(true)
    // Simulate AI reply generation
    setTimeout(() => {
      const aiSuggestions = [
        "Thank you for your email. I'll review the attached documents and get back to you within 24 hours.",
        "I appreciate you reaching out. Based on your message, I'd like to schedule a call to discuss this further.",
        "Thanks for the information. I've reviewed your request and will provide a detailed response shortly."
      ]
      const randomReply = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]
      setDraft(prev => ({ ...prev, content: randomReply }))
      setIsGeneratingReply(false)
    }, 2000)
  }

  const updateAttachments = (attachments: EmailAttachment[]) => {
    setDraft(prev => ({ ...prev, attachments }))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Compose Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">To *</label>
            <Input
              type="email"
              placeholder="recipient@example.com"
              value={draft.to}
              onChange={(e) => setDraft(prev => ({ ...prev, to: e.target.value }))}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">CC</label>
              <Input
                type="email"
                placeholder="cc@example.com"
                value={draft.cc}
                onChange={(e) => setDraft(prev => ({ ...prev, cc: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">BCC</label>
              <Input
                type="email"
                placeholder="bcc@example.com"
                value={draft.bcc}
                onChange={(e) => setDraft(prev => ({ ...prev, bcc: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject *</label>
            <Input
              placeholder="Email subject"
              value={draft.subject}
              onChange={(e) => setDraft(prev => ({ ...prev, subject: e.target.value }))}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium">Message</label>
              <Button
                variant="outline"
                size="sm"
                onClick={generateAIReply}
                disabled={isGeneratingReply}
                className="text-xs"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                {isGeneratingReply ? 'Generating...' : 'AI Suggest'}
              </Button>
            </div>
            <Textarea
              placeholder="Type your message here..."
              rows={8}
              value={draft.content}
              onChange={(e) => setDraft(prev => ({ ...prev, content: e.target.value }))}
            />
          </div>

          <div>
            <Button
              variant="outline"
              onClick={() => setShowAttachments(!showAttachments)}
              className="mb-4"
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Attachments ({draft.attachments.length})
            </Button>
            
            {showAttachments && (
              <AttachmentUpload
                attachments={draft.attachments}
                onAttachmentsChange={updateAttachments}
              />
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleSave}>
            Save Draft
          </Button>
          <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4 mr-2" />
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}