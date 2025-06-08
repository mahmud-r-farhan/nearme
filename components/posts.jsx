'use client'

import React from 'react'
import DynamicForm from '@/components/Form'

export default function Home() {
  const fields = [
    { name: 'firstName', label: 'First Name', placeholder: 'John', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', placeholder: 'Doe', type: 'text', required: true },
    { name: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', placeholder: '123-456-7890', type: 'phone' },
    { name: 'username', label: 'Username', placeholder: 'johndoe', type: 'text', required: true },
    { name: 'password', label: 'Password', placeholder: '••••••••', type: 'password', required: true },
    { name: 'city', label: 'City', placeholder: 'New York', type: 'text' },
    { name: 'state', label: 'State', placeholder: 'NY', type: 'text' },
    { name: 'country', label: 'Country', placeholder: 'USA', type: 'text' },
    { name: 'zip', label: 'ZIP Code', placeholder: '10001', type: 'text' },
    { name: 'company', label: 'Company', placeholder: 'Acme Inc.', type: 'text' },
    { name: 'jobTitle', label: 'Job Title', placeholder: 'Developer', type: 'text' },
  ]

  const handleSubmit = (data) => {
    console.log('Form Data:', data)
  }

  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <h1 className="text-3xl font-bold mb-8 text-center">Dynamic Professional Form</h1>
      <DynamicForm fields={fields} onSubmit={handleSubmit} />
    </main>
  )
}
