'use client'

import React, { useState } from 'react'
import { Mail, Plus, Search, Settings, Inbox, Send, Star, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// UI components are imported in individual components as needed
import { EmailComposer } from '@/components/EmailComposer'
import { EmailList } from '@/components/EmailList'
import { EmailViewer } from '@/components/EmailViewer'
import { EmailMessage, EmailDraft } from '@/types/email'

// Mock data
const mockEmails: EmailMessage[] = [
  {
    id: '1',
    subject: 'Project Update - Q3 Results',
    sender: 'john.doe@company.com',
    recipient: 'you@company.com',
    content: 'Hi there,\n\nI wanted to share the latest project updates with you. Please find the attached quarterly report and let me know if you have any questions.\n\nBest regards,\nJohn',
    attachments: [
      {
        id: 'att1',
        name: 'Q3_Report.pdf',
        size: 2048576,
        type: 'application/pdf'
      },
      {
        id: 'att2',
        name: 'Budget_Analysis.xlsx',
        size: 1024000,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    ],
    timestamp: new Date(2025, 6, 27, 14, 30),
    isRead: false,
    isStarred: true,
    labels: ['Work', 'Important']
  },
  {
    id: '2',
    subject: 'Meeting Reminder - Tomorrow 2 PM',
    sender: 'sarah.wilson@company.com',
    recipient: 'you@company.com',
    content: 'Just a quick reminder about our meeting tomorrow at 2 PM. We\'ll be discussing the new product launch strategy.',
    attachments: [],
    timestamp: new Date(2025, 6, 27, 10, 15),
    isRead: true,
    isStarred: false,
    labels: ['Meetings']
  },
  {
    id: '3',
    subject: 'Invoice #12345',
    sender: 'billing@vendor.com',
    recipient: 'you@company.com',
    content: 'Please find attached the invoice for services rendered in July 2025.',
    attachments: [
      {
        id: 'att3',
        name: 'Invoice_12345.pdf',
        size: 512000,
        type: 'application/pdf'
      }
    ],
    timestamp: new Date(2025, 6, 26, 16, 45),
    isRead: true,
    isStarred: false,
    labels: ['Finance']
  }
]

export default function Home() {
  const [currentView, setCurrentView] = useState<'inbox' | 'compose' | 'sent' | 'starred' | 'trash'>('inbox')
  const [emails, setEmails] = useState<EmailMessage[]>(mockEmails)
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEmails = emails.filter(email => {
    const matchesSearch = searchQuery === '' || 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    switch (currentView) {
      case 'starred':
        return matchesSearch && email.isStarred
      case 'sent':
        return matchesSearch && email.sender === 'you@company.com'
      case 'trash':
        return false // No trash functionality in this demo
      default:
        return matchesSearch
    }
  })

  const handleSendEmail = (draft: EmailDraft) => {
    console.log('Sending email:', draft)
    alert('Email sent successfully!')
    setCurrentView('inbox')
  }

  const handleSaveDraft = (draft: EmailDraft) => {
    console.log('Saving draft:', draft)
    alert('Draft saved!')
  }

  const handleEmailSelect = (email: EmailMessage) => {
    setSelectedEmail(email)
    if (!email.isRead) {
      setEmails(prev => prev.map(e => 
        e.id === email.id ? { ...e, isRead: true } : e
      ))
    }
  }

  const handleReply = (_email: EmailMessage) => {
    setCurrentView('compose')
    setSelectedEmail(null)
  }

  const handleReplyAll = (_email: EmailMessage) => {
    setCurrentView('compose')
    setSelectedEmail(null)
  }

  const handleForward = (_email: EmailMessage) => {
    setCurrentView('compose')
    setSelectedEmail(null)
  }

  const handleDelete = (email: EmailMessage) => {
    setEmails(prev => prev.filter(e => e.id !== email.id))
    setSelectedEmail(null)
  }

  const handleToggleStar = (email: EmailMessage) => {
    setEmails(prev => prev.map(e => 
      e.id === email.id ? { ...e, isStarred: !e.isStarred } : e
    ))
    if (selectedEmail?.id === email.id) {
      setSelectedEmail(prev => prev ? { ...prev, isStarred: !prev.isStarred } : null)
    }
  }

  const sidebarItems = [
    { id: 'inbox' as const, label: 'Inbox', icon: Inbox, count: emails.filter(e => !e.isRead).length },
    { id: 'starred' as const, label: 'Starred', icon: Star, count: emails.filter(e => e.isStarred).length },
    { id: 'sent' as const, label: 'Sent', icon: Send, count: 0 },
    { id: 'trash' as const, label: 'Trash', icon: Trash2, count: 0 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">AI Email Assistant</h1>
            </div>
            <Button 
              onClick={() => setCurrentView('compose')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Compose
            </Button>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={currentView === item.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                      setCurrentView(item.id)
                      setSelectedEmail(null)
                    }}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                    {item.count > 0 && (
                      <span className="ml-auto bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                        {item.count}
                      </span>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search emails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {filteredEmails.length} emails
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex">
            {currentView === 'compose' ? (
              <div className="flex-1 p-6">
                <EmailComposer
                  onSend={handleSendEmail}
                  onSave={handleSaveDraft}
                />
              </div>
            ) : (
              <>
                {/* Email List */}
                <div className="w-96 border-r border-gray-200 bg-white overflow-y-auto">
                  <div className="p-4">
                    <EmailList
                      emails={filteredEmails}
                      onEmailSelect={handleEmailSelect}
                      selectedEmailId={selectedEmail?.id}
                    />
                  </div>
                </div>

                {/* Email Viewer */}
                <div className="flex-1 bg-gray-50 overflow-y-auto">
                  {selectedEmail ? (
                    <div className="p-6">
                      <EmailViewer
                        email={selectedEmail}
                        onReply={handleReply}
                        onReplyAll={handleReplyAll}
                        onForward={handleForward}
                        onDelete={handleDelete}
                        onToggleStar={handleToggleStar}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-500">
                        <Mail className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium mb-2">No email selected</h3>
                        <p>Choose an email from the list to view its contents</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}