export interface EmailAttachment {
  id: string
  name: string
  size: number
  type: string
  url?: string
  file?: File
}

export interface EmailMessage {
  id: string
  subject: string
  sender: string
  recipient: string
  content: string
  attachments: EmailAttachment[]
  timestamp: Date
  isRead: boolean
  isStarred: boolean
  labels: string[]
}

export interface EmailDraft {
  to: string
  cc?: string
  bcc?: string
  subject: string
  content: string
  attachments: EmailAttachment[]
}